 // Scripts for firebase and firebase messaging
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

 // Initialize the Firebase app in the service worker by passing the generated config
//  VITE_APP_API_KEY=AIzaSyBeAznH96pTT4ox2zJXplm2cJDuwrH5PyI
// VITE_APP_AUTH_DOMAIN=e-fuldmagt-293d9.firebaseapp.com
// VITE_APP_PROJECT_ID=e-fuldmagt-293d9
// VITE_APP_STORAGE_BUCKET=e-fuldmagt-293d9.appspot.com
// VITE_APP_MESSAGING_SENDER_ID=577369403495
// VITE_APP_APP_ID=1:577369403495:web:6e5f97c8c39906d03ae4c2
// VITE_APP_MEASUREMENT_ID=your-measurement-id
// VITE_APP_VAPID_KEY=BIFl9T9g62BkA5RlhK803-bVAB7FH14UH6ZKek4UWz6Qz-yuQjKRM1MGXFwxkiuEqAKlp-1ET0aesLoBGHCQzVI
 const firebaseConfig = {
   apiKey: "AIzaSyBeAznH96pTT4ox2zJXplm2cJDuwrH5PyI",
   authDomain: "e-fuldmagt-293d9.firebaseapp.com",
   projectId: "e-fuldmagt-293d9",
   storageBucket: "e-fuldmagt-293d9.appspot.com",
   messagingSenderId: "577369403495",
   appId: "1:577369403495:web:6e5f97c8c39906d03ae4c2",
   measurementId: "YOURDATA",
 };

 firebase.initializeApp(firebaseConfig);

 // Retrieve firebase messaging
 const messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);

   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });