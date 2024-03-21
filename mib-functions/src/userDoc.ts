import {FieldValue, Firestore} from "@google-cloud/firestore"
import {type UserDoc} from "@shared/firestore/userDoc"

type NestedUserDocElements = Omit<Required<UserDoc>, "customerId">

function getNestedFields<K1 extends keyof NestedUserDocElements, K2 extends keyof NestedUserDocElements[K1]>(
  key1: K1,
  key2: K2,
) {
  return key1 + "." + (key2 as string)
}

function assertDoc(partialDoc: Partial<UserDoc>) {
  const subscription = partialDoc.subscription
  if (subscription) {
    if (subscription.id.substring(0, 3) !== "sub") throw Error(`Invalid subscription id: ${subscription.id}`)
  }
}

type Subset = {
  [K in keyof Partial<UserDoc>]: K extends keyof UserDoc ? any : never
}

function assertKeys(partialDoc: Subset) {
  return partialDoc
}

export class UserDocHandler {
  constructor(public db: Firestore) {}

  docRef(userId: string) {
    return this.db.collection("users").doc(userId)
  }

  async update(userId: string, data: Partial<UserDoc>) {
    assertDoc(data)
    return await this.docRef(userId).update(data)
  }

  async create(userId: string, data: UserDoc) {
    assertDoc(data)
    return await this.docRef(userId).create(data)
  }

  async get(userId: string) {
    return await this.docRef(userId).get()
  }

  async addTokens(userId: string, data: {numCharacters: number}) {
    return await this.docRef(userId).update(
      assertKeys({
        availableTokenCharacters: FieldValue.increment(data.numCharacters),
      }),
    )
  }
}
