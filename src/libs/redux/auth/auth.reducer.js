import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { ActionTypes_Auth } from './auth.actionTypes';
import { InitialState_Auth } from './auth.initialStates';

const persistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: Object.keys(InitialState_Auth),
};

export const Reducer_Auth = persistReducer(
  persistConfig,
  function (state = InitialState_Auth, action) {
    switch (action.type) {
      case ActionTypes_Auth.LoginSuccess: {
        const userData = action.payload;
        return { ...state, user1: { ...userData } };
      }
      case ActionTypes_Auth.SetAccessToken: {
        const accessToken = action.payload;
        return { ...state, ...accessToken };
      }
      case ActionTypes_Auth.Logout: {
        localStorage.clear();
        // sessionStorage.clear();
        return InitialState_Auth;
      }
      default:
        return { ...state };
    }
  }
);
