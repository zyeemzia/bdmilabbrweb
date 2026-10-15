/* BD MIL ABBR — service worker.
 *
 * The app is one self-contained HTML file that requests nothing at runtime, so
 * this is not here to make the app work offline — it already does. It is here so
 * the page can be INSTALLED (which on iOS exempts it from Safari's 7-day purge of
 * script-writable storage) and so a cold launch with no network is instant and
 * guaranteed rather than dependent on the HTTP cache.
 *
 * The document is served stale-while-revalidate ON PURPOSE. A plain cache-first
 * worker is the classic PWA trap: the browser only re-installs a worker when the
 * WORKER file changes, so publishing a new index.html while sw.js stays the same
 * leaves every returning visitor pinned to the old app forever. Revalidating the
 * document on every navigation means a release needs no edit here at all — and if
 * someone does forget to bump CACHE, nothing breaks.
 */
const CACHE = 'bdmilabbr-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './404.html'
];

self.addEventListener('install', (ev) => {
  ev.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // reload: bypass the HTTP cache, or a stale copy gets baked in at install.
    await Promise.allSettled(SHELL.map((u) => c.add(new Request(u, { cache: 'reload' }))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

const isDoc = (req) =>
  req.mode === 'navigate' || (req.destination === 'document') ||
  (req.headers.get('accept') || '').includes('text/html');

async function tellClients(msg) {
  const cs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  cs.forEach((c) => c.postMessage(msg));
}

self.addEventListener('fetch', (ev) => {
  const req = ev.request;
  // Only our own origin, only GET. Never touch anything else.
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  if (isDoc(req)) {
    ev.respondWith((async () => {
      const c = await caches.open(CACHE);
      const cached = await c.match('./index.html', { ignoreSearch: true });
      const fresh = (async () => {
        try {
          const res = await fetch(new Request('./index.html', { cache: 'reload' }));
          if (!res || !res.ok) return null;
          const copy = res.clone();
          const [a, b] = await Promise.all([copy.text(), cached ? cached.clone().text() : Promise.resolve(null)]);
          if (b !== null && a !== b) {
            await c.put('./index.html', res.clone());
            await tellClients({ type: 'sw-update' });   // the page offers a reload
          } else if (b === null) {
            await c.put('./index.html', res.clone());
          }
          return res;
        } catch (_) { return null; }
      })();
      // Cached copy wins the race so a cold launch paints immediately.
      if (cached) { ev.waitUntil(fresh); return cached; }
      const net = await fresh;
      return net || new Response('<h1>Offline</h1><p>Open this page once while online.</p>',
                                 { headers: { 'Content-Type': 'text/html' }, status: 200 });
    })());
    return;
  }

  // Everything else (icons, manifest) is cache-first: small, and rarely changes.
  ev.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && res.ok && res.type === 'basic') c.put(req, res.clone());
      return res;
    } catch (_) {
      return hit || Response.error();
    }
  })());
});

// The page asks for this when the user taps "Reload" on the update toast.
self.addEventListener('message', (ev) => {
  if (ev.data && ev.data.type === 'skip-waiting') self.skipWaiting();
});
