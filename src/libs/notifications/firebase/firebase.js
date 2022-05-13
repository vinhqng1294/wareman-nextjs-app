import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from './config';
import localforage from 'localforage';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { addFcmToken } from '@/apis/notification.api';

const LOCAL_FCM_TOKEN_KEY = 'fcm_token';
const swUrl = '/scripts/js/firebase-messaging-sw.bundle.js';

const getTokenFromLocal = async () => {
  return localforage.getItem(LOCAL_FCM_TOKEN_KEY);
};

const requestNotificationPermission = async () => {
  return Notification.permission === 'default' ? (await Notification.requestPermission()) : Notification.permission;
};

const registerSW = async () => {
  try {
    const registration = await navigator?.serviceWorker?.register(swUrl);
    return registration;
  } catch (e) {
    console.log(e);
  }
};

const initToken = async ({ accessToken }) => {
  // return if no brower is detected
  if (typeof window === 'undefined') return null;

  try {
    // localforage.config({
    //   name: 'firebase',
    //   version: '1',
    // });

    // await localforage.setDriver(localforage.INDEXEDDB);
    // await localforage.ready();

    // const localToken = await getTokenFromLocal();

    // if (localToken) return localToken;

    const swRegistration = await registerSW();

    const messaging = getMessaging();

    const fcmToken = await getToken(messaging, { vapidKey: firebaseConfig.vapidKey, serviceWorkerRegistration: swRegistration });

    // fcmToken && localforage.setItem(LOCAL_FCM_TOKEN_KEY, fcmToken);

    await addFcmToken({ accessToken, reqData: { token: fcmToken } });

    return fcmToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const subscribeNotification = async ({ accessToken }) => {
  const notificationPermission = await requestNotificationPermission();

  if (notificationPermission === 'granted') {
    getApps().length === 0 && initializeApp(firebaseConfig);
    const messaging = getMessaging();
    const fcmToken = await initToken({ accessToken });
    console.log('Listen message with FCM token: ', fcmToken);
  
    fcmToken && onMessage(messaging, (payload) => {
      console.log('payload', payload);
    }); 
  }
};

export const subscribeBackgroundNotification = async ({ accessToken }) => {
  const notificationPermission = await requestNotificationPermission();

  if (notificationPermission === 'granted') {
    getApps().length === 0 && initializeApp(firebaseConfig);
    const fcmToken = await initToken({ accessToken });
    console.log('Listen message with FCM token: ', fcmToken);
  }
};
