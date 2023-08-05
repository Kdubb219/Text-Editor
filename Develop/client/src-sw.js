const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);
// Cache assets using the CacheFirst strategy
const assetCache = new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 7 * 24 * 60 * 60, // Cache assets for one week (adjust as needed)
    }),
  ],
});

// URLs of assets to cache
const assetURLs = [
  // Add URLs of your assets (CSS, JS, images, fonts, etc.) here
  '/css/styles.css',
  '/js/database.js',
  '/js/editor.js',
  '/js/header.js',
  '/js/index.js',
  '/js/install.js',
  '/images/logo.png',
  // Add more asset URLs as needed
];

// Precache and route the assets
precacheAndRoute([...self.__WB_MANIFEST, ...assetURLs]);

// Register the asset caching route
registerRoute(({ request }) => {
  // Match assets based on the URLs specified in assetURLs
  return assetURLs.some((url) => request.url.endsWith(url));
}, assetCache);
