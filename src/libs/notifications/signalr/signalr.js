import {
  HubConnectionBuilder,
  HttpTransportType,
  LogLevel,
} from '@microsoft/signalr';
import { signalrConfig } from './config';
import { joinBroadcastChannel } from '@/libs/notifications';

const swUrl = '/signalr-messaging-sw.bundle.js';

export const initConnection = async ({ accessToken }) => {
  return new HubConnectionBuilder()
    .withUrl(signalrConfig.endpointUrl, {
      transport: HttpTransportType.WebSockets,
      skipNegotiation: true,
      logMessageContent: false,
      accessTokenFactory: () => accessToken,
      withCredentials: true,
      headers: {}
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.None)
    .build();
};

export const subscribeNotification = async ({ accessToken }) => {
  try {
    const connection = await initConnection({ accessToken });
  
    await connection.start();
    await connection.invoke('Subscribe');

    return connection;
  } catch (e) {
    console.log(e);
  }
};

export const registerSwWithPerm = async ({ notification }) => {
  try {
    if ('serviceWorker' in navigator) {
      const notificationPerm = Notification?.permission == 'default'
        ? await requestNotificationPerm()
        : Notification?.permission;

      notificationPerm === 'granted' && await registerSW({ notification });
      notificationPerm === 'denied' && await unRegisterSW();

      const notificationPermissionStatus = await navigator?.permissions?.query({ name:'notifications' });

      notificationPermissionStatus.onchange = async (e) => {
        if (notificationPermissionStatus.state === 'granted') {
          await registerSW({ notification });
        } else if (notificationPermissionStatus.state === 'prompt') {
          await Notification?.requestPermission();
        } else {
          await unRegisterSW();
        }
      };
    }
  } catch (e) {
    console.log('Error during service worker registration:', e);
  }
};

const requestNotificationPerm = async () => {
  return await Notification.requestPermission();
};

const registerSW = async ({ notification, config }) => {
  try {
    const registration = await navigator.serviceWorker.getRegistration(swUrl)
      || await navigator?.serviceWorker?.register(swUrl, { scope: '/' });

    joinBroadcastChannel({ notification });

    registration.onupdatefound = async () => {
      const installingWorker = registration?.installing;
      if (!installingWorker) return;
  
      installingWorker.onstatechange = async () => {
        if (installingWorker.state === 'installed')
          navigator?.serviceWorker?.controller
            ? config?.onUpdate(registration)
            : config?.onSuccess(registration);
        else if (installingWorker.state === 'activated') {
        }
      };
      console.log('Update service worker');
      await registration.update();
      joinBroadcastChannel({ notification });
    };
    return registration;
  } catch (e) {
    console.log('Error during register foreground service worker:', e);
  }
};

const unRegisterSW = async () => {
  try {
    const registration = await navigator.serviceWorker.getRegistration(swUrl);
    await registration?.unregister();
    return registration;
  } catch (e) {
    console.log('Error during unregister foreground service worker:', e);
  }
};
