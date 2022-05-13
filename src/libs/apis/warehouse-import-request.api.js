import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const addWarehouseImportRequest = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/import', {
    ...reqData,
  });
};

export const addWarehouseImportRequestFromPurchaseOrder = function ({
  accessToken,
  purchaseOrderId,
  reqData,
}) {
  if (stringIsNotEmpty(purchaseOrderId)) {
    return getAxios({ accessToken }).post(
      '/purchase-order/'.concat(purchaseOrderId).concat('/import'),
      {
        ...reqData,
      }
    );
  } else {
    return Promise.reject('ID đơn mua hàng không tồn tại');
  }
};

export const getWarehouseImportRequestsFromPurchaseOrder = function ({
  accessToken,
  purchaseOrderId,
  reqData,
}) {
  if (stringIsNotEmpty(purchaseOrderId)) {
    return getAxios({ accessToken }).get(
      '/purchase-order/'.concat(purchaseOrderId).concat('/imports'),
      {
        ...reqData,
      }
    );
  } else {
    return Promise.reject('ID đơn mua hàng không tồn tại');
  }
};

export const getWarehouseImportRequests = function ({ accessToken, reqData }) {
  // console.info(reqData);
  return getAxios({ accessToken }).get('/imports', {
    params: {
      ...reqData,
    },
  });
};

export const getWarehouseImportRequestInfoById = function ({
  accessToken,
  requestId,
}) {
  if (stringIsNotEmpty(requestId)) {
    return getAxios({ accessToken }).get('/import/'.concat(requestId));
  } else {
    return Promise.reject('ID yêu cầu nhập kho không tồn tại');
  }
};

export const getWarehouseImportRequestProducts = function ({
  accessToken,
  requestId,
  reqData,
}) {
  if (stringIsNotEmpty(requestId)) {
    return getAxios({ accessToken }).get(
      '/import/'.concat(requestId).concat('/products'),
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('ID yêu cầu nhập kho không tồn tại');
  }
};

export const updateWarehouseImportRequestStatus = function ({
  accessToken,
  requestId,
  statusKey,
}) {
  if (stringIsNotEmpty(requestId) && stringIsNotEmpty(statusKey)) {
    return getAxios({ accessToken }).patch(
      '/import/'.concat(requestId).concat('/status/').concat(statusKey)
    );
  } else {
    return Promise.reject(
      'ID yêu cầu nhập kho hoặc ID trạng thái không tồn tại'
    );
  }
};

export const getWarehouseImportRequestStatusLogs = function ({
  accessToken,
  requestId,
}) {
  if (stringIsNotEmpty(requestId)) {
    return getAxios({ accessToken }).get(
      '/import/'.concat(requestId).concat('/logs/status')
    );
  } else {
    return Promise.reject('ID yêu cầu nhập kho không tồn tại');
  }
};
