const CACHE = 'thai-flashcards-v2-app';
const ASSETS = [
  '/thai-flashcards-v2/',
  '/thai-flashcards-v2/index.html',
  '/thai-flashcards-v2/words.js',
  '/thai-flashcards-v2/sentences.js',
  '/thai-flashcards-v2/a1.js',
  '/thai-flashcards-v2/a2.js',
  '/thai-flashcards-v2/manifest.json',
  '/thai-flashcards-v2/icon-192.png',
  '/thai-flashcards-v2/icon-512.png',
  '/thai-flashcards-v2/how-to-use.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
