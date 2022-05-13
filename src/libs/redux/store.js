import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import rootReducer from '@/redux/root-reducer';
import { persistStore } from 'redux-persist';

let middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
