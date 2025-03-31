importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyDavREqkASa28JoU7uJcdMQwfI4sBU9fsU",
  authDomain: "my-tasks-bf324.firebaseapp.com",
  projectId: "my-tasks-bf324",
  messagingSenderId: "455947350292",
  appId: "1:455947350292:web:67b33608aba509f1bf5201",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: notification.body || "You have a new message.",
    icon: "/bolt.png",
    badge: "/bolt.png",
    vibrate: [100, 50, 100],
    requireInteraction: true,
    tag: "task-notification",
    renotify: true,
    data: payload.data || {},
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
