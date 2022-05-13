import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { ActionTypes_ProductStock } from './product-stock.actionTypes';
import { InitialState_ProductStock } from './product-stock.initialStates';

const persistConfig = {
  key: 'productStock',
  storage: sessionStorage,
  whitelist: Object.keys(InitialState_ProductStock),
};

export const Reducer_ProductStock = persistReducer(
  persistConfig,
  function (state = InitialState_ProductStock, action) {
    switch (action.type) {
      case ActionTypes_ProductStock.SetUpdateProductStock: {
        const updateProductStockData = action.payload;
        return { ...state, updateProductStock: { ...updateProductStockData } };
      }
      case ActionTypes_ProductStock.ClearUpdateProductStock: {
        // sessionStorage.clear();
        return {
          ...state,
          updateProductStock: {
            ...InitialState_ProductStock.updateProductStock,
          },
        };
      }
      default:
        return { ...state };
    }
  }
);
