import React from "react"
import {useState} from "react"

type AuthState = {type: "loading"} | {type: "unauthenticated"} | {type: "authenticated"}

async function fakeLogin(): Promise<void> {
  return new Promise(resolve => setTimeout(() => resolve(), 200))
}

function useAuthProvider() {
  const [auth, setAuth] = useState<AuthState>({type: "unauthenticated"})
  const [plan, setPlan] = useState<boolean>(false)

  async function logIn(email: string, password: string) {
    console.log(email + password)
    setAuth({type: "loading"})
    try {
      await fakeLogin()
      setAuth({type: "authenticated"})
    } catch (e) {
      setAuth({type: "unauthenticated"})
    }
  }

  async function register(email: string, password: string) {
    console.log(email + password)
    setAuth({type: "loading"})
    try {
      await fakeLogin()
      setAuth({type: "authenticated"})
    } catch (e) {
      setAuth({type: "unauthenticated"})
    }
  }

  return {auth, logIn, plan, register}
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
