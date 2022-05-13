import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import { useDispatch } from 'react-redux';
import { isNumber } from 'lodash';

const ProductStockItem = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  productStockInfo,
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
            className={'flex w-44 flex-none'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')}
          >
            <p className='text-base text-zinc-500'>
              {`${
                stringIsNotEmpty(productStockInfo?.exportId)
                  ? `${trimUUID(productStockInfo?.exportId)}`.toUpperCase()
                  : 'N/A'
              }`}
            </p>
          </div>
          <div
            className={'flex w-full'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')}
          >
            {stringIsNotEmpty(productStockInfo?.productName) ? (
              <p className='text-base text-dark text-center'>
                {productStockInfo?.productName}
              </p>
            ) : (
              <p className='text-base text-dark text-center italic'>{`N/A`}</p>
            )}
          </div>
          <div
            className={'flex w-full'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')}
          >
            {stringIsNotEmpty(productStockInfo?.originalLotName) ? (
              <p className='text-base text-dark'>
                {productStockInfo?.originalLotName}
              </p>
            ) : (
              <p className='text-base text-dark italic'>{`Chưa sắp xếp`}</p>
            )}
          </div>
          <div
            className={'flex w-full'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')}
          >
            {stringIsNotEmpty(productStockInfo?.originalRackName) ? (
              <p className='text-base text-dark'>
                {productStockInfo?.originalRackName}
              </p>
            ) : (
              <p className='text-base text-dark italic'>{`Chưa sắp xếp`}</p>
            )}
          </div>
          <div
            className={'flex w-36 flex-none'
              .concat(' items-center justify-center')
              .concat(' px-2 py-1.5')}
          >
            <p className='text-base text-blue-500 text-center font-medium'>
              {`${
                stringIsNotEmpty(productStockInfo?.quantity) ||
                isNumber(productStockInfo?.quantity)
                  ? productStockInfo?.quantity
                  : 'N/A'
              }`}
            </p>
          </div>
          <div
            className={'flex w-24 flex-none'
              .concat(' items-center justify-center')
              .concat(' px-2 py-1.5')}
          >
            <p className='text-base text-dark text-center'>
              {`${
                stringIsNotEmpty(productStockInfo?.productUomName)
                  ? productStockInfo?.productUomName
                  : 'N/A'
              }`}
            </p>
          </div>
        </div>

        {/* <div
          className={'flex w-24 flex-none'
            .concat(' items-center justify-end')
            .concat(' px-2 py-1.5')
            .concat(' space-x-3')}
        >
          <button
            title='Di chuyển kệ'
            type='button'
            className={'flex items-center justify-center'
              .concat(' rounded-lg')
              .concat(' hover:bg-white')
              .concat(' w-6 h-6')
              .concat(' hover:shadow-md hover:border border-zinc-50')}
            onClick={function (evt) {
              evt?.stopPropagation();
              evt?.preventDefault();
              handleMovingProduct();
            }}
          >
            <ReactSVG
              src={SvgIcon['paper-plane']}
              className={'fill-blue-500 w-4 h-4'}
            />
          </button>
          <button
            title='Xoá'
            type='button'
            className={'flex items-center justify-center'
              .concat(' rounded-lg')
              .concat(' hover:bg-white')
              .concat(' w-6 h-6')
              .concat(' hover:shadow-md hover:border border-zinc-50')}
          >
            <ReactSVG src={SvgIcon.trash} className={'fill-red-500 w-4 h-4'} />
          </button>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default ProductStockItem;
