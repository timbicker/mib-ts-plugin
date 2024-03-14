import {Firestore} from "@google-cloud/firestore"

type TokenSet = {
  numCharacters: number
  numUsedCharacters: number
}

type Translation = {
  numCharacters: number
  date: Date
  translationContentId: string
}

export type UserDoc = {
  customerId: string
  subscriptionId: string
  tokenSets: TokenSet[]
  translations: Translation[]
}

export class UserDocHandler {
  constructor(public db: Firestore) {}

  docRef(userId: string) {
    return this.db.collection("users").doc(userId)
  }

  async update(userId: string, data: Partial<UserDoc>) {
    return await this.docRef(userId).update(data)
  }

  async create(userId: string, data: UserDoc) {
    return await this.docRef(userId).create(data)
  }

  async get(userId: string) {
    return await this.docRef(userId).get()
  }
}
