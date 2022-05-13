import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

export const getProductStockInfoById = function ({
  accessToken,
  productStockId,
}) {
  if (stringIsNotEmpty(productStockId)) {
    return getAxios({ accessToken }).get(
      '/product-stock/'.concat(productStockId)
    );
  } else {
    return Promise.reject('ID kho sản phẩm không tồn tại');
  }
};

export const getProductStockByProductId = function ({
  accessToken,
  productId,
  reqData,
}) {
  if (stringIsNotEmpty(productId)) {
    return getAxios({ accessToken }).get(
      '/product/'.concat(productId).concat('/stocks'),
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('ID sản phẩm không tồn tại');
  }
};

export const moveProductStock = function ({
  accessToken,
  productStockId,
  rackId,
  reqData,
}) {
  if (stringIsNotEmpty(productStockId) && stringIsNotEmpty(rackId)) {
    return getAxios({ accessToken }).patch(
      '/product-stock/'.concat(productStockId).concat('/rack/').concat(rackId),
      {
        ...reqData,
      }
    );
  } else {
    return Promise.reject('ID kho sản phẩm hoặc ID kệ không tồn tại');
  }
};

export const getProductStockImportByImportId = function ({
  accessToken,
  importId,
  reqData,
}) {
  if (stringIsNotEmpty(importId)) {
    return getAxios({ accessToken }).get(
      '/import/'.concat(importId).concat('/product-stocks'),
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('ID yêu cầu nhập kho không tồn tại');
  }
};
