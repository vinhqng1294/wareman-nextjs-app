import { ActionTypes_Warehouse } from './warehouse.actionTypes';

export const Action_Warehouse = {
  SetSelectedWarehouseInfo: function ({ selectedWarehouseInfo }) {
    return {
      type: ActionTypes_Warehouse.SetSelectedWarehouseInfo,
      payload: { selectedWarehouseInfo: selectedWarehouseInfo },
    };
  },
  ClearSelectedWarehouseInfo: function ({}) {
    return {
      type: ActionTypes_Warehouse.ClearSelectedWarehouseInfo,
      payload: {},
    };
  },
};
