// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import {getAuth, connectAuthEmulator} from "firebase/auth"

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

if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  console.log(`auth emulator connected`)
  connectAuthEmulator(auth, "https://127.0.0.1:9098")
}
