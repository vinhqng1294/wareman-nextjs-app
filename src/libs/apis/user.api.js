import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const getUserProfileById = function ({ accessToken, userId }) {
  if (stringIsNotEmpty(userId)) {
    return getAxios({ accessToken }).get(
      '/user/'.concat(userId).concat('/profile')
    );
  } else {
    return Promise.reject('ID người dùng không tồn tại');
  }
};

export const getUsers = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/users', {
    params: reqData,
  });
};

export const addUser = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/user', {
    ...reqData,
  });
};

export const getUserRoleById = function ({ accessToken, userId }) {
  if (stringIsNotEmpty(userId)) {
    return getAxios({ accessToken }).get(
      '/user/'.concat(userId).concat('/roles')
    );
  } else {
    return Promise.reject('ID người dùng không tồn tại');
  }
};

export const addUserRole = function ({ accessToken, userId, roleId }) {
  if (stringIsNotEmpty(userId)) {
    return getAxios({ accessToken }).post(
      '/user/'.concat(userId).concat('/role/').concat(roleId)
    );
  } else {
    return Promise.reject('ID người dùng hoặc ID chức vụ không tồn tại');
  }
};

export const getUserPhotoSignedUrl = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/photos/user/upload/url', {
    params: {
      ...reqData,
    },
  });
};

export const deleteUserRole = function ({ accessToken, userId, roleId }) {
  if (stringIsNotEmpty(userId) && stringIsNotEmpty(roleId)) {
    return getAxios({ accessToken }).delete(
      '/user/'.concat(userId).concat('/role/').concat(roleId)
    );
  } else {
    return Promise.reject('ID nhân viên hoặc ID chức vụ không tồn tại');
  }
};
