// ফাইলের নাম: serviceWorker.js
const CACHE_NAME = "music-manager-v1";
const ASSETS = [
  "./", // বর্তমান ফোল্ডার
  "./index.html", // আপনার মূল HTML ফাইলের নাম যদি index.html হয়
  "./manifest.json",
  "./icon-192.png"
  // অন্য কোনো ছবি বা ফাইল থাকলে এখানে লিখুন
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
