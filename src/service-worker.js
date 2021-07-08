const FILES = [
    '/',
    '/index.html',
    '/main.js',
]

self.addeListener('install', e => {
    e.waitUntil(
        caches.open('sscce-firebase')
        .then(cache => cache.addAll(FILES))
    )
})

self.addeListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => response || fetch(e.request))
    )
})
