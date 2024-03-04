import {Product} from "@shared/types"
import {CheckoutOpenLineItem, initializePaddle} from "@paddle/paddle-js"

const priceIds: Record<Product, string> = {
  "monthly-starter": "pri_01hnne81drjc0jeanw6z2xbvsd",
  "monthly-advanced": "pri_01hnwtcnxnvqfd7w8hmrc2b7et",
  "monthly-pro": "",
  "yearly-starter": "pri_01hnne8qp5a1nj0nptsgx6d1g2",
  "yearly-advanced": "pri_01hnwtdj8af0x13mtmf0mq3cze",
  "yearly-pro": "",
}

class PaddleHandler {
  getPriceId(product: Product): string {
    return priceIds[product]
  }

  async fetchCustomerId(userId: string): Promise<string | undefined> {
    // todo fetch customerId from BE
    return new Promise(resolve => setTimeout(() => resolve(undefined), 0))
  }

  async initPaddle() {
    const paddleInstance = await initializePaddle({
      environment: "sandbox",
      token: "test_858a3c8a8b4b8660be3ae035e2a",
    })
    if (!paddleInstance) throw new Error("Failed to initialize Paddle")
    return paddleInstance
  }

  getCheckoutParams(options: {customerId?: string; email: string; product: Product}) {
    const {customerId, email, product} = options
    const getCustomerData = () => {
      if (customerId) {
        return {id: customerId}
      }
      return {email: email}
    }
    const item: CheckoutOpenLineItem = {
      priceId: this.getPriceId(product),
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
