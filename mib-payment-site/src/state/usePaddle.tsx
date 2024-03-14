import {CheckoutEventsItem, Paddle, PaddleEventData} from "@paddle/paddle-js"
import {createContext, ReactNode, useContext, useEffect, useState} from "react"
import {paddleHandler, Prices} from "@/state/paddleHandler"
import {PriceType} from "@shared/paddle/types"
import {firebaseFunctions} from "@shared/firebaseFunctionsCallables"

function extractParamsFromCurrentUrl(): {token: string} {
  // Use window.location.search to get the query string part of the URL
  const searchParams = new URLSearchParams(window.location.search)

  // Extract 'userId' and 'product' values
  const token = searchParams.get("token")

  if (!token) {
    throw new Error("token is required")
  }
  return {token: token}
}

export type PaddleState =
  | {type: "loading"}
  | {
      type: "loaded"
      paddle: Paddle
      customerId?: string
      userId: string
      email: string
      prices: Prices
    }
  | {type: "error"; message: string}
  | {type: "invalid-token"}
  | {type: "thank-you"}
  | {type: "cancelled"}

function isSubscription(item: CheckoutEventsItem) {
  return !!item.billing_cycle
}

export function usePaddleProvider() {
  const [state, setState] = useState<PaddleState>({type: "loading"})

  function createEventCallback(args: {userId: string}) {
    const {userId} = args
    return function eventCallback(event: PaddleEventData) {
      if (!event.data) return
      if (event.name === "checkout.completed") {
        if (event.data.items.length === 1 && isSubscription(event.data.items[0])) {
          firebaseFunctions.changeSubscription({userId, subscriptionId: event.data.items[0].price_id})
          setState({type: "thank-you"})
        }
      }
    }
  }

  async function initPaddle() {
    const {token} = extractParamsFromCurrentUrl()
    const {userId, customerId, fail} = await firebaseFunctions.decodeAuth({encoding: token})
    if (fail) {
      setState({type: "invalid-token"})
      return
    }
    const paddleInstance = await paddleHandler.initPaddle(createEventCallback({userId}))
    const prices = await paddleHandler.fetchPrices()
    setState({
      type: "loaded",
      userId: userId,
      email: "timbicker@gmail.com",
      paddle: paddleInstance,
      customerId: customerId,
      prices,
    })
  }

  useEffect(function () {
    try {
      initPaddle()
    } catch (e) {
      if (e instanceof Error) {
        setState({type: "error", message: e.message})
      }
    }
  }, [])

  const openCheckout = (options: {priceType: PriceType}) => {
    if (state.type !== "loaded") return
    state.paddle.Checkout.open(
      paddleHandler.getCheckoutParams({
        customerId: state.customerId,
        email: state.email,
        priceType: options.priceType,
      }),
    )
  }

  return {openCheckout, state}
}

type UsePaddle = ReturnType<typeof usePaddleProvider>

const paddleContext = createContext<ReturnType<typeof usePaddleProvider>>(null as any)

export function PaddleProvider({
  children,
  state,
}: {
  children: ReactNode
  state: ReturnType<typeof usePaddleProvider>
}) {
  return <paddleContext.Provider value={state}>{children}</paddleContext.Provider>
}

export function usePaddle() {
  const state = useContext(paddleContext)
  if (!state) {
    throw new Error("usePaddle must be used within a PaddleProvider")
  }
  return state
}

type UsePaddleLoaded = {
  state: Extract<PaddleState, {type: "loaded"}>
  openCheckout: UsePaddle["openCheckout"]
}

export function usePaddleLoaded(): UsePaddleLoaded {
  const state = usePaddle()
  if (state.state.type !== "loaded") {
    throw new Error("Paddle must be loaded")
  }
  return {state: state.state, openCheckout: state.openCheckout}
}

export type UsePaddleResponse = ReturnType<typeof usePaddleProvider>
