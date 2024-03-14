import {onCall} from "firebase-functions/v2/https"
import {UserDoc, UserDocHandler} from "../../mib-shared/src/databaseTypes"
import {createEncryptedToken, decryptToken} from "./encryption"

import {initializeApp} from "firebase-admin/app"
import {getFirestore} from "firebase-admin/firestore"
import {paddleApi} from "./paddleApi"

initializeApp()

const firestore = getFirestore()

const userDocHandler = new UserDocHandler(firestore)

export const encodeAuth = onCall<{userId: string; customerId: string}, {encoding: string}>(
  {region: "europe-west"},
  req => {
    return {encoding: createEncryptedToken(req.data)}
  },
)

export const decodeAuth = onCall<{encoding: string}, {userId: string; customerId: string; fail?: true}>(
  {region: "europe-west"},
  req => {
    const result = decryptToken(req.data.encoding)
    if (!result) {
      return {userId: "", customerId: "", fail: true}
    }
    return result
  },
)

export const initCustomerId = onCall<{email: string; userId: string}, Promise<{doc: UserDoc}>>(
  {region: "europe-west"},
  async req => {
    const {email, userId} = req.data

    let userDoc: UserDoc = {
      customerId: "",
      subscriptionId: "",
      tokenSets: [],
      translations: [],
    }

    const userDocResult = await userDocHandler.get(userId)
    if (!userDocResult.exists) {
      userDoc.customerId = (await paddleApi.createCustomer(email)).customerId
      await userDocHandler.create(userId, userDoc)
    } else {
      userDoc = userDocResult.data() as UserDoc
    }

    return {doc: userDoc}
  },
)

export const changeSubscription = onCall<{userId: string; subscriptionId: string}>(
  {region: "europe-west"},
  async req => {
    const {userId, subscriptionId} = req.data
    await userDocHandler.update(userId, {subscriptionId})
  },
)

export const addTokenSet = onCall<{subscriptionId: string}>({region: "europe-west"}, async req => {})

// todo maybe I make translation in a different doc, where the user can only add information but not delete? Such that she can write from the frontend. Is that possible in firebase?
export const translate = onCall<{subscriptionId: string}>({region: "europe-west"}, async req => {})
