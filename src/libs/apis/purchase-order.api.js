import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const addPurchaseOrder = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/purchase-order', {
    ...reqData,
  });
};

export const updatePurchaseOrderInfoById = function ({
  accessToken,
  purchaseOrderId,
  reqData,
}) {
  if (stringIsNotEmpty(purchaseOrderId)) {
    return getAxios({ accessToken }).patch(
      '/purchase-order/'.concat(purchaseOrderId),
      { ...reqData }
    );
  } else {
    return Promise.reject('ID đơn đặt hàng không tồn tại');
  }
};

export const getPurchaseOrders = function ({ accessToken, reqData }) {
  console.info(reqData);
  return getAxios({ accessToken }).get('/purchase-orders', {
    params: {
      ...reqData,
    },
  });
};

export const getPurchaseOrderInfoById = function ({
  accessToken,
  purchaseOrderId,
}) {
  if (stringIsNotEmpty(purchaseOrderId)) {
    return getAxios({ accessToken }).get(
      '/purchase-order/'.concat(purchaseOrderId)
    );
  } else {
    return Promise.reject('ID đơn đặt hàng không tồn tại');
  }
};

export const getPurchaseOrderProducts = function ({
  accessToken,
  purchaseOrderId,
  reqData,
}) {
  if (stringIsNotEmpty(purchaseOrderId)) {
    return getAxios({ accessToken }).get(
      '/purchase-order/'.concat(purchaseOrderId).concat('/products'),
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('ID đơn đặt hàng không tồn tại');
  }
};

export const updatePurchaseOrderStatus = function ({
  accessToken,
  purchaseOrderId,
  statusKey,
}) {
  if (stringIsNotEmpty(purchaseOrderId) && stringIsNotEmpty(statusKey)) {
    return getAxios({ accessToken }).patch(
      '/purchase-order/'
        .concat(purchaseOrderId)
        .concat('/status/')
        .concat(statusKey)
    );
  } else {
    return Promise.reject('ID đơn đặt hàng hoặc ID trạng thái không tồn tại');
  }
};

export const getPurchaseOrderStatusLogs = function ({
  accessToken,
  purchaseOrderId,
}) {
  if (stringIsNotEmpty(purchaseOrderId)) {
    return getAxios({ accessToken }).get(
      '/purchase-order/'.concat(purchaseOrderId).concat('/logs/status')
    );
  } else {
    return Promise.reject('ID đơn đặt hàng không tồn tại');
  }
};
