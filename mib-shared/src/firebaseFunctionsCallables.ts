import {UserDoc} from "./firestore/userDoc"
import {functionsNgrok} from "./initFirebaseFrontend"

// https://firebase.google.com/docs/functions/callable-reference
interface FetchOptions {
  method: "POST"
  headers: {
    "Content-Type": string
    Authorization?: string
    "Firebase-Instance-ID-Token"?: string
    "X-Firebase-AppCheck"?: string
  }
  body?: string
}

function createFetchOptions(args: {
  body: object
  userIdToken?: string
  iidToken?: string
  appCheckToken?: string
}): FetchOptions {
  const {body, userIdToken, iidToken, appCheckToken} = args
  const options: FetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({data: body}),
  }

  if (userIdToken) {
    /*
     * A Firebase Authentication user ID token for the logged-in user making the request.
     * The backend automatically verifies this token and makes it available in the handler's context.
     * If the token is not valid, the request is rejected.
     */
    options.headers.Authorization = `Bearer ${userIdToken}`
  }

  if (iidToken) {
    /*
     * The FCM registration token from the Firebase client SDK. This must be a string.
     * This is available in the handler's context. It is used for targeting push notifications.
     */
    options.headers["Firebase-Instance-ID-Token"] = iidToken
  }

  if (appCheckToken) {
    /*
     * The Firebase App Check token provided by the client app making the request.
     * The backend automatically verifies this token and decodes it, injecting the appId in the handler's context.
     * If the token cannot be verified, the request is rejected. (Available for SDK >=3.14.0)
     */
    options.headers["X-Firebase-AppCheck"] = appCheckToken
  }

  return options
}

type FetchHeaderOptions = {
  userIdToken?: string
  iidToken?: string
  appCheckToken?: string
}

class FirebaseApi {
  path = "make-it-bilingual-31462/europe-west"
  host: string

  constructor(host: string) {
    this.host = host
  }

  private async fetch<T extends any>(
    name: string,
    data: object,
    options: FetchHeaderOptions = {},
  ): Promise<T> {
    const url = this.host + "/" + this.path + "/" + name
    const fetchOptions = createFetchOptions({
      ...options,
      body: data,
    })
    const result = await fetch(url, fetchOptions)
    const responseData = await result.json()
    if (result.ok === false) {
      throw Error(
        `Failed fetch attempt: ${result.status} - ${result.statusText} - ${JSON.stringify(responseData.error)}`,
      )
    }
    return responseData.result
  }

  async encodeAuth(data: {userId: string; customerId: string}): Promise<{encoding: string}> {
    return await this.fetch<{encoding: string}>("encodeAuth", data)
  }

  async decodeAuth(data: {encoding: string}): Promise<{userId: string; customerId: string; fail?: true}> {
    return await this.fetch<{userId: string; customerId: string}>("decodeAuth", data)
  }

  async handleTransaction(data: {userId: string; transactionId: string}) {
    return await this.fetch<{userId: string; transactionId: string}>("handleTransaction", data)
  }

  async initCustomerId(
    data: {email: string; userId: string},
    options: Pick<FetchHeaderOptions, "userIdToken">,
  ): Promise<{doc: UserDoc}> {
    return await this.fetch<{doc: UserDoc}>("initCustomerId", data, options)
  }

  async changeSubscription(data: {userId: string; subscriptionId: string}) {
    return await this.fetch<{userId: string; subscriptionId: string}>("changeSubscription", data)
  }
}

let _firebaseFunctions = new FirebaseApi("prod")

if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  _firebaseFunctions = new FirebaseApi(functionsNgrok)
}

export const firebaseFunctions = _firebaseFunctions
