const TIERS = ["starter", "advanced", "pro"] as const
const BILLING_CYCLES = ["monthly", "yearly"] as const
const SUBSCRIPTION_KEYS = [
  "starter-monthly",
  "starter-yearly",
  "advanced-monthly",
  "advanced-yearly",
  "pro-monthly",
  "pro-yearly",
] as const

export type TierType = (typeof TIERS)[number]
export type BillingCycle = (typeof BILLING_CYCLES)[number]
type SubscriptionKey = (typeof SUBSCRIPTION_KEYS)[number]

function createKey(tier: TierType, billingCycle: BillingCycle): SubscriptionKey {
  return (tier + "-" + billingCycle) as SubscriptionKey
}

function assertKeysAreExhaustive() {
  const keyCopy = [...SUBSCRIPTION_KEYS]
  TIERS.forEach(tier => {
    BILLING_CYCLES.forEach(billingCycle => {
      const key = createKey(tier, billingCycle)
      const index = keyCopy.indexOf(key)
      if (index === -1) {
        throw new Error(`Key ${key} not found in keyCopy`)
      }
      keyCopy.splice(index, 1)
    })
  })
  if (keyCopy.length > 0) {
    throw new Error(`Subscription keys can not exhaustively be created from createKey`)
  }
}

assertKeysAreExhaustive()

type SubscriptionPrice = {
  priceId: string
  price: number
  characters: number
  tier: TierType
  billingCycle: BillingCycle
}

type TokenPrice = {
  priceId: string
  price: number
  tier: TierType
  characters: 20000
}

const tokenPrices: Record<TierType, TokenPrice> = {
  starter: {
    priceId: "",
    price: 8,
    tier: "starter",
    characters: 20000,
  },
  advanced: {
    priceId: "",
    price: 6,
    tier: "advanced",
    characters: 20000,
  },
  pro: {
    priceId: "",
    price: 3,
    tier: "pro",
    characters: 20000,
  },
}

const subscriptionPrices: Record<SubscriptionKey, SubscriptionPrice> = {
  "starter-monthly": {
    priceId: "pri_01hnne81drjc0jeanw6z2xbvsd",
    price: 20,
    characters: 40000,
    tier: "starter",
    billingCycle: "monthly",
  },
  "starter-yearly": {
    priceId: "pri_01hnne8qp5a1nj0nptsgx6d1g2",
    price: 200,
    characters: 40000,
    tier: "starter",
    billingCycle: "yearly",
  },
  "advanced-monthly": {
    priceId: "pri_01hnwtcnxnvqfd7w8hmrc2b7et",
    price: 30,
    characters: 150000,
    tier: "advanced",
    billingCycle: "monthly",
  },
  "advanced-yearly": {
    priceId: "pri_01hnwtdj8af0x13mtmf0mq3cze",
    price: 300,
    characters: 150000,
    tier: "advanced",
    billingCycle: "yearly",
  },
  "pro-monthly": {
    priceId: "",
    price: 40,
    characters: 600000,
    tier: "pro",
    billingCycle: "monthly",
  },
  "pro-yearly": {
    priceId: "",
    price: 400,
    characters: 600000,
    tier: "pro",
    billingCycle: "yearly",
  },
}

class SubscriptionInfo {
  subscription: SubscriptionPrice
  token: TokenPrice

  constructor(subscription: SubscriptionPrice, token: TokenPrice) {
    this.subscription = subscription
    this.token = token
  }

  formattedCharacters(): string {
    return this.subscription.characters.toString()
  }

  numPages(): number {
    return this.calcPages(this.subscription.characters)
  }

  numTokenPages(): number {
    return this.calcPages(this.token.characters)
  }

  infoText(): string[] {
    return [
      `${this.formattedCharacters()} characters included (approx. ${this.numPages()} pages)`,
      `get more for ${this.token.price}$ / 20,000 characters (approx. ${this.numTokenPages()} pages)`,
    ]
  }

  private calcPages(characters: number): number {
    return Math.floor(characters / 600)
  }
}

export class SubscriptionInfoStore {
  private store: Record<string, SubscriptionInfo> = {}

  constructor() {
    SUBSCRIPTION_KEYS.forEach(key => {
      const subscription = subscriptionPrices[key]
      const token = tokenPrices[subscription.tier]
      this.store[key] = new SubscriptionInfo(subscription, token)
    })
  }

  get(tier: TierType, billingCycle: BillingCycle): SubscriptionInfo {
    return this.store[createKey(tier, billingCycle)]
  }
}
