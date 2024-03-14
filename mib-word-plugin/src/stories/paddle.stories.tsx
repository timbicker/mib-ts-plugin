import React, {useEffect, useState} from "react"
import type {Meta, StoryObj} from "@storybook/react"
import {initializePaddle, Paddle} from "@paddle/paddle-js"
import {DummyAppSceleton, DummyWordPage, DummyWordSceleton} from "./DummyAppSceleton"
import Box from "@mui/material/Box"
import {Button} from "@mui/material"

const productId = "pro_01hnne6s5448kq8mz1ft43zk60"

const monthlyStarterPriceId = "pri_01hnne81drjc0jeanw6z2xbvsd"
const yearlyStarterPriceId = "pri_01hnne8qp5a1nj0nptsgx6d1g2"

const monthlyAdvancedPriceId = "pri_01hnwtcnxnvqfd7w8hmrc2b7et"
const yearlyAdvancedPriceId = "pri_01hnwtdj8af0x13mtmf0mq3cze"

const items: Record<any, string> = {
  "monthly-starter": monthlyStarterPriceId,
  "monthly-advanced": monthlyAdvancedPriceId,
  "yearly-starter": yearlyStarterPriceId,
  "yearly-advanced": yearlyAdvancedPriceId,
}

const monthItems = [
  {
    // quantity: 1,
    priceId: monthlyStarterPriceId,
  },
  {
    // quantity: 1,
    priceId: monthlyAdvancedPriceId,
  },
]

const yearItems = [
  {
    // quantity: 1,
    priceId: yearlyStarterPriceId,
  },
  {
    // quantity: 1,
    priceId: yearlyAdvancedPriceId,
  },
]

// set initial billing cycle
const billingCycle = "year"

// get prices
async function fetchPrices(paddle: Paddle, cycle: "month" | "year") {
  let itemsList: any = []
  if (cycle === "month") {
    itemsList = monthItems
  } else {
    itemsList = yearItems
  }

  var request = {
    items: itemsList,
  }

  const result = await paddle.PricePreview(request)
  return result
}

function useCheckout() {
  // Create a local state to store Paddle instance
  const [paddle, setPaddle] = useState<Paddle>()

  // Download and initialize Paddle instance from CDN
  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: "test_858a3c8a8b4b8660be3ae035e2a",
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance)
      }
    })
  }, [])

  const openCheckout = () => {
    if (!paddle) return
    paddle.Checkout.open({
      items: [yearItems[0]],
    })
  }

  const getPrices = async () => {
    if (paddle) {
      const prices = await fetchPrices(paddle, billingCycle)
      console.log(prices)
    }
  }

  return {openCheckout, getPrices}
}

function StoryComponent() {
  return (
    <DummyWordSceleton>
      <DummyAppSceleton page={"settings"}>
        <div />
      </DummyAppSceleton>
    </DummyWordSceleton>
  )
}

const meta = {
  title: "Paddle",
  component: StoryComponent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof StoryComponent>
export default meta
type Story = StoryObj<typeof StoryComponent>

export function PaddleModal() {
  const checkout = useCheckout()
  return (
    <Box>
      <Button onClick={checkout.getPrices}>Get Prices</Button>
      <Button onClick={checkout.openCheckout}>Open Checkout</Button>
    </Box>
  )
}
