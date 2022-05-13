import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import { useDispatch } from 'react-redux';
import { PurchaseOrderStatusList } from '../../purchase-order.enum';
import moment from 'moment';
import { makeFullName } from '@/utils/commons/makeFullName.utils';

const Item = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  itemInfo,
  index,
  isLast,
  ...props
}) {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div
        className={'flex'
          .concat(' border-b border-gray-200')
          // .concat(!isLast ? ' border-b border-gray-200' : '')
          .concat(' hover:bg-zinc-50')}
      >
        <div
          className='flex w-full cursor-pointer'
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            // redirectTo(`/products/${productStockInfo?.id}`, true);
          }}
        >
          <div
            className={'flex w-16 flex-none'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')}
          >
            <p className='text-base text-dark'>{index + 1}</p>
          </div>
          <div
            className={'flex w-full'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')}
          >
            {stringIsNotEmpty(itemInfo?.userFirstName) &&
            stringIsNotEmpty(itemInfo?.userLastName) ? (
              <p className='text-base text-dark text-center'>
                {`${makeFullName({
                  firstName: itemInfo?.userFirstName,
                  lastName: itemInfo?.userLastName,
                })}`}
              </p>
            ) : (
              <p className='text-base text-dark text-center italic'>{`N/A`}</p>
            )}
          </div>
          <div
            className={'flex w-full'
              .concat(' items-center justify-center')
              .concat(' px-2 py-1.5')}
          >
            {stringIsNotEmpty(itemInfo?.status) ? (
              <p
                className={'text-sm font-semibold'.concat(
                  itemInfo?.status === PurchaseOrderStatusList[6].key
                    ? ' text-orange-400'
                    : itemInfo?.status === PurchaseOrderStatusList[2].key
                    ? ' text-sky-600'
                    : itemInfo?.status === PurchaseOrderStatusList[3].key
                    ? ' text-blue-600'
                    : // : itemInfo?.status ===
                    //   PurchaseOrderStatusList[4].key
                    // ? ' text-amber-600'
                    itemInfo?.status === PurchaseOrderStatusList[4].key
                    ? ' text-green-500'
                    : itemInfo?.status === PurchaseOrderStatusList[5].key
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
                        itemInfo?.status === PurchaseOrderStatusList[key].key
                      ) {
                        return key;
                      }
                    })}`
                  ]?.name
                }`.toUpperCase()}
              </p>
            ) : (
              <p className='text-base text-dark text-center italic'>{`N/A`}</p>
            )}
          </div>
          <div
            className={'flex w-60 flex-none'
              .concat(' items-center justify-center')
              .concat(' px-2 py-1.5')}
          >
            {stringIsNotEmpty(itemInfo?.addedDate) ? (
              <p className='text-base text-dark text-center'>
                {`${moment(itemInfo?.addedDate).format('DD/MM/YYYY HH:mm:ss')}`}
              </p>
            ) : (
              <p className='text-base text-dark text-center italic'>{`N/A`}</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Item;
