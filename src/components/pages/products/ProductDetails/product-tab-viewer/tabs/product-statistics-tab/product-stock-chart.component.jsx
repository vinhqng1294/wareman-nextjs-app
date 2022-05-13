import {
  getProductExportData,
  getProductImportData,
  getProductStockData,
} from '@/apis/report.api';
import LineChart from '@/components/ui/chart/line-chart.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import { useEffect } from 'react';

const ProductStockChart = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  productInfo,
  reportDate,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  const [submitData, setSubmitData] = useState({
    productId: '',
    startDate: '',
    endDate: '',
  });

  const [statisticData, setStatisticData] = useState({});

  useEffect(
    function () {
      if (objectIsNotEmpty(productInfo) && objectIsNotEmpty(reportDate)) {
        setSubmitData({
          ...submitData,
          productId: productInfo?.id,
          startDate: reportDate?.startDate,
          endDate: reportDate?.endDate,
        });
      }
    },
    [productInfo, reportDate]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(submitData?.productId)) {
        setLoading(true);
        getProductStockData({
          accessToken: accessToken,
          reqData: {
            ...submitData,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getProductStockData resData', resData);
            setStatisticData({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setLoading(false);
          });
      }
    },
    [submitData]
  );

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
          <LineChart
            chartTitle={`Số lượng sản phẩm tồn kho từ ngày ${reportDate?.startDate} đến ngày ${reportDate?.endDate}`}
            chartDatasets={statisticData?.datasets}
            chartLabels={statisticData?.labels}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductStockChart;
