import { getAxios } from '@/apis/axios/setupAxios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { isNumber } from 'lodash';

export const getWarehouseImportExportReportData = function ({
  accessToken,
  year,
  month,
  reqData,
}) {
  if (isNumber(year)) {
    return getAxios({ accessToken }).get(
      '/reports/general-io/year/'
        .concat(`${year}`)
        .concat(isNumber(month) ? `/month/`.concat(`${month}`) : ''),
      // .concat('?getDummy=true')
      {
        params: {
          ...reqData,
        },
      }
    );
  } else {
    return Promise.reject('Vui lòng cung cấp tối thiểu 1 năm xác định');
  }
};

export const getProductImportData = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/reports/import/quantity/web', {
    params: {
      ...reqData,
    },
  });
};
export const getProductExportData = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/reports/export/quantity/web', {
    params: {
      ...reqData,
    },
  });
};
export const getProductStockData = function ({ accessToken, reqData }) {
  return getAxios({ accessToken }).get('/reports/product-stock/quantity/web', {
    params: {
      ...reqData,
    },
  });
};
