const path = require('path');
const DotEnv = require('dotenv-webpack');

module.exports = (envs) => {
  return {
    plugins: [
      new DotEnv({ path: path.resolve(__dirname, `.env.${envs.env}`) }),
    ],
    optimization: {
      minimize: true,
    },  
    // The entry point file described above
    entry: {
      // Custom register service worker in ./src/libs/notifications/firebase/firebase.js (swRegistration)
      'firebase-messaging-sw': './src/libs/notifications/firebase/firebase-messaging-sw.js',
      // Custom register service worker in ./src/libs/notifications/signalr/signalr.js (swRegistration)
      'signalr-messaging-sw': './src/libs/notifications/signalr/signalr-messaging-sw.js'
    },
    // The location of the build folder described above
    output: {
      path: path.resolve(__dirname, 'public/'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          use: {
            loader: 'babel-loader',
            options: {},
          },
        },
      ],
    },
  }
};
