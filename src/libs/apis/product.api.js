import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const getProducts = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/products', {
    params: {
      ...reqData,
    },
  });
};

export const addProduct = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).post('/product', {
    ...reqData,
  });
};

export const getProductInfoById = function ({ accessToken, productId }) {
  if (stringIsNotEmpty(productId)) {
    return getAxios({ accessToken }).get('/product/'.concat(productId));
  } else {
    return Promise.reject('ID sản phẩm không tồn tại');
  }
};

export const getProductSpecsById = function ({ accessToken, productId }) {
  if (stringIsNotEmpty(productId)) {
    return getAxios({ accessToken }).get(
      '/product/'.concat(productId).concat('/specs')
    );
  } else {
    return Promise.reject('ID sản phẩm không tồn tại');
  }
};

export const getProductDescriptionById = function ({ accessToken, productId }) {
  if (stringIsNotEmpty(productId)) {
    return getAxios({ accessToken }).get(
      '/product/'.concat(productId).concat('/description')
    );
  } else {
    return Promise.reject('ID sản phẩm không tồn tại');
  }
};

export const getProductPhotosById = function ({ accessToken, productId }) {
  if (stringIsNotEmpty(productId)) {
    return getAxios({ accessToken }).get(
      '/product/'.concat(productId).concat('/photos')
    );
  } else {
    return Promise.reject('ID sản phẩm không tồn tại');
  }
};

export const deleteProduct = function ({ accessToken, productId }) {
  if (stringIsNotEmpty(productId)) {
    return getAxios({ accessToken }).delete('/product/'.concat(productId));
  } else {
    return Promise.reject('ID sản phẩm không tồn tại');
  }
};

export const getProductPhotoSignedUrl = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/photos/product/upload/url', {
    params: {
      ...reqData,
    },
  });
};
