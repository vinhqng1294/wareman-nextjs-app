import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import '@/styles/globals.css';

const MyApp = function ({ Component, pageProps }) {
  // console.info('pageProps', pageProps);

  // const [appState, setAppState] = useState('test');
  // console.info('AppState', appState);

  // const mainAppProps = {
  //   appState,
  // };

  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {() => (
            <React.Fragment>
              <Component
                {...pageProps}
                //  {...mainAppProps}
              />
            </React.Fragment>
          )}
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
};

export default MyApp;
