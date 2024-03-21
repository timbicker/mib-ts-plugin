import {initializePaddle, Paddle, PaddleEventData} from "@paddle/paddle-js"
import {BillingCycle, SubscriptionInfoStore, TierType} from "@/state/paddleSubscriptionStore"

class PaddleHandler {
  private paddle: Paddle | undefined
  private subscriptionInfoStore: SubscriptionInfoStore

  constructor() {
    this.subscriptionInfoStore = new SubscriptionInfoStore()
  }

  async initPaddle(eventCallback: (event: PaddleEventData) => void) {
    const paddleInstance = await initializePaddle({
      environment: "sandbox",
      token: "test_858a3c8a8b4b8660be3ae035e2a",
      eventCallback: eventCallback,
    })
    if (!paddleInstance) throw new Error("Failed to initialize Paddle")
    this.paddle = paddleInstance
    return paddleInstance
  }

  getSubscriptionInfo(tier: TierType, billingCycle: BillingCycle) {
    return this.subscriptionInfoStore.get(tier, billingCycle)
  }

  getTokenInfo(tier: TierType) {
    return this.getSubscriptionInfo(tier, "monthly").token
  }

  openCheckout(options: {customerId: string; priceId: string; amount: number}) {
    if (!this.paddle) throw new Error("Paddle not initialized")
    const {customerId, priceId, amount} = options
    this.paddle.Checkout.open({
      items: [
        {
          priceId,
        },
      ],
      settings: {
        allowLogout: false,
      },
      customer: {
        id: customerId,
      },
    })
  }
}

export const paddleHandler = new PaddleHandler()
