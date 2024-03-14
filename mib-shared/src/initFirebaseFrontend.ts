// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import {getAuth, connectAuthEmulator} from "firebase/auth"
import {getFunctions} from "firebase/functions"
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC-pIpMIYrq2F__G2t6jNTU63knaIEX34",
  authDomain: "make-it-bilingual-31462.firebaseapp.com",
  projectId: "make-it-bilingual-31462",
  storageBucket: "make-it-bilingual-31462.appspot.com",
  messagingSenderId: "39301316681",
  appId: "1:39301316681:web:5c539081ec29cc07aa7f98",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const functions = getFunctions(app, "europe-west")

// const authNgrok = "https://410b-2003-e3-8f3c-3201-f414-b417-4b98-9aa6.ngrok-free.app"
// export const functionsNgrok = "https://436c-2003-e3-8f3c-3201-f414-b417-4b98-9aa6.ngrok-free.app"
// const firestoreNgrok = "a4ac-2003-e3-8f3c-3201-f414-b417-4b98-9aa6.ngrok-free.app"

export const functionsNgrok = "http://localhost:5001"

if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099")
  connectFirestoreEmulator(db, "localhost", 8080)
  // connectAuthEmulator(auth, authNgrok)
  // connectFirestoreEmulator(db, firestoreNgrok, 0)
  // @ts-ignore
  // db["_settings"]["ssl"] = true
}

export {app, auth, functions, db}
