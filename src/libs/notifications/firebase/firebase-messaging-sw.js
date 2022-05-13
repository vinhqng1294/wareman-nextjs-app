// import { getApps, initializeApp } from 'firebase/app';
// import { firebaseConfig } from './config';
// import { getMessaging } from 'firebase/messaging';
// import { onBackgroundMessage } from 'firebase/messaging/sw';

importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: 'AIzaSyBYlWitd9roTJVLDCJ0xU_fjRy-oYkWzdQ',
  authDomain: 'wareman-ffc2b.firebaseapp.com',
  projectId: 'wareman-ffc2b',
  storageBucket: 'wareman-ffc2b.appspot.com',
  messagingSenderId: '269871705890',
  appId: '1:269871705890:web:5bc7cbd3d2f6876d3f3f7b',
  vapidKey: 'BIvELnWudAROuqvjDCawV7VGVcpSWXef6AKLx9zkDm3--PhK_0b_cU766qFyuQU8YJdbYC0rAbL7-6fcepaJV34'
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log(
    '[firebase-messaging-sw-dev.js] Received background message:',
    payload,
  );

  const notificationTitle = payload?.notification?.title;
  const notificationOptions = {
    body: payload?.notification?.body,
    data: payload?.notification?.data,
    icon: /*payload?.notification?.icon ??*/ '/warehouse-32x32.png',
    image: payload?.notification?.image ?? '',
    badge: /*payload?.notification.badge ??*/ '/warehouse-32x32.png',
    actions: [
      {
        action: 'like-noti',
        title: 'Like'
      },
      {
        action: 'unlike-noti',
        title: 'Unlike'
      }
    ],
  };

  // return self.registration.showNotification(
  //   notificationTitle,
  //   notificationOptions,
  // );
});

console.log('Success register firebase service worker');
