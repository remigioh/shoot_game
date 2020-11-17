'use strict';

// Update cache names any time any of the cached files change.

const CACHE_NAME = 'static-cache-v9';

// list of files to cache.

const FILES_TO_CACHE = [
  '/offline.html',
  '/index.html',
  '/assets/bueno.png',
  '/assets/bueno_muerto.png',
  '/assets/game_over.png',
  '/assets/jefe.png',
  '/assets/jefe_muerto.png',
  '/assets/malo.png',
  '/assets/malo_muerto.png',
  '/assets/shot1.png',
  '/assets/shot2.png',
  '/assets/you_win.png',
  '/assets/screenshot.png',
  '/files/js/install.js'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // Precache static resources.
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
 // Remove previous cached data from disk. 
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

 // fetch event handler.

self.addEventListener('fetch', (evt) => {
  
  console.log('[ServiceWorker] Fetch', evt.request.url);
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log("RESP", response);
              return response || fetch(evt.request);
            });
      })
  );
});