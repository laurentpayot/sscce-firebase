const firebaseWorker = new Worker("/firebase-worker.js")

firebaseWorker.onmessage = ({data}) => {
    const userDataEl = document.body.querySelector("#user-data")
    userDataEl.innerHTML = JSON.stringify(data)
}

const getLaurentBtn = document.body.querySelector("#get-laurent-btn")
getLaurentBtn.addEventListener('click', async () => firebaseWorker.postMessage('laurent'))