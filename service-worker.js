const CACHE_NAME = 'proller-links-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/Scripts.html', /* Se você tiver outros arquivos CSS, JS, imagens essenciais, adicione-os aqui */
  '/style.css', /* Se você tiver um arquivo CSS separado, adicione-o */
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/maskable_icon.png',
  /* Adicione aqui todos os links de imagens dos executores para cache offline */
  'https://i.imgur.com/4k9ErhF.png', /* JJsploit */
  'https://i.imgur.com/lnflbnK.png', /* Drift */
  'https://i.imgur.com/2inXCzA.png', /* Ronix */
  'https://i.imgur.com/dTXVvWF.png', /* Swift */
  'https://i.imgur.com/Ts7ZqJq.png', /* Solara */
  'https://i.imgur.com/EpTJXyv.png', /* Plutora */
  'https://i.imgur.com/TiItnk2.png', /* Luna */
  'https://i.imgur.com/A8lbOUa.png', /* Xeno */
  'https://i.imgur.com/fSW90ws.png', /* Velocity */
  'https://i.imgur.com/prD3E2l.png', /* Fluxus */
  'https://pbs.twimg.com/profile_images/1724003690724655104/R4JmSAW7_400x400.jpg', /* Delta */
  'https://wearedevs.net/favicon.ico', /* Tsunami */
  'https://i.imgur.com/AxmXJJ4.png', /* Evon */
  'https://i.imgur.com/PdJeboR.png', /* Visual */
  'https://trigonevo.com/wp-content/uploads/2024/01/Untitled-2-1536x864.png', /* Trigon */
  'https://getargon.xyz/argon.png', /* Argon */
  'https://volcanoexecutor.com/wp-content/uploads/2025/05/volcano.png', /* Volcano */
  'https://electron-executor.net/wp-content/uploads/2024/02/What-Is-Electron-Executor-300x275.webp' /* Electron */
];

// Instalação do Service Worker - cacheia os arquivos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta requisições de rede - serve do cache se disponível, senão da rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }
        // Não está no cache - busca na rede
        return fetch(event.request);
      })
  );
});

// Ativação do Service Worker - limpa caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Deleta caches antigos
          }
        })
      );
    })
  );
});
