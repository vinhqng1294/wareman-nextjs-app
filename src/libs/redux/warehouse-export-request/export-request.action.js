import { ActionTypes_ExportRequest } from './export-request.actionTypes';

export const Action_ExportRequest = {
  SetCreateExportData: function ({ saleOrderId }) {
    return {
      type: ActionTypes_ExportRequest.SetCreateExportData,
      payload: { saleOrderId: saleOrderId },
    };
  },
  ClearCreateExportData: function ({}) {
    return {
      type: ActionTypes_ExportRequest.ClearCreateExportData,
      payload: {},
    };
  },
};
