import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

// export const getProductStockInfoById = function ({
//   accessToken,
//   productStockId,
// }) {
//   if (stringIsNotEmpty(productStockId)) {
//     return getAxios({ accessToken }).get(
//       '/product-stock/'.concat(productStockId)
//     );
//   } else {
//     return Promise.reject('ID kho sản phẩm không tồn tại');
//   }
// };

export const getProductStockExportByExportId = function ({
  accessToken,
  exportId,
  reqData,
}) {
  if (stringIsNotEmpty(exportId)) {
    return getAxios({ accessToken }).get(
      '/export/'.concat(exportId).concat('/product-stocks'),
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('ID yêu cầu xuất kho không tồn tại');
  }
};

export const addProductStockExport = function ({
  accessToken,
  exportId,
  productStockId,
  reqData,
}) {
  if (stringIsNotEmpty(exportId) && stringIsNotEmpty(productStockId)) {
    return getAxios({ accessToken }).post(
      '/export/'
        .concat(exportId)
        .concat('/product-stock/')
        .concat(productStockId),
      {
        ...reqData,
      }
    );
  } else {
    return Promise.reject(
      'ID yêu cầu xuất kho hoặc ID kho sản phẩm không tồn tại'
    );
  }
};
