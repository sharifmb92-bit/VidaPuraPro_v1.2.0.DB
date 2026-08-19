const CACHE_NAME = 'vidapura-v1.2.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

// Escucha de mensajes para notificaciones programadas
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_WATER_REMINDER') {
    setTimeout(() => {
      self.registration.showNotification("VidaPura 💧", {
        body: "¡Hora de beber agua! Mantén tu cuerpo hidratado, medbasha.",
        icon: "https://cdn-icons-png.flaticon.com/512/2948/2948231.png",
        vibrate: [100, 50, 100]
      });
    }, 7200000); // Recordatorio cada 2 horas (7200000 ms)
  }
});
