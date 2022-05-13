import { objectIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import { BuyingRequestStatusList } from '../buying-request.enum';
import { updateBuyingRequestStatus } from '@/apis/buying-request.api';
import { toInteger } from 'lodash';

const StatusActionPopup = function ({
  buyingRequestInfo,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  const [buyingRequestStatusData, setBuyingRequestStatusData] = useState({});

  const handleUpdateStatus = function ({ statusKey }) {
    setLoading(true);
    updateBuyingRequestStatus({
      accessToken: accessToken,
      buyingRequestId: buyingRequestInfo?.id,
      statusKey: statusKey,
    })
      .then(function ({ data: resData }) {
        console.info('updateBuyingRequestStatus resData', resData);
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

  const handleDelete = function ({}) {
    console.info('Deleting ...');
  };

  useEffect(
    function () {
      if (objectIsNotEmpty(buyingRequestInfo)) {
        const foundStatusKey = Object.keys(BuyingRequestStatusList).find(
          function (key, index) {
            if (
              buyingRequestInfo?.status === BuyingRequestStatusList[key].key
            ) {
              return key;
            }
          }
        );
        if (foundStatusKey !== -1) {
          setBuyingRequestStatusData({
            key: foundStatusKey,
            details: BuyingRequestStatusList[foundStatusKey],
          });
        }
      }
    },
    [buyingRequestInfo]
  );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full max-w-4xl')
          .concat(
            buyingRequestInfo?.status === BuyingRequestStatusList[3].key
              ? ' bg-lime-100'
              : ' bg-yellow-100'
          )
          .concat(' rounded-md shadow-md')}
      >
        <div className='flex w-full px-5 py-4 items-center'>
          <div className='flex items-center mr-6'>
            <p className='text-dark text-base font-medium'>
              {`${buyingRequestStatusData?.details?.statusAction?.msg}`}
            </p>
          </div>
          <div className='flex flex-none ml-auto mt-auto'>
            <div className='flex items-center justify-end space-x-2.5'>
              <button
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(
                    buyingRequestInfo?.status === BuyingRequestStatusList[3].key
                      ? ' bg-green-500'
                      : ' bg-blue-500'
                  )
                  .concat(' px-4 py-1.5')
                  .concat(' hover:shadow-md')
                  .concat(' border border-transparent')}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  if (
                    buyingRequestInfo?.status === BuyingRequestStatusList[6].key
                  ) {
                    handleUpdateStatus({
                      statusKey: BuyingRequestStatusList[2].key,
                    });
                  } else {
                    handleUpdateStatus({
                      statusKey:
                        BuyingRequestStatusList[
                          toInteger(buyingRequestStatusData?.key) + 1
                        ]?.key,
                    });
                  }
                }}
              >
                <p className='text-white font-semibold text-sm'>
                  {`${buyingRequestStatusData?.details?.statusAction?.acceptBtnName}`}
                </p>
              </button>
              {buyingRequestInfo?.status === BuyingRequestStatusList[2].key && (
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
                        statusKey: BuyingRequestStatusList[6].key,
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
                    buyingRequestInfo?.status !== BuyingRequestStatusList[0].key
                  ) {
                    handleUpdateStatus({
                      statusKey: BuyingRequestStatusList[5].key,
                    });
                  } else {
                    // handleDelete({});
                    handleUpdateStatus({
                      statusKey: BuyingRequestStatusList[5].key,
                    });
                  }
                }}
              >
                <p className='text-white font-semibold text-sm'>
                  {buyingRequestInfo?.status !== BuyingRequestStatusList[0].key
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
