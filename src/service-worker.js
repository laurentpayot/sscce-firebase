const FILES = [
    '/',
    '/index.html',
    '/main.js',
]

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
