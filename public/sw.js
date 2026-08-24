// Minimal service worker. Cachar bara appens eget skal så att appen startar
// offline. Allt som ligger på en annan domän, YouTube inräknat, går alltid
// direkt till nätet och hamnar aldrig i cachen.
//
// Alla sökvägar är relativa till den här filen, så samma bygge fungerar både
// i roten och under en underkatalog som /Judoteacher/ på GitHub Pages.
const CACHE = 'judostudy-v1';
const SHELL = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];
const FALLBACK = new URL('./index.html', self.location).href;

// Filnamnen under assets/ har en innehållshash och kan inte skrivas in här.
// Vi läser dem ur index.html i stället, så precachen träffar rätt bygge.
async function shellUrls() {
  const urls = SHELL.slice();
  try {
    const res = await fetch(FALLBACK, { cache: 'no-cache' });
    const html = await res.text();
    for (const m of html.matchAll(/(?:src|href)="(\.\/assets\/[^"]+)"/g)) urls.push(m[1]);
  } catch {
    // Ingen nätåtkomst vid installationen, skalet cachas ändå vid nästa besök.
  }
  return urls;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    shellUrls()
      .then((urls) => caches.open(CACHE).then((c) => c.addAll(urls)))
      .catch(() => undefined)
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Endast samma ursprung cachas. YouTube och allt annat externt lämnas orört.
  if (url.origin !== self.location.origin) return;

  // Navigeringar: nät först, cache som reserv när man är offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match(FALLBACK).then((r) => r || Response.error()))
    );
    return;
  }

  // Statiska filer: cache först, fyll på i bakgrunden.
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => undefined);
          }
          return res;
        })
    )
  );
});
