importScripts('/scripts/webworker/signalr.js');
importScripts('/scripts/webworker/signalr.min.js');

let connection = null;

const initConnection = async ({ config }) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(config.provider.config.endpointUrl, {
      transport: signalR.HttpTransportType.WebSockets,
      skipNegotiation: true,
      logMessageContent: false,
      accessTokenFactory: () => config.accessToken,
      withCredentials: true
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.None)
    .build();
  return connection;
};

const subscribeNotification = async ({ config }) => {
  console.log(connection);
  if (connection) return;

  await initConnection({ config });

  connection.on('Notification', async (data) => {
    try {
      const payload = JSON.parse(data);

      const notificationTitle = payload?.options?.title;
      const notificationOptions = {
        body: payload?.options?.body,
        data: {
          ...payload?.options?.data,
          url: `${config?.appDomain}/${payload?.scope.toLowerCase()}s/${payload?.options?.data?.id}`
        },
        icon: /*payload?.options?.icon ??*/ '/warehouse-32x32.png',
        image: payload?.options?.image ?? '',
        badge: /*payload?.options.badge ??*/ '/warehouse-32x32.png',
      };

      // Only send noti when user in background
      const tabs = await clients.matchAll({ type: 'window' });
      const visibleTab = tabs?.filter(tab => tab?.visibilityState === 'visible');

      visibleTab?.length === 0
        && self.registration.showNotification(
          notificationTitle,
          notificationOptions,
        );
      return;
    } catch (e) {}
  });

  await connection.start();
  await connection.invoke('Subscribe');

  console.log('Success listen background notification');
};

const register = async () => {
  console.log('Start register background notification');
  const swBc = new BroadcastChannel(process.env.NEXT_PUBLIC_NOTIFICATION_BROADCAST_CHANNEL_NAME);
  swBc.onmessage = async (e) => {
    const config = e?.data;
    await subscribeNotification({ config });
  };
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  clients.openWindow(new URL(event?.notification?.data?.url));
});

register();
