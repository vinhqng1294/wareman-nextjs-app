import { ActionTypes_ProductStock } from './product-stock.actionTypes';

export const Action_ProductStock = {
  SetUpdateProductStockData: function ({ productStockId }) {
    return {
      type: ActionTypes_ProductStock.SetUpdateProductStock,
      payload: { productStockId: productStockId },
    };
  },
  ClearUpdateProductStockData: function ({}) {
    return {
      type: ActionTypes_ProductStock.ClearUpdateProductStock,
      payload: {},
    };
  },
};
