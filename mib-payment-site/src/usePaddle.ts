import {Paddle} from "@paddle/paddle-js"
import {useEffect, useState} from "react"
import {isProduct, Product} from "@shared/types"
import {paddleHandler} from "@/paddleHandler"

function extractParamsFromCurrentUrl(): {userId: string; product: Product} {
  // Use window.location.search to get the query string part of the URL
  const searchParams = new URLSearchParams(window.location.search)

  // Extract 'userId' and 'product' values
  const userId = searchParams.get("userId")
  const product = searchParams.get("product")

  if (!userId || !product) {
    throw new Error("userId and product are required")
  }
  if (!isProduct(product)) {
    throw new Error("Invalid product")
  }

  return {userId, product}
}

type State =
  | {type: "loading"}
  | {
      type: "loaded"
      paddle: Paddle
      customerId?: string
      userId: string
      email: string
      defaultProduct: Product
    }
  | {type: "error"; message: string}

export function usePaddle() {
  const [state, setState] = useState<State>({type: "loading"})

  async function initPaddle() {
    const {userId, product} = extractParamsFromCurrentUrl()
    const paddleInstance = await paddleHandler.initPaddle()
    const customerId = await paddleHandler.fetchCustomerId(userId)
    setState({
      type: "loaded",
      userId,
      email: "timbicker@gmail.com",
      defaultProduct: product,
      paddle: paddleInstance,
      customerId: customerId,
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

  const openCheckout = () => {
    if (state.type !== "loaded") return
    state.paddle.Checkout.open(
      paddleHandler.getCheckoutParams({
        customerId: state.customerId,
        email: state.email,
        product: state.defaultProduct,
      }),
    )
  }

  return {openCheckout, state}
}
