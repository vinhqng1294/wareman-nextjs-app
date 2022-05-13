import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const getLots = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/lots', {
    params: {
      ...reqData,
    },
  });
};

export const addLot = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/lot', {
    ...reqData,
  });
};

export const getLotInfoById = function ({ accessToken, lotId }) {
  if (stringIsNotEmpty(lotId)) {
    return getAxios({ accessToken }).get('/lot/'.concat(lotId));
  } else {
    return Promise.reject('ID phân khu không tồn tại');
  }
};

export const getLotProducts = function ({ accessToken, lotId, reqData }) {
  if (stringIsNotEmpty(lotId)) {
    return getAxios({ accessToken }).get(
      '/lot/'.concat(lotId).concat('/products/'),
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('ID phân khu không tồn tại');
  }
};

export const getLotPhotoSignedUrl = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/photos/lot/upload/url', {
    params: {
      ...reqData,
    },
  });
};

export const deleteLot = function ({ accessToken, lotId }) {
  if (stringIsNotEmpty(lotId)) {
    return getAxios({ accessToken }).delete('/lot/'.concat(lotId));
  } else {
    return Promise.reject('ID phân khu không tồn tại');
  }
};
