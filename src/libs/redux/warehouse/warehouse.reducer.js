import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { ActionTypes_Warehouse } from './warehouse.actionTypes';
import { InitialState_Warehouse } from './warehouse.initialStates';

const persistConfig = {
  key: 'warehouse',
  storage: storage,
  whitelist: Object.keys(InitialState_Warehouse),
};

export const Reducer_Warehouse = persistReducer(
  persistConfig,
  function (state = InitialState_Warehouse, action) {
    switch (action.type) {
      case ActionTypes_Warehouse.SetSelectedWarehouseInfo: {
        const selectedWarehouseInfo = action.payload;
        return {
          ...state,
          selectedWarehouseInfo: { ...selectedWarehouseInfo },
        };
      }
      case ActionTypes_Warehouse.ClearSelectedWarehouseInfo: {
        // sessionStorage.clear();
        return {
          ...state,
          selectedWarehouseInfo: {
            ...InitialState_Warehouse.selectedWarehouseInfo,
          },
        };
      }
      default:
        return { ...state };
    }
  }
);
