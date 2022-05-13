import { ActionTypes_ImportRequest } from './import-request.actionTypes';

export const Action_ImportRequest = {
  SetCreateImportData: function ({ purchaseOrderId }) {
    return {
      type: ActionTypes_ImportRequest.SetCreateImportData,
      payload: { purchaseOrderId },
    };
  },
  ClearCreateImportData: function ({}) {
    return {
      type: ActionTypes_ImportRequest.ClearCreateImportData,
      payload: {},
    };
  },
};
