const priceTypes = [
  "monthly-starter",
  "monthly-advanced",
  "monthly-pro",
  "yearly-starter",
  "yearly-advanced",
  "yearly-pro",
] as const

export type PriceType = (typeof priceTypes)[number]

type PriceInfo = {
  type: PriceType
  billingCycle: "monthly" | "yearly"
  info: string[]
}

export const priceInfos: Record<PriceType, PriceInfo> = {
  "monthly-starter": {
    type: "monthly-starter",
    billingCycle: "monthly",
    info: ["40.000 characters included (~ 20 pages)", "get more for $8 / 20.000 characters"],
  },
  "monthly-advanced": {
    type: "monthly-advanced",
    billingCycle: "monthly",
    info: ["150.000 characters included (~ 75 pages)", "get more for $5 / 20.000 characters"],
  },
  "monthly-pro": {
    type: "monthly-pro",
    billingCycle: "monthly",
    info: ["600.000 pages included (~ 300 pages)", "get more for $3 / 20.000 characters"],
  },
  "yearly-starter": {
    type: "yearly-starter",
    billingCycle: "yearly",
    info: ["A", "B"],
  },
  "yearly-advanced": {
    type: "yearly-advanced",
    billingCycle: "yearly",
    info: ["A", "B"],
  },
  "yearly-pro": {
    type: "yearly-pro",
    billingCycle: "yearly",
    info: ["A", "B"],
  },
}

export function isPrice(price: string): price is PriceType {
  return priceTypes.includes(price as PriceType)
}
