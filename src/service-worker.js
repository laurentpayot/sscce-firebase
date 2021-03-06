const FILES = [
    '/',
    '/index.html',
    '/main.js',
    '/firebase-worker.js',
    '/firebase-worker-deps.js',
]

self.addEventListener('activate', e => console.debug("Service worker activated."))

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('sscce-firebase')
        .then(cache => cache.addAll(FILES))
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => response || fetch(e.request))
    )
})
