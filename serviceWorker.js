// ফাইলের নাম: serviceWorker.js

const CACHE_NAME = 'music-manager-v2';
const FILES_TO_CACHE = [
    './', // বর্তমান ফোল্ডার
    // আপনার HTML ফাইলটির নাম যদি অন্য কিছু হয়, তবে এখানে সেটি লিখুন (যেমন: index.html)
    // নিচে আপনার ব্যবহৃত সব অনলাইন লাইব্রেরি দেওয়া হলো যাতে অফলাইনেও লোড হয়:
    'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js',
    'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Hind+Siliguri:wght@300;400;600&family=Noto+Serif+Bengali:wght@700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdn.jsdelivr.net/npm/sweetalert2@11',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// ১. ইন্সটল ইভেন্ট: সব ফাইল ক্যাশ মেমোরিতে সেভ করা
self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// ২. ফেচ ইভেন্ট: অফলাইনে থাকলে ক্যাশ থেকে ডাটা দেওয়া
self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request).then((response) => {
            // যদি ক্যাশে পাওয়া যায় তবে সেখান থেকে দাও, না হলে ইন্টারনেট থেকে আনো
            return response || fetch(evt.request);
        }).catch(() => {
            // যদি ইন্টারনেট না থাকে এবং ক্যাশেও না থাকে (যেমন নতুন ছবি)
            // তখন আমরা কিছু নাও দেখাতে পারি বা ডিফল্ট কিছু দেখাতে পারি
        })
    );
});

// ৩. অ্যাক্টিভেট ইভেন্ট: পুরনো ক্যাশ ক্লিয়ার করা (ভার্সন আপডেট হলে)
self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});
