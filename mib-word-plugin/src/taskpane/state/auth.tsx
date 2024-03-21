import React, {PropsWithChildren, useEffect, useMemo} from "react"
import {useState} from "react"
import {getAuth, onAuthStateChanged, User} from "firebase/auth"
import {api} from "./api"
import {UserDoc} from "@shared/firestore/userDoc"
import {firebaseFunctions} from "@shared/firebaseFunctionsCallables"
import {doc, onSnapshot} from "firebase/firestore"
import {db} from "@shared/initFirebaseFrontend"

const firebaseAuth = getAuth()

type AuthState =
  | {type: "init"; user?: never}
  | {type: "loading"; user?: User}
  | {type: "unauthenticated"; user?: never}
  | {type: "authenticated"; user: User; userDoc: UserDoc}

function subscribeToUserDoc(userId: string, cb: (userDoc: UserDoc | undefined) => void) {
  return onSnapshot(doc(db, "users", userId), doc => {
    cb(doc.data() as UserDoc | undefined)
  })
}

function isSubscriptionValid(subscription: UserDoc["subscription"]) {
  if (!subscription) return false
  // todo use real dates here
  // if (subscription.expiresAt) return false
  return true
}

function useAuthProvider() {
  const [auth, setAuth] = useState<AuthState>({type: "init"})
  const plan: boolean = useMemo(
    () => auth.type === "authenticated" && isSubscriptionValid(auth.userDoc.subscription),
    [auth],
  )

  useEffect(() => {
    const user = auth.user
    if (user) {
      return subscribeToUserDoc(user.uid, userDoc => {
        if (!userDoc) return
        setAuth({type: "authenticated", user, userDoc})
      })
    }
    return () => {}
  }, [auth.user])

  useEffect(function observeAuthChange() {
    async function handleAuthStateChanged(user: User | null) {
      if (user) {
        const userIdToken = await user.getIdToken()
        await firebaseFunctions.initCustomerId({userId: user.uid, email: user.email!}, {userIdToken})
        // todo subscribe here to db?
        setAuth({type: "loading", user: user})
      } else {
        // User is signed out
        setAuth({type: "unauthenticated"})
      }
    }
    onAuthStateChanged(firebaseAuth, handleAuthStateChanged)
  }, [])

  async function logIn(email: string, password: string) {
    setAuth({type: "loading"})
    console.log("login")
    try {
      await api.logIn(email, password)
      // success is handled in auth observer
    } catch (e) {
      setAuth({type: "unauthenticated"})
    }
  }

  async function register(email: string, password: string) {
    setAuth({type: "loading"})
    console.log("register")
    try {
      await api.register(email, password)
      // success is handled in auth observer
    } catch (e) {
      setAuth({type: "unauthenticated"})
    }
  }

  function logOut() {
    firebaseAuth.signOut()
  }

  return {auth, logIn, logOut, plan, register}
}

const AuthContext = React.createContext<ReturnType<typeof useAuthProvider> | null>(null)

export const AuthProvider = ({children}: PropsWithChildren) => {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const auth = React.useContext(AuthContext)
  if (!auth) throw new Error("useAuth must be used within an AuthProvider")
  return auth
}

export function useUser() {
  const {auth} = useAuth()
  if (auth.type !== "authenticated") throw Error("Not authenticated")
  return {user: auth.user, doc: auth.userDoc}
}
