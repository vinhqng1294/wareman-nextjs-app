import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const addBuyingRequest = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/buying-request', {
    ...reqData,
  });
};

export const getBuyingRequests = function ({ accessToken, reqData }) {
  console.info(reqData);
  return getAxios({ accessToken }).get('/buying-requests', {
    params: {
      ...reqData,
    },
  });
};

export const getBuyingRequestInfoById = function ({
  accessToken,
  buyingRequestId,
}) {
  if (stringIsNotEmpty(buyingRequestId)) {
    return getAxios({ accessToken }).get(
      '/buying-request/'.concat(buyingRequestId)
    );
  } else {
    return Promise.reject('ID yêu cầu mua hàng không tồn tại');
  }
};

export const getBuyingRequestProducts = function ({
  accessToken,
  buyingRequestId,
  reqData,
}) {
  if (stringIsNotEmpty(buyingRequestId)) {
    return getAxios({ accessToken }).get(
      '/buying-request/'.concat(buyingRequestId).concat('/products'),
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('ID yêu cầu mua hàng không tồn tại');
  }
};

export const updateBuyingRequestStatus = function ({
  accessToken,
  buyingRequestId,
  statusKey,
}) {
  if (stringIsNotEmpty(buyingRequestId) && stringIsNotEmpty(statusKey)) {
    return getAxios({ accessToken }).patch(
      '/buying-request/'
        .concat(buyingRequestId)
        .concat('/status/')
        .concat(statusKey)
    );
  } else {
    return Promise.reject(
      'ID yêu cầu mua hàng hoặc ID trạng thái không tồn tại'
    );
  }
};

export const getBuyingRequestStatusLogs = function ({
  accessToken,
  buyingRequestId,
}) {
  if (stringIsNotEmpty(buyingRequestId)) {
    return getAxios({ accessToken }).get(
      '/buying-request/'.concat(buyingRequestId).concat('/logs/status')
    );
  } else {
    return Promise.reject('ID yêu cầu mua hàng không tồn tại');
  }
};
