// Variables
const container = document.querySelector(".container");
var x = document.getElementById("MyAudio");
x.loop = true;
var SongLength = 999;
var CurrentHour = 999;

// x.addEventListener("ended", function(){
//      x.currentTime = 0;
//      console.log("ended");
//      StartApp();
// });

x.onloadedmetadata = function() {
    console.log("duration = " + x.duration);
    // Check the songs length and set timeout
    SongLength = x.duration * 1000;
    setTimeout(StartApp,SongLength);
}

// Plays the song
function Playsong(file) {
    x.src=file;
    x.play();
}

function StartApp() {
    var objDate = new Date();
    var hours = objDate.getHours();
    console.log(hours);
    if(CurrentHour == hours) {
        console.log("Hour hasn't changed, restarting timeout.");
        console.log(SongLength);
        setTimeout(StartApp,SongLength);
        return;
    }
    else {
        console.log("Hour changed, changing songs.");
        CurrentHour = hours;
    }
    var FileName = "";
    if(hours <= 12) {
        FileName = hours + " AM.mp3";
    }
    else {
        FileName = (hours - 12) + " PM.mp3";
    }
    console.log(FileName);
    Playsong("/audio/" + FileName);
}


// document.addEventListener("DOMContentLoaded", StartApp);
// document.getElementById("NewLeafArt").onclick(StartApp);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/new-leaf-box-art.jpg",
  "/audio/1 AM.mp3",
  "/audio/2 AM.mp3",
  "/audio/3 AM.mp3",
  "/audio/4 AM.mp3",
  "/audio/5 AM.mp3",
  "/audio/6 AM.mp3",
  "/audio/7 AM.mp3",
  "/audio/8 AM.mp3",
  "/audio/9 AM.mp3",
  "/audio/10 AM.mp3",
  "/audio/11 AM.mp3",
  "/audio/12 AM.mp3",
  "/audio/1 PM.mp3",
  "/audio/2 PM.mp3",
  "/audio/3 PM.mp3",
  "/audio/4 PM.mp3",
  "/audio/5 PM.mp3",
  "/audio/6 PM.mp3",
  "/audio/7 PM.mp3",
  "/audio/8 PM.mp3",
  "/audio/9 PM.mp3",
  "/audio/10 PM.mp3",
  "/audio/11 PM.mp3",
  "/audio/12 PM.mp3",


];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
