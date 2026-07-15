const CACHE = "30-fuerte-v12";
const ASSETS = ["./", "index.html", "styles-v8.css", "app-v9.js", "manifest.webmanifest", "icon.svg"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
self.addEventListener("notificationclick", e => { e.notification.close(); e.waitUntil(clients.matchAll({ type: "window" }).then(cs => cs[0] ? cs[0].focus() : clients.openWindow("./"))); });
