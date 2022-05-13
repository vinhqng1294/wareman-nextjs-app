import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { ActionTypes_ImportRequest } from './import-request.actionTypes';
import { InitialState_ImportRequest } from './import-request.initialStates';

const persistConfig = {
  key: 'warehouseImportRequest',
  storage: sessionStorage,
  whitelist: Object.keys(InitialState_ImportRequest),
};

export const Reducer_ImportRequest = persistReducer(
  persistConfig,
  function (state = InitialState_ImportRequest, action) {
    switch (action.type) {
      case ActionTypes_ImportRequest.SetCreateImportData: {
        const createImportData = action.payload;
        return { ...state, createImportRequest: { ...createImportData } };
      }
      case ActionTypes_ImportRequest.ClearCreateImportData: {
        // sessionStorage.clear();
        return {
          ...state,
          createImportRequest: {
            ...InitialState_ImportRequest.createImportRequest,
          },
        };
      }
      default:
        return { ...state };
    }
  }
);
