import { getAxios } from '@/apis/axios/setupAxios';

export const login = function ({ email, password }) {
  return getAxios({}).post('/session', {
    email,
    password,
  });
};

export const getCurrentUserInfo = function ({ accessToken }) {
  return getAxios({ accessToken }).get('/user/current/profile');
};

export const getCurrentUserPermission = function ({ accessToken }) {
  return getAxios({ accessToken }).get('/user/current/permissions');
};
