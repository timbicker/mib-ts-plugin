import {CheckoutOpenLineItem, initializePaddle, PaddleEventData} from "@paddle/paddle-js"
import {PriceType} from "@shared/paddle/types"

const priceIds: Record<PriceType, string> = {
  "monthly-starter": "pri_01hnne81drjc0jeanw6z2xbvsd",
  "monthly-advanced": "pri_01hnwtcnxnvqfd7w8hmrc2b7et",
  "monthly-pro": "",
  "yearly-starter": "pri_01hnne8qp5a1nj0nptsgx6d1g2",
  "yearly-advanced": "pri_01hnwtdj8af0x13mtmf0mq3cze",
  "yearly-pro": "",
}

const prices: Prices = {
  "monthly-starter": "20",
  "monthly-advanced": "30",
  "monthly-pro": "60",
  "yearly-starter": "200",
  "yearly-advanced": "300",
  "yearly-pro": "600",
}

export type Prices = Record<PriceType, string>

class PaddleHandler {
  getPriceId(priceType: PriceType): string {
    return priceIds[priceType]
  }

  async fetchCustomerId(userId: string): Promise<string | undefined> {
    // todo fetch customerId from BE
    return new Promise(resolve => setTimeout(() => resolve(undefined), 0))
  }

  async fetchPrices(): Promise<Prices> {
    return new Promise(resolve => setTimeout(() => resolve(prices), 50))
  }

  async initPaddle(eventCallback: (event: PaddleEventData) => void) {
    const paddleInstance = await initializePaddle({
      environment: "sandbox",
      token: "test_858a3c8a8b4b8660be3ae035e2a",
      eventCallback: eventCallback,
    })
    if (!paddleInstance) throw new Error("Failed to initialize Paddle")
    return paddleInstance
  }

  getCheckoutParams(options: {customerId?: string; email: string; priceType: PriceType}) {
    const {customerId, email, priceType} = options
    const getCustomerData = () => {
      if (customerId) {
        return {id: customerId}
      }
      return {email: email}
    }
    const item: CheckoutOpenLineItem = {
      priceId: this.getPriceId(priceType),
    }
    return {
      items: [item],
      settings: {
        allowLogout: false,
      },
      customer: getCustomerData(),
    }
  }
}

export const paddleHandler = new PaddleHandler()
