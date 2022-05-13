import { objectIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import { PurchaseOrderStatusList } from '../../purchase-order.enum';
import { toInteger } from 'lodash';
import { updatePurchaseOrderStatus } from '@/apis/purchase-order.api';

const StatusActionPopup = function ({
  purchaseOrderInfo,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  const [purchaseOrderStatusData, setPurchaseOrderStatusData] = useState({});
  const handleUpdateStatus = function ({ statusKey }) {
    setLoading(true);
    updatePurchaseOrderStatus({
      accessToken: accessToken,
      purchaseOrderId: purchaseOrderInfo?.id,
      statusKey: statusKey,
    })
      .then(function ({ data: resData }) {
        console.info('updatePurchaseOrderStatus resData', resData);
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
      if (objectIsNotEmpty(purchaseOrderInfo)) {
        const foundStatusKey = Object.keys(PurchaseOrderStatusList).find(
          function (key, index) {
            if (
              purchaseOrderInfo?.status === PurchaseOrderStatusList[key].key
            ) {
              return key;
            }
          }
        );
        if (foundStatusKey !== -1) {
          setPurchaseOrderStatusData({
            key: foundStatusKey,
            details: PurchaseOrderStatusList[foundStatusKey],
          });
        }
        if (
          purchaseOrderInfo?.status === PurchaseOrderStatusList[3].key &&
          purchaseOrderInfo?.poFullyImported === false
        ) {
          setIsPrimaryBtnDisabled(true);
        } else {
          setIsPrimaryBtnDisabled(false);
        }
      }
    },
    [purchaseOrderInfo]
  );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full max-w-4xl')
          .concat(
            purchaseOrderInfo?.status === PurchaseOrderStatusList[3].key
              ? ' bg-lime-100'
              : ' bg-yellow-100'
          )
          .concat(' rounded-md shadow-md')}
      >
        <div className='flex w-full px-5 py-4 items-center'>
          <div className='flex items-center mr-6'>
            <p className='text-dark text-base font-medium'>
              {`${purchaseOrderStatusData?.details?.statusAction?.msg}`}
            </p>
          </div>
          <div className='flex flex-none ml-auto mt-auto'>
            <div className='flex items-center justify-end space-x-2.5'>
              <button
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(
                    purchaseOrderInfo?.status === PurchaseOrderStatusList[3].key
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
                  if (
                    purchaseOrderInfo?.status === PurchaseOrderStatusList[6].key
                  ) {
                    handleUpdateStatus({
                      statusKey: PurchaseOrderStatusList[2].key,
                    });
                  } else {
                    handleUpdateStatus({
                      statusKey:
                        PurchaseOrderStatusList[
                          toInteger(purchaseOrderStatusData?.key) + 1
                        ]?.key,
                    });
                  }
                }}
              >
                <p className='text-white font-semibold text-sm'>
                  {`${purchaseOrderStatusData?.details?.statusAction?.acceptBtnName}`}
                </p>
              </button>
              {purchaseOrderInfo?.status === PurchaseOrderStatusList[2].key && (
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
                        statusKey: PurchaseOrderStatusList[6].key,
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
                  if (
                    purchaseOrderInfo?.status !== PurchaseOrderStatusList[0].key
                  ) {
                    handleUpdateStatus({
                      statusKey: PurchaseOrderStatusList[5].key,
                    });
                  } else {
                    // handleDelete({});
                    handleUpdateStatus({
                      statusKey: PurchaseOrderStatusList[5].key,
                    });
                  }
                }}
              >
                <p className='text-white font-semibold text-sm'>
                  {purchaseOrderInfo?.status !== PurchaseOrderStatusList[0].key
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
