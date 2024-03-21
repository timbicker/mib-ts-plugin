import {PaddleEventData} from "@paddle/paddle-js"
import {createContext, ReactNode, useContext, useEffect, useState} from "react"
import {paddleHandler} from "@/state/paddleHandler"
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
    }
  | {type: "error"; message: string}
  | {type: "no-token"}
  | {type: "invalid-token"}
  | {type: "thank-you"}
  | {type: "cancelled"}

export function usePaddleProvider() {
  const [state, setState] = useState<PaddleState>({type: "loading"})

  function createEventCallback(args: {userId: string}) {
    const {userId} = args
    return function eventCallback(event: PaddleEventData) {
      if (!event.data) return
      if (event.name === "checkout.completed") {
        const transactionId = event.data.transaction_id
        firebaseFunctions.handleTransaction({userId, transactionId})
        setState({type: "thank-you"})
      }
    }
  }

  async function initPaddle() {
    let token: string = ""
    try {
      const {token: urlToken} = extractParamsFromCurrentUrl()
      token = urlToken
    } catch (e) {
      setState({type: "no-token"})
      return
    }
    const {userId, customerId, fail} = await firebaseFunctions.decodeAuth({encoding: token})
    console.log(`userId: ${userId} customerId: ${customerId}`)
    if (fail) {
      setState({type: "invalid-token"})
      return
    }
    await paddleHandler.initPaddle(createEventCallback({userId}))
    setState({
      type: "loaded",
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

  return {state}
}

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
