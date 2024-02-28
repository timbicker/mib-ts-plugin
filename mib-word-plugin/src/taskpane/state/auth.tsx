import React, {useEffect} from "react"
import {useState} from "react"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import firebase from "firebase/compat"
import User = firebase.User
import {api} from "./api"

const firebaseAuth = getAuth()

type AuthState = {type: "loading"} | {type: "unauthenticated"} | {type: "authenticated"}

async function fakeLogin(): Promise<void> {
  return new Promise(resolve => setTimeout(() => resolve(), 200))
}

function useAuthProvider() {
  const [auth, setAuth] = useState<AuthState>({type: "unauthenticated"})
  const [plan, setPlan] = useState<boolean>(true)

  useEffect(function observeAuthChange() {
    function handleAuthStateChanged(user: User) {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid
        setAuth({type: "authenticated"})
      } else {
        // User is signed out
        setAuth({type: "unauthenticated"})
      }
    }
    onAuthStateChanged(firebaseAuth, handleAuthStateChanged)
  }, [])

  async function logIn(email: string, password: string) {
    setAuth({type: "loading"})
    try {
      await api.logIn(email, password)
      // success is handled in auth observer
    } catch (e) {
      setAuth({type: "unauthenticated"})
    }
  }

  async function register(email: string, password: string) {
    setAuth({type: "loading"})
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

const AuthContext = React.createContext<ReturnType<typeof useAuthProvider>>(null)

export const AuthProvider: React.FC = ({children}) => {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const auth = React.useContext(AuthContext)
  if (!auth) throw new Error("useAuth must be used within a AuthProvider")
  return auth
}
