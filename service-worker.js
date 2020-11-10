importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([{
    url: "/index.html",
    revision: "1"
  },
  {
    url: "/assets/images/logo_app.png",
    revision: "1"
  },
  {
    url: "/assets/images/maskable_icon.png",
    revision: "1"
  },
  {
    url: "/assets/navigation/nav.html",
    revision: "1"
  },
  {
    url: "/css/materialize.min.css",
    revision: "1"
  },
  {
    url: "/css/style.css",
    revision: "1"
  },
  {
    url: "/js/materialize.min.js",
    revision: "1"
  },
  {
    url: "/js/api.js",
    revision: "1"
  },
  {
    url: "/js/idb.js",
    revision: "1"
  },
  {
    url: "/js/db.js",
    revision: "1"
  },
  {
    url: "/js/script.js",
    revision: "1"
  },
  {
    url: "/manifest.json",
    revision: "1"
  },
], {
  ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "api-data"
  })
);

workbox.routing.registerRoute(
  new RegExp("/assets/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);

workbox.routing.registerRoute(
  new RegExp("https://crests.football-data.org/"),
  workbox.strategies.cacheFirst({
    cacheName: "image-data",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "push message no payload";
  }

  var options = {
    body: body,
    vibrate: [100, 50, 100],
    icons: "/assets/images/logo_app.png",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
})