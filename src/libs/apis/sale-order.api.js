import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const addSaleOrder = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/sale-order', {
    ...reqData,
  });
};

export const updateSaleOrderInfoById = function ({
  accessToken,
  saleOrderId,
  reqData,
}) {
  if (stringIsNotEmpty(saleOrderId)) {
    return getAxios({ accessToken }).patch('/sale-order/'.concat(saleOrderId), {
      ...reqData,
    });
  } else {
    return Promise.reject('ID đơn bán hàng không tồn tại');
  }
};

export const getSaleOrders = function ({ accessToken, reqData }) {
  console.info(reqData);
  return getAxios({ accessToken }).get('/sale-orders', {
    params: {
      ...reqData,
    },
  });
};

export const getSaleOrderInfoById = function ({ accessToken, saleOrderId }) {
  if (stringIsNotEmpty(saleOrderId)) {
    return getAxios({ accessToken }).get('/sale-order/'.concat(saleOrderId));
  } else {
    return Promise.reject('ID đơn bán hàng không tồn tại');
  }
};

export const getSaleOrderProducts = function ({
  accessToken,
  saleOrderId,
  reqData,
}) {
  if (stringIsNotEmpty(saleOrderId)) {
    return getAxios({ accessToken }).get(
      '/sale-order/'.concat(saleOrderId).concat('/products'),
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('ID đơn bán hàng không tồn tại');
  }
};

export const updateSaleOrderStatus = function ({
  accessToken,
  saleOrderId,
  statusKey,
}) {
  if (stringIsNotEmpty(saleOrderId) && stringIsNotEmpty(statusKey)) {
    return getAxios({ accessToken }).patch(
      '/sale-order/'.concat(saleOrderId).concat('/status/').concat(statusKey)
    );
  } else {
    return Promise.reject('ID đơn bán hàng hoặc ID trạng thái không tồn tại');
  }
};

export const getSaleOrderStatusLogs = function ({ accessToken, saleOrderId }) {
  if (stringIsNotEmpty(saleOrderId)) {
    return getAxios({ accessToken }).get(
      '/sale-order/'.concat(saleOrderId).concat('/logs/status')
    );
  } else {
    return Promise.reject('ID đơn bán hàng không tồn tại');
  }
};
