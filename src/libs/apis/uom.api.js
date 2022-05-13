import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const getUoms = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/uoms', {
    params: {
      ...reqData,
    },
  });
};

export const getUomInfoById = function ({ accessToken, uomId }) {
  if (stringIsNotEmpty(uomId)) {
    return getAxios({ accessToken }).get('/uom/'.concat(uomId));
  } else {
    return Promise.reject('ID của đơn vị đo không tồn tại');
  }
};

export const addUom = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/uom', {
    ...reqData,
  });
};

export const deleteUom = function ({ accessToken, uomId }) {
  if (stringIsNotEmpty(uomId)) {
    return getAxios({ accessToken }).delete('/uom/'.concat(uomId));
  } else {
    return Promise.reject('ID của đơn vị đo  không tồn tại');
  }
};
