export type UserDoc = {
  customerId: string
  subscription?: {
    id: string
    expiresAt?: Date
    // todo firestore dates
    startsAt: Date
    numCharacters: number
  }
  availableTokenCharacters: number
  monthCycle: {
    // todo do we really needs endsAt here?
    endsAt: Date
    translatedCharacters: number
  }
}
