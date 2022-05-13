import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const getCustomers = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/customers', {
    params: reqData,
  });
};

export const addCustomer = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/customer', {
    ...reqData,
  });
};

export const getCustomerInfoById = function ({ accessToken, customerId }) {
  if (stringIsNotEmpty(customerId)) {
    return getAxios({ accessToken }).get('/customer/'.concat(customerId));
  } else {
    return Promise.reject('ID khách hàng không tồn tại');
  }
};

export const getCustomerAddressesById = function ({ accessToken, customerId }) {
  if (stringIsNotEmpty(customerId)) {
    return getAxios({ accessToken }).get(
      '/customers/'.concat(customerId).concat('/addresses')
    );
  } else {
    return Promise.reject('ID khách hàng không tồn tại');
  }
};

export const getCustomerContactsById = function ({ accessToken, customerId }) {
  if (stringIsNotEmpty(customerId)) {
    return getAxios({ accessToken }).get(
      '/customers/'.concat(customerId).concat('/contacts')
    );
  } else {
    return Promise.reject('ID khách hàng không tồn tại');
  }
};

export const getCustomerPhotosById = function ({ accessToken, customerId }) {
  if (stringIsNotEmpty(customerId)) {
    return getAxios({ accessToken }).get(
      '/customers/'.concat(customerId).concat('/photos')
    );
  } else {
    return Promise.reject('ID khách hàng không tồn tại');
  }
};

export const getCustomerPhotoSignedUrl = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/photos/customer/upload/url', {
    params: {
      ...reqData,
    },
  });
};
