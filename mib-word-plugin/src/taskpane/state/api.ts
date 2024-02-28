import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"

const auth = getAuth()

function choosePlan(): Promise<void> {
  return new Promise(resolve => setTimeout(() => resolve(), 300))
}

function translateParagraph(text: string): Promise<string> {
  return new Promise(resolve => setTimeout(() => resolve(text), 200))
}

async function logIn(email: string, password: string): Promise<void> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
  }
}

async function register(email: string, password: string): Promise<void> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
  }
}

export const api = {
  choosePlan,
  translateParagraph,
  logIn,
  register,
}
