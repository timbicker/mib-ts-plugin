import {Paddle} from "@paddle/paddle-js"
import {useEffect, useState} from "react"
import {paddleHandler, Prices} from "@/paddleHandler"
import {isPrice, PriceType} from "@shared/paddle/types"

function extractParamsFromCurrentUrl(): {userId: string; priceType: PriceType} {
  // Use window.location.search to get the query string part of the URL
  const searchParams = new URLSearchParams(window.location.search)

  // Extract 'userId' and 'product' values
  const userId = searchParams.get("userId")
  const priceType = searchParams.get("product")

  if (!userId || !priceType) {
    throw new Error("userId and product are required")
  }
  if (!isPrice(priceType)) {
    throw new Error("Invalid product")
  }

  return {userId, priceType}
}

export type PaddleState =
  | {type: "loading"}
  | {
      type: "loaded"
      paddle: Paddle
      customerId?: string
      userId: string
      email: string
      defaultPriceType: PriceType
      prices: Prices
    }
  | {type: "error"; message: string}

export function usePaddle() {
  const [state, setState] = useState<PaddleState>({type: "loading"})

  async function initPaddle() {
    const {userId, priceType} = extractParamsFromCurrentUrl()
    const paddleInstance = await paddleHandler.initPaddle()
    const customerId = await paddleHandler.fetchCustomerId(userId)
    const prices = await paddleHandler.fetchPrices()
    setState({
      type: "loaded",
      userId,
      email: "timbicker@gmail.com",
      defaultPriceType: priceType,
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

  const openCheckout = (options?: {priceType: PriceType}) => {
    if (state.type !== "loaded") return
    state.paddle.Checkout.open(
      paddleHandler.getCheckoutParams({
        customerId: state.customerId,
        email: state.email,
        priceType: options?.priceType ?? state.defaultPriceType,
      }),
    )
  }

  return {openCheckout, state}
}

export type UsePaddleResponse = ReturnType<typeof usePaddle>
