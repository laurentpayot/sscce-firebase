//NB cannot use https://web.dev/module-workers yet: https://caniuse.com/mdn-api_worker_worker_ecmascript_modules
importScripts('./firebase-worker-deps.js')
const {
    initializeApp,
    getFirestore, enableIndexedDbPersistence, // connectFirestoreEmulator,
    doc, getDoc
} = firebaseWorkerDeps // esbuild globalName


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

onmessage = async ({ data }) => postMessage(await getUserById(data))

console.debug("Firebase worker ready.")