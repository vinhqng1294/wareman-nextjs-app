export const joinBroadcastChannel = ({ notification }) => {
  try {
    const bc = new BroadcastChannel(notification?.channelName);
    const message = JSON.parse(JSON.stringify(notification));
    bc.postMessage(message);
  } catch (e) {
    console.log('Fail to broadcast message:', e);
  }
};
