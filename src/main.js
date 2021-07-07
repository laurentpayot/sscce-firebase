import { initializeApp } from 'firebase/app'
import { getAuth, useAuthEmulator, onAuthStateChanged } from 'firebase/auth'

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

onAuthStateChanged(auth, user => {
    const element = document.body.querySelector("#current-user-email")
    element.innerHTML = user?.email
})

