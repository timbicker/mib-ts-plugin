import axios from "axios"

const paddleBearerToken = "b10023f6ff5787b96ba41bf770942077b995c91414b1fea428"

// todo difference between priceId and subscriptionId?

class PaddleApi {
  private host: string

  constructor(options: {sandbox: boolean}) {
    this.host = options.sandbox ? "https://sandbox-api.paddle.com" : "https://api.paddle.com"
  }

  private url(path: string) {
    return this.host + "/" + path
  }

  async createCustomer(email: string): Promise<{customerId: string}> {
    const result = await axios.post(
      this.url("customers"),
      {email},
      {
        headers: {
          Authorization: `Bearer ${paddleBearerToken}`,
        },
      },
    )
    return {customerId: result.data.data.id}
  }

  async cancelSubscription(args: {subscriptionId: string}) {
    const {subscriptionId} = args
    await axios.post(this.url(`subscriptions/${subscriptionId}/cancel`))
  }
}

export const paddleApi = new PaddleApi({sandbox: true})
