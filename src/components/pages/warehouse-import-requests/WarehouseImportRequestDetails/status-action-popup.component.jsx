import { objectIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import { ImportRequestStatusList } from '../import-request.enum';
import { toInteger } from 'lodash';
import { updateWarehouseImportRequestStatus } from '@/apis/warehouse-import-request.api';

const StatusActionPopup = function ({
  requestInfo,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  const [requestStatusData, setRequestStatusData] = useState({});
  const handleUpdateStatus = function ({ statusKey }) {
    setLoading(true);
    updateWarehouseImportRequestStatus({
      accessToken: accessToken,
      requestId: requestInfo?.id,
      statusKey: statusKey,
    })
      .then(function ({ data: resData }) {
        console.info('updateWarehouseImportRequestStatus resData', resData);
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
      if (objectIsNotEmpty(requestInfo)) {
        const foundStatusKey = Object.keys(ImportRequestStatusList).find(
          function (key, index) {
            if (requestInfo?.status === ImportRequestStatusList[key].key) {
              return key;
            }
          }
        );
        if (foundStatusKey !== -1) {
          setRequestStatusData({
            key: foundStatusKey,
            details: ImportRequestStatusList[foundStatusKey],
          });
        }
      }
    },
    [requestInfo]
  );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full max-w-4xl')
          .concat(
            requestInfo?.status === ImportRequestStatusList[3].key
              ? ' bg-lime-100'
              : ' bg-yellow-100'
          )
          .concat(' rounded-md shadow-md')}
      >
        <div className='flex w-full px-5 py-4 items-center'>
          <div className='flex items-center mr-6'>
            <p className='text-dark text-base font-medium'>
              {`${requestStatusData?.details?.statusAction?.msg}`}
            </p>
          </div>
          <div className='flex flex-none ml-auto mt-auto'>
            <div className='flex items-center justify-end space-x-2.5'>
              <button
                type='button'
                className={
                  'flex items-center justify-center'
                    .concat(' rounded-full')
                    .concat(
                      requestInfo?.status === ImportRequestStatusList[3].key
                        ? ' bg-green-500'
                        : ' bg-blue-500'
                    )
                    .concat(' px-4 py-1.5')
                    .concat(' hover:shadow-md')
                    .concat(' border border-transparent')
                  // .concat(
                  //   isPrimaryBtnDisabled
                  //     ? ' cursor-not-allowed opacity-50'
                  //     : ' cursor-pointer'
                  // )
                }
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  if (requestInfo?.status === ImportRequestStatusList[6].key) {
                    handleUpdateStatus({
                      statusKey: ImportRequestStatusList[2].key,
                    });
                  } else {
                    handleUpdateStatus({
                      statusKey:
                        ImportRequestStatusList[
                          toInteger(requestStatusData?.key) + 1
                        ]?.key,
                    });
                  }
                }}
              >
                <p className='text-white font-semibold text-sm'>
                  {`${requestStatusData?.details?.statusAction?.acceptBtnName}`}
                </p>
              </button>
              {/* {requestInfo?.status === ImportRequestStatusList[2].key && (
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
                        statusKey: ImportRequestStatusList[6].key,
                      });
                    }}
                  >
                    <p className='text-dark font-semibold text-sm'>Tạm hoãn</p>
                  </button>
                </React.Fragment>
              )} */}
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
                  if (requestInfo?.status !== ImportRequestStatusList[0].key) {
                    handleUpdateStatus({
                      statusKey: ImportRequestStatusList[5].key,
                    });
                  } else {
                    // handleDelete({});
                    handleUpdateStatus({
                      statusKey: ImportRequestStatusList[5].key,
                    });
                  }
                }}
              >
                <p className='text-white font-semibold text-sm'>
                  {requestInfo?.status !== ImportRequestStatusList[0].key
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
