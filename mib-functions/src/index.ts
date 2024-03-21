import {onCall} from "firebase-functions/v2/https"
import {createEncryptedToken, decryptToken} from "./encryption"
import {initializeApp} from "firebase-admin/app"
import {getFirestore} from "firebase-admin/firestore"
import {paddleApi} from "./paddleApi"
import {UserDocHandler} from "./userDoc"
import {type UserDoc} from "@shared/firestore/userDoc"

initializeApp()

const firestore = getFirestore()
firestore.settings({
  ignoreUndefinedProperties: true,
})

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

// todo rename to initUser
export const initCustomerId = onCall<{email: string; userId: string}, Promise<{doc: UserDoc}>>(
  {region: "europe-west"},
  async req => {
    const {email, userId} = req.data

    let userDoc: UserDoc = {
      customerId: "",
      availableTokenCharacters: 0,
      monthCycle: {
        endsAt: new Date(),
        translatedCharacters: 0,
      },
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

/*
 * This only happens when the user buys tokens or makes a subscription when he didn't have one
 */
export const handleTransaction = onCall<{userId: string; transactionId: string}>(
  {region: "europe-west"},
  async req => {
    const {userId, transactionId} = req.data
    const info = await paddleApi.getTransactionInfo({transactionId})
    // todo check that everything works as expected (subscription change & token add)
    if (info.type === "subscription") {
      await userDocHandler.update(userId, {
        subscription: {
          id: info.id,
          expiresAt: info.expiresAt,
          numCharacters: info.numCharacters,
          startsAt: info.startsAt,
        },
      })
    } else {
      await userDocHandler.addTokens(userId, {numCharacters: info.numCharacters})
    }
  },
)

export const changeSubscription = onCall<{userId: string; subscriptionId: string}>(
  {region: "europe-west"},
  async req => {
    const {userId, subscriptionId} = req.data
    const subscriptionInfo = await paddleApi.getSubscriptionInfo(subscriptionId)
    await userDocHandler.update(userId, {subscription: subscriptionInfo})
  },
)

export const cancelSubscription = onCall<{userId: string; subscriptionId: string}>(
  {region: "europe-west"},
  async req => {
    const {userId, subscriptionId} = req.data
    const subscriptionInfo = await paddleApi.cancelSubscription({subscriptionId})
    await userDocHandler.update(userId, {subscription: subscriptionInfo})
  },
)

export const addTokenSet = onCall<{subscriptionId: string}>({region: "europe-west"}, async req => {})

// todo maybe I make translation in a different doc, where the user can only add information but not delete? Such that she can write from the frontend. Is that possible in firebase?
export const translate = onCall<{subscriptionId: string}>({region: "europe-west"}, async req => {})
