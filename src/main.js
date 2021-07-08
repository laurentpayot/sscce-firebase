import { initializeApp } from 'firebase/app'
import {
    getAuth, useAuthEmulator, onAuthStateChanged,
    signInWithRedirect, OAuthProvider, getRedirectResult
} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDcv23_D6Li-1lD04WLiuu7M4tTkHEsPfQ",
  authDomain: "sscce-firebase.firebaseapp.com",
  projectId: "sscce-firebase",
  storageBucket: "sscce-firebase.appspot.com",
  messagingSenderId: "963064759534",
  appId: "1:963064759534:web:5a32477e5b4a63aff91fff"
}

initializeApp(firebaseConfig)
const auth = getAuth()
if (location.hostname === "localhost") useAuthEmulator(auth, "http://localhost:9099")

export function signInWithProvider(providerId) {
    const provider = new OAuthProvider(providerId)
    provider.addScope('profile')
    provider.addScope('email')
    return signInWithRedirect(auth, provider)
}

onAuthStateChanged(auth, user => {
    const emailEl = document.body.querySelector("#current-user-email")
    emailEl.innerHTML = user?.email
})

window.onload = async () => {
  const redirectResult = await getRedirectResult(auth)
  if (redirectResult) {
    const user = redirectResult.user
    console.log("user =", user)
  }

  const signInEl = document.body.querySelector("#google-sign-in")
  signInEl.addEventListener('click', () => signInWithProvider('google.com'))
}
