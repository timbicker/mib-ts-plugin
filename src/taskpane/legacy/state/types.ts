export type User = {
  monthlyCharacters: number
  remainingCharacters: number
  planActive: number
  name: string
  email: string
}

export type Plan = {
  name: string
  features: string[]
  planNumber: number
  priceMonthly: number
  priceYearly: number
}
