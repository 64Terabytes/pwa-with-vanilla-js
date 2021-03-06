const staticACMusic = "AC-Music-PWA-v1";
const assets = [
  "/",
  "/serviceWorker.js",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/new-leaf-box-art.jpg",
  "/audio/*"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticACMusic).then(cache => {
       return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
