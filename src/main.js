import { initializeApp } from '@firebase/app'
import {
    getFirestore, enableIndexedDbPersistence, // connectFirestoreEmulator,
    doc, getDoc
} from '@firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDcv23_D6Li-1lD04WLiuu7M4tTkHEsPfQ",
    authDomain: "sscce-firebase.firebaseapp.com",
    projectId: "sscce-firebase",
    storageBucket: "sscce-firebase.appspot.com",
    messagingSenderId: "963064759534",
    appId: "1:963064759534:web:5a32477e5b4a63aff91fff"
}

initializeApp(firebaseConfig)
const db = getFirestore()

// not using Firestore emulator
// if (TESTING) connectFirestoreEmulator(db, 'localhost', 8080)

//NB not using enableMultiTabIndexedDbPersistence ("only available on platforms that support LocalStorage")
enableIndexedDbPersistence(db, { forceOwnership: !globalThis.localStorage }) // forceOwnership for web worker
.then(() => console.debug("Offline persistence enabled."))
.catch(error => {
    switch (error.code) {
        case 'failed-precondition':
            console.debug("Offline persistence already enabled in another tab.")
            break
        case 'unimplemented':
            console.debug("Offline persistence not supported by browser.")
            break
        default:
            console.error(error)
    }
})

async function getUserById(uid) {
    const userDoc = doc(db, 'users', uid)
    const userSnap = await getDoc(userDoc)
                        .catch(error => { throw new Error(`error catched: ${error.message}`) })
    return userSnap.data()
}

async function showUserData(uid) {
    const userDataEl = document.body.querySelector("#user-data")
    userDataEl.innerHTML = `Getting user "${uid}"…`
    const data = await getUserById(uid)
    userDataEl.innerHTML = JSON.stringify(data)
}

const getLaurentBtn = document.body.querySelector("#get-laurent-btn")
getLaurentBtn.addEventListener('click', async () => await showUserData('laurent'))
