const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
// self.addEventListener("push", (event) => {
//   const data = event.data.json();
//   const title = data.title;
//   const options = {
//     body: data.body,
//     icon: "/path/to/icon.png", // Replace with the URL of your notification icon
//     // Other options like badge, actions, etc.
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  // Handle the click event as desired (e.g., open a specific URL)
  event.waitUntil(clients.openWindow("/path/to/page"));
});
// Client-side code (Service Worker)
self.addEventListener("push", (event) => {
  const payload = event.data.json();

  // Extract the data from the payload
  const title = payload.title;
  const body = payload.body;
  const image = payload.image;
  const customData = payload.customData;

  // Customize the notification based on the payload data
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: image,
      data: customData, // Store custom data in the notification data field
    })
  );
});
