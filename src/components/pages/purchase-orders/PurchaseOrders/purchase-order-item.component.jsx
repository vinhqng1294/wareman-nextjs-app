import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import moment from 'moment';
import { makeFullName } from '@/utils/commons/makeFullName.utils';
import { PurchaseOrderStatusList } from '../purchase-order.enum';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';

const PurchaseOrderItem = function ({
  purchaseOrderItemData,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(false);

  // const [creatorData, setCreatorData] = useState({});

  // useEffect(
  //   function () {
  //     if (objectIsNotEmpty(purchaseOrderItemData)) {
  //       setComponentLoading(true);
  //       getUserProfileById({
  //         accessToken,
  //         userId: purchaseOrderItemData?.userId,
  //       })
  //         .then(function ({ data: resData }) {
  //           console.info('getUserProfileById resData', resData);
  //           setCreatorData({ ...resData?.data });
  //         })
  //         .catch(function (err) {
  //           console.error('err', err);
  //           console.error('err', err.response);
  //           setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
  //           setViewErrorPopup(!viewErrorPopup);
  //         })
  //         .finally(function () {
  //           setComponentLoading(false);
  //         });
  //     }
  //   },
  //   [purchaseOrderItemData]
  // );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full')
          .concat(' bg-white')
          .concat(' rounded-md shadow-md')
          .concat(' relative')}
      >
        {/* {purchaseOrderItemData?.status === PurchaseOrderStatusList[0].key && (
          <React.Fragment>
            <div className={'flex absolute bottom-2 left-4 flex-none'}>
              <button
                title='Xóa'
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(' bg-white')
                  .concat(' w-7 h-7')
                  .concat(' hover:shadow-md hover:border border-zinc-50')}
              >
                <ReactSVG
                  src={SvgIcon.trash}
                  className={'fill-red-500 w-5 h-5'}
                />
              </button>
            </div>
          </React.Fragment>
        )} */}
        <div className='flex items-center w-full px-5 py-2'>
          <TextEllipsis
            content={
              stringIsNotEmpty(purchaseOrderItemData?.id)
                ? `Mã đơn đặt hàng: ${trimUUID(
                    purchaseOrderItemData?.id
                  ).toUpperCase()}`
                : `<Mã yêu cầu mua hàng>`
            }
            textFormat={`whitespace-pre-wrap`
              .concat(` text-sm text-zinc-500`)
              .concat('')}
            customTextStyles={{
              WebkitLineClamp: 1,
              display: `-webkit-box`,
              WebkitBoxOrient: `vertical`,
            }}
          />
        </div>
        <div className='w-full border-b border-gray-200'></div>
        <div
          className={'flex items-center'
            .concat(' px-5 pt-3 pb-3.5')
            .concat(' space-x-3')}
        >
          <div className='flex flex-col w-full'>
            {/* <div className='flex'>
              <TextEllipsis
                content={
                  stringIsNotEmpty(saleRequestItemData?.id)
                    ? `#${trimUUID(saleRequestItemData?.id).toUpperCase()}`
                    : `<Mã phân khu>`
                }
                textFormat={`whitespace-pre-wrap`
                  .concat(` text-sm text-zinc-500`)
                  .concat('')}
                customTextStyles={{
                  WebkitLineClamp: 1,
                  display: `-webkit-box`,
                  WebkitBoxOrient: `vertical`,
                }}
              />
            </div> */}
            <div className='flex' title={purchaseOrderItemData?.name}>
              <TextEllipsis
                content={
                  stringIsNotEmpty(purchaseOrderItemData?.name)
                    ? purchaseOrderItemData?.name
                    : `<Tên yêu cầu mua hàng>`
                }
                textFormat={`whitespace-pre-wrap`
                  .concat(` text-base text-dark`)
                  .concat(' font-semibold')}
                customTextStyles={{
                  WebkitLineClamp: 1,
                  display: `-webkit-box`,
                  WebkitBoxOrient: `vertical`,
                }}
              />
            </div>
            <div className='flex mt-0.5 items-center space-x-2'>
              <p className={`text-base text-zinc-500 flex-none`}>Người tạo:</p>
              <p className={`text-base text-blue-500 font-medium`}>
                {makeFullName({
                  firstName: purchaseOrderItemData?.userFirstName,
                  lastName: purchaseOrderItemData?.userLastName,
                })}
              </p>
            </div>
            <div className='flex mt-0.5 items-center space-x-2'>
              <p className={`text-base text-zinc-500 flex-none`}>Ngày tạo:</p>
              <p className={`text-base text-blue-500 font-medium`}>
                {moment(purchaseOrderItemData?.addedDate).format(
                  'DD/MM/YYYY HH:mm:ss'
                )}
              </p>
            </div>
            {/* <div className='flex mt-0.5 items-center space-x-2'>
              <p className={`text-base text-zinc-500 flex-none`}>Lần chỉnh cuối:</p>
              <p className={`text-base text-blue-500 font-medium`}>
                {saleRequestItemData?.lastModified}
              </p>
            </div> */}
          </div>
          <div className='flex flex-col flex-none h-full'>
            <div className='flex items-center justify-end'>
              <p
                className={'text-sm font-semibold'.concat(
                  purchaseOrderItemData?.status ===
                    PurchaseOrderStatusList[6].key
                    ? ' text-orange-400'
                    : purchaseOrderItemData?.status ===
                      PurchaseOrderStatusList[2].key
                    ? ' text-sky-600'
                    : purchaseOrderItemData?.status ===
                      PurchaseOrderStatusList[3].key
                    ? ' text-blue-600'
                    : // : purchaseOrderItemData?.status ===
                    //   PurchaseOrderStatusList[4].key
                    // ? ' text-amber-600'
                    purchaseOrderItemData?.status ===
                      PurchaseOrderStatusList[4].key
                    ? ' text-green-500'
                    : purchaseOrderItemData?.status ===
                      PurchaseOrderStatusList[5].key
                    ? ' text-red-600'
                    : ' text-zinc-500'
                )}
              >
                {`${
                  PurchaseOrderStatusList[
                    `${Object.keys(PurchaseOrderStatusList).find(function (
                      key,
                      index
                    ) {
                      if (
                        purchaseOrderItemData?.status ===
                        PurchaseOrderStatusList[key].key
                      ) {
                        return key;
                      }
                    })}`
                  ]?.name
                }`.toUpperCase()}
              </p>
            </div>
            <div className='flex items-center justify-end mt-auto flex-none'>
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
                  redirectTo(`/purchase-orders/${purchaseOrderItemData?.id}`);
                }}
              >
                {/* <ReactSVG
                  src={SvgIcon.trash}
                  className={'fill-red-500 w-5 h-5'}
                /> */}
                <p className='text-dark font-semibold text-sm'>Xem chi tiết</p>
              </button>
            </div>
          </div>
        </div>
        {/* <div className='w-full border-b border-gray-200'></div> */}
        <div className='flex justify-end items-center w-full px-5 pb-2'>
          <div className='flex items-center space-x-1'>
            <p className={`text-sm text-zinc-500`}>Cập nhật lúc:</p>
            <p className={`text-sm text-zinc-500 font-medium`}>
              {moment(purchaseOrderItemData?.updatedDate).format(
                'DD/MM/YYYY HH:mm:ss'
              )}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PurchaseOrderItem;
