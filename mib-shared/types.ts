const products = [
  "monthly-starter",
  "monthly-advanced",
  "monthly-pro",
  "yearly-starter",
  "yearly-advanced",
  "yearly-pro",
] as const

export type Product = (typeof products)[number]

export function isProduct(product: string): product is Product {
  return products.includes(product as Product)
}
