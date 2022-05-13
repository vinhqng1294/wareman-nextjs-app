import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const getProviders = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/providers', {
    params: reqData,
  });
};

export const addProvider = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/provider', {
    ...reqData,
  });
};

export const getProviderInfoById = function ({ accessToken, providerId }) {
  if (stringIsNotEmpty(providerId)) {
    return getAxios({ accessToken }).get('/provider/'.concat(providerId));
  } else {
    return Promise.reject('ID nhà cung cấp không tồn tại');
  }
};

export const getProviderAddressesById = function ({ accessToken, providerId }) {
  if (stringIsNotEmpty(providerId)) {
    return getAxios({ accessToken }).get(
      '/providers/'.concat(providerId).concat('/addresses')
    );
  } else {
    return Promise.reject('ID nhà cung cấp không tồn tại');
  }
};

export const getProviderContactsById = function ({ accessToken, providerId }) {
  if (stringIsNotEmpty(providerId)) {
    return getAxios({ accessToken }).get(
      '/providers/'.concat(providerId).concat('/contacts')
    );
  } else {
    return Promise.reject('ID nhà cung cấp không tồn tại');
  }
};

export const getProviderPhotosById = function ({ accessToken, providerId }) {
  if (stringIsNotEmpty(providerId)) {
    return getAxios({ accessToken }).get(
      '/providers/'.concat(providerId).concat('/photos')
    );
  } else {
    return Promise.reject('ID nhà cung cấp không tồn tại');
  }
};

export const getProviderPhotoSignedUrl = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/photos/provider/upload/url', {
    params: {
      ...reqData,
    },
  });
};

export const deleteProvider = function ({ accessToken, providerId }) {
  if (stringIsNotEmpty(providerId)) {
    return getAxios({ accessToken }).delete('/provider/'.concat(providerId));
  } else {
    return Promise.reject('ID nhà cung cấp không tồn tại');
  }
};
