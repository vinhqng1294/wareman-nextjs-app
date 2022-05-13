import { objectIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import { SaleOrderStatusList } from '../../sale-order.enum';
import { toInteger } from 'lodash';
import { updateSaleOrderStatus } from '@/apis/sale-order.api';

const StatusActionPopup = function ({
  saleOrderInfo,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  const [saleOrderStatusData, setSaleOrderStatusData] = useState({});
  const handleUpdateStatus = function ({ statusKey }) {
    setLoading(true);
    updateSaleOrderStatus({
      accessToken: accessToken,
      saleOrderId: saleOrderInfo?.id,
      statusKey: statusKey,
    })
      .then(function ({ data: resData }) {
        console.info('updateSaleOrderStatus resData', resData);
        window?.location?.reload();
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
  };

  const [isPrimaryBtnDisabled, setIsPrimaryBtnDisabled] = useState(false);

  const handleDelete = function ({}) {
    console.info('Deleting ...');
  };

  useEffect(
    function () {
      if (objectIsNotEmpty(saleOrderInfo)) {
        const foundStatusKey = Object.keys(SaleOrderStatusList).find(function (
          key,
          index
        ) {
          if (saleOrderInfo?.status === SaleOrderStatusList[key].key) {
            return key;
          }
        });
        if (foundStatusKey !== -1) {
          setSaleOrderStatusData({
            key: foundStatusKey,
            details: SaleOrderStatusList[foundStatusKey],
          });
        }
        if (
          saleOrderInfo?.status === SaleOrderStatusList[3].key &&
          saleOrderInfo?.soFullyExported === false
        ) {
          setIsPrimaryBtnDisabled(true);
        } else {
          setIsPrimaryBtnDisabled(false);
        }
      }
    },
    [saleOrderInfo]
  );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full max-w-4xl')
          .concat(
            saleOrderInfo?.status === SaleOrderStatusList[3].key
              ? ' bg-lime-100'
              : ' bg-yellow-100'
          )
          .concat(' rounded-md shadow-md')}
      >
        <div className='flex w-full px-5 py-4 items-center'>
          <div className='flex items-center mr-6'>
            <p className='text-dark text-base font-medium'>
              {`${saleOrderStatusData?.details?.statusAction?.msg}`}
            </p>
          </div>
          <div className='flex flex-none ml-auto mt-auto'>
            <div className='flex items-center justify-end space-x-2.5'>
              <button
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(
                    saleOrderInfo?.status === SaleOrderStatusList[3].key
                      ? ' bg-green-500'
                      : ' bg-blue-500'
                  )
                  .concat(' px-4 py-1.5')
                  .concat(' hover:shadow-md')
                  .concat(' border border-transparent')
                  .concat(
                    isPrimaryBtnDisabled
                      ? ' cursor-not-allowed opacity-50'
                      : ' cursor-pointer'
                  )}
                disabled={isPrimaryBtnDisabled}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  if (saleOrderInfo?.status === SaleOrderStatusList[6].key) {
                    handleUpdateStatus({
                      statusKey: SaleOrderStatusList[2].key,
                    });
                  } else {
                    handleUpdateStatus({
                      statusKey:
                        SaleOrderStatusList[
                          toInteger(saleOrderStatusData?.key) + 1
                        ]?.key,
                    });
                  }
                }}
              >
                <p className='text-white font-semibold text-sm'>
                  {`${saleOrderStatusData?.details?.statusAction?.acceptBtnName}`}
                </p>
              </button>
              {saleOrderInfo?.status === SaleOrderStatusList[2].key && (
                <React.Fragment>
                  <button
                    type='button'
                    className={
                      'flex items-center justify-center'
                        .concat(' rounded-full')
                        .concat(' bg-white')
                        .concat(' border border-zinc-200')
                        .concat(' px-4 py-1.5')
                        .concat(' hover:shadow-md')
                      // .concat(' xxs:w-full md:w-1/3')
                    }
                    onClick={function (evt) {
                      evt?.preventDefault();
                      evt?.stopPropagation();
                      handleUpdateStatus({
                        statusKey: SaleOrderStatusList[6].key,
                      });
                    }}
                  >
                    <p className='text-dark font-semibold text-sm'>Tạm hoãn</p>
                  </button>
                </React.Fragment>
              )}
              <button
                type='button'
                className={
                  'flex items-center justify-center'
                    .concat(' rounded-full')
                    .concat(' bg-red-500')
                    .concat(' border border-transparent')
                    .concat(' px-4 py-1.5')
                    .concat(' hover:shadow-md')
                  // .concat(' xxs:w-full md:w-1/3')
                }
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  if (saleOrderInfo?.status !== SaleOrderStatusList[0].key) {
                    handleUpdateStatus({
                      statusKey: SaleOrderStatusList[5].key,
                    });
                  } else {
                    // handleDelete({});
                    handleUpdateStatus({
                      statusKey: SaleOrderStatusList[5].key,
                    });
                  }
                }}
              >
                <p className='text-white font-semibold text-sm'>
                  {saleOrderInfo?.status !== SaleOrderStatusList[0].key
                    ? `Huỷ`
                    : `Xóa`}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StatusActionPopup;
