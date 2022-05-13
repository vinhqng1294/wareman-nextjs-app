import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const addWarehouseExportRequest = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/export', {
    ...reqData,
  });
};

export const addWarehouseExportRequestFromSaleOrder = function ({
  accessToken,
  saleOrderId,
  reqData,
}) {
  return getAxios({ accessToken }).post(
    '/sale-order/'.concat(saleOrderId).concat('/export'),
    {
      ...reqData,
    }
  );
};

export const getWarehouseExportRequestsFromSaleOrder = function ({
  accessToken,
  saleOrderId,
  reqData,
}) {
  if (stringIsNotEmpty(saleOrderId)) {
    return getAxios({ accessToken }).get(
      '/sale-order/'.concat(saleOrderId).concat('/exports'),
      {
        ...reqData,
      }
    );
  } else {
    return Promise.reject('ID đơn bán hàng không tồn tại');
  }
};

export const getWarehouseExportRequests = function ({ accessToken, reqData }) {
  console.info(reqData);
  return getAxios({ accessToken }).get('/exports', {
    params: {
      ...reqData,
    },
  });
};

export const getWarehouseExportRequestInfoById = function ({
  accessToken,
  requestId,
}) {
  if (stringIsNotEmpty(requestId)) {
    return getAxios({ accessToken }).get('/export/'.concat(requestId));
  } else {
    return Promise.reject('ID yêu cầu xuất kho không tồn tại');
  }
};

export const getWarehouseExportRequestProducts = function ({
  accessToken,
  requestId,
  reqData,
}) {
  if (stringIsNotEmpty(requestId)) {
    return getAxios({ accessToken }).get(
      '/export/'.concat(requestId).concat('/products'),
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('ID yêu cầu xuất kho không tồn tại');
  }
};

export const updateWarehouseExportRequestStatus = function ({
  accessToken,
  requestId,
  statusKey,
}) {
  if (stringIsNotEmpty(requestId) && stringIsNotEmpty(statusKey)) {
    return getAxios({ accessToken }).patch(
      '/export/'.concat(requestId).concat('/status/').concat(statusKey)
    );
  } else {
    return Promise.reject(
      'ID yêu cầu xuất kho hoặc ID trạng thái không tồn tại'
    );
  }
};

export const getWarehouseExportRequestStatusLogs = function ({
  accessToken,
  requestId,
}) {
  if (stringIsNotEmpty(requestId)) {
    return getAxios({ accessToken }).get(
      '/export/'.concat(requestId).concat('/logs/status')
    );
  } else {
    return Promise.reject('ID yêu cầu xuất kho không tồn tại');
  }
};
