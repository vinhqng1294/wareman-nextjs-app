import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import TabEmptyInfo from '../../tab-empty-info.component';
import DateSelector from './date-selector.component';
import ProductExportChart from './product-export-chart.component';
import ProductImportChart from './product-import-chart.component';
import ProductStockChart from './product-stock-chart.component';

const ProductStatisticsTab = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  productInfo,
  ...props
}) {
  const [loading, setLoading] = useState(false);

  const [reportDate, setReportDate] = useState({});
  const updateReportDate = function ({ startDate, endDate }) {
    setReportDate({ startDate, endDate });
  };

  console.info('reportDate', reportDate);

  return (
    <React.Fragment>
      {loading ? (
        <React.Fragment>
          <div className='flex flex-col items-center py-10 px-3 mx-auto'>
            <DotLoader loading={loading} />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='flex flex-col py-3 px-6'>
            <div
              className={'flex flex-col'
                .concat(' items-center mx-auto')
                .concat(' w-full max-w-2xl')}
            >
              <DateSelector
                defaultValue={reportDate}
                updateReportDate={updateReportDate}
              />
            </div>
            {objectIsNotEmpty(reportDate) ? (
              <React.Fragment>
                <div className={'flex flex-col space-y-6 py-8'}>
                  <ProductImportChart
                    productInfo={productInfo}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    accessToken={accessToken}
                    reportDate={reportDate}
                  />
                  <ProductExportChart
                    productInfo={productInfo}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    accessToken={accessToken}
                    reportDate={reportDate}
                  />
                  <ProductStockChart
                    productInfo={productInfo}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    accessToken={accessToken}
                    reportDate={reportDate}
                  />
                </div>
              </React.Fragment>
            ) : (
              <TabEmptyInfo msg='Không có dữ liệu' />
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductStatisticsTab;
