import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { ActionTypes_ExportRequest } from './export-request.actionTypes';
import { InitialState_ExportRequest } from './export-request.initialStates';

const persistConfig = {
  key: 'warehouseExportRequest',
  storage: sessionStorage,
  whitelist: Object.keys(InitialState_ExportRequest),
};

export const Reducer_ExportRequest = persistReducer(
  persistConfig,
  function (state = InitialState_ExportRequest, action) {
    switch (action.type) {
      case ActionTypes_ExportRequest.SetCreateExportData: {
        const createExportData = action.payload;
        return { ...state, createExportRequest: { ...createExportData } };
      }
      case ActionTypes_ExportRequest.ClearCreateExportData: {
        // sessionStorage.clear();
        return {
          ...state,
          createExportRequest: {
            ...InitialState_ExportRequest.createExportRequest,
          },
        };
      }
      default:
        return { ...state };
    }
  }
);
