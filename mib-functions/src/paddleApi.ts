import {Environment, Paddle} from "@paddle/paddle-node-sdk"

const paddleBearerToken = "b10023f6ff5787b96ba41bf770942077b995c91414b1fea428"
const paddle = new Paddle(paddleBearerToken, {environment: Environment.sandbox})

type SubscriptionInfo = {
  // todo check firestore dates
  startsAt: Date
  id: string
  expiresAt?: Date
  numCharacters: number
}

type TransactionInfo =
  | ({
      type: "subscription"
    } & SubscriptionInfo)
  | {
      type: "token"
      numCharacters: number
    }

class PaddleApi {
  async createCustomer(email: string): Promise<{customerId: string}> {
    const customer = await paddle.customers.create({email})
    return {customerId: customer.id}
  }

  async cancelSubscription(args: {subscriptionId: string}): Promise<SubscriptionInfo> {
    const {subscriptionId} = args
    await paddle.subscriptions.cancel(subscriptionId, {})
    return await this.getSubscriptionInfo(subscriptionId)
  }

  async getSubscriptionInfo(subscriptionId: string): Promise<SubscriptionInfo> {
    const subscription = await paddle.subscriptions.get(subscriptionId)
    if (!subscription.currentBillingPeriod) throw Error("No billing period")
    const item = subscription.items[0]
    if (!item) throw Error("No item in subscription")
    const customData: any = item.price?.customData
    if (!customData) throw Error("Custom data is null")
    // todo it could also be a subscription change which created a transaction
    return {
      id: subscriptionId,
      startsAt: new Date(subscription.currentBillingPeriod.startsAt),
      // todo rename attribute to numCharacters
      numCharacters: customData.numTokens,
      // todo handle expiresAt
    }
  }

  async getTransactionInfo(args: {transactionId: string}): Promise<TransactionInfo> {
    const {transactionId} = args
    const transaction = await paddle.transactions.get(transactionId)
    if (transaction.subscriptionId) {
      const subscriptionInfo = await this.getSubscriptionInfo(transaction.subscriptionId)
      return {
        type: "subscription",
        ...subscriptionInfo,
      }
    }
    const item = transaction.items[0]
    if (!item) throw Error("No item in transaction")
    return {
      type: "token",
      // a token is always 20.000 characters
      numCharacters: item.quantity * 20000,
    }
  }
}

export const paddleApi = new PaddleApi()
