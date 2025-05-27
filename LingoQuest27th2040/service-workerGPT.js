
/**
 * LingoQuest PWA Service Worker (Workbox)
 * Handles precaching, runtime caching, and fallback for offline navigation
 * Requires Workbox CDN or bundling via build pipeline
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 19:20 | File: service-worker.js
 */

// Import Workbox from CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('[LingoQuest] Workbox loaded');

  // Precache core assets
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: null },
    { url: '/styles/main.css', revision: null },
    { url: '/styles/lingoquest.css', revision: null },
    { url: '/styles/variables.css', revision: null },
    { url: '/manifest.json', revision: null },
    { url: '/scripts/main.js', revision: null },
    { url: '/lang/fr.json', revision: null },
    { url: '/lang/en.json', revision: null },
    // Add more files as needed
  ]);

  // App shell-style routing (for SPA/PWA fallback)
  workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL('/index.html'), {
      blacklist: [/\/api\//]
    }
  );

  // Cache JSON and JS from scripts/lang/tools
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script' || request.url.endsWith('.json'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'lingoquest-js-json'
    })
  );

  // Cache images (e.g. icon sets, flags)
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'lingoquest-images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 1 week
        })
      ]
    })
  );

} else {
  console.warn('[LingoQuest] Workbox failed to load');
}
