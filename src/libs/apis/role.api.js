import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const getRoles = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/roles', {
    params: {
      ...reqData,
    },
  });
};

export const getPermissions = function ({ accessToken, reqData }) {
  try {
    return getAxios({ accessToken }).get('/system/permissions', {
      params: reqData,
    });
  } catch (e) {
    return Promise.reject('ERROR WHEN GET PERMISSIONS');
  }
};

export const addRole = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/role', {
    ...reqData,
  });
};

export const getRolePhotosById = function ({ accessToken, roleId }) {
  if (stringIsNotEmpty(roleId)) {
    return getAxios({ accessToken }).get(
      '/roles/'.concat(roleId).concat('/photos')
    );
  } else {
    return Promise.reject('ID chức vụ không tồn tại');
  }
};

// will not using soon
export const getRoleInfoById = function ({ accessToken, roleId }) {
  try {
    return getAxios({ accessToken }).get('/role/'.concat(roleId));
  } catch (e) {
    return Promise.reject('ID chức vụ không tồn tại');
  }
};
