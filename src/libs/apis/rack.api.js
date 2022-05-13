import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const addRack = function ({ accessToken, lotId, reqData }) {
  if (stringIsNotEmpty(lotId)) {
    return getAxios({ accessToken }).post(
      '/lot/'.concat(lotId).concat('/rack'),
      { ...reqData }
    );
  } else {
    return Promise.reject('ID phân khu không tồn tại');
  }
};

export const getRacksInLot = function ({ accessToken, lotId, reqData }) {
  if (stringIsNotEmpty(lotId)) {
    return getAxios({ accessToken }).get(
      '/lot/'.concat(lotId).concat('/racks'),
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

export const getRackInfo = function ({ accessToken, lotId, rackId }) {
  if (stringIsNotEmpty(lotId) && stringIsNotEmpty(rackId)) {
    return getAxios({ accessToken }).get(
      '/lot/'.concat(lotId).concat('/rack/').concat(rackId)
    );
  } else {
    return Promise.reject('ID phân khu hoặc ID kệ không tồn tại');
  }
};

export const getRackProducts = function ({ accessToken, rackId, reqData }) {
  if (stringIsNotEmpty(rackId)) {
    return getAxios({ accessToken }).get(
      '/rack/'.concat(rackId).concat('/products/'),
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('ID kệ không tồn tại');
  }
};

export const getRackPhotoSignedUrl = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/photos/rack/upload/url', {
    params: {
      ...reqData,
    },
  });
};

export const deleteRack = function ({ accessToken, lotId, rackId }) {
  if (stringIsNotEmpty(lotId) && stringIsNotEmpty(rackId)) {
    return getAxios({ accessToken }).delete('/rack/'.concat(rackId), {
      params: {
        lotId,
      },
    });
  } else {
    return Promise.reject('ID phân khu hoặc ID kệ không tồn tại');
  }
};
