import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import moment from 'moment';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { useDispatch } from 'react-redux';
import { Action_ProductStock } from '@/redux/product-stock/product-stock.action';
import { isNumber } from 'lodash';

const ProductStockItem = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  productStockInfo,
  index,
  isLast,
  rackInfo,
  ...props
}) {
  const dispatch = useDispatch();

  const [isExpand, setIsExpand] = useState(false);
  const expandBtnOnClick = function () {
    setIsExpand(!isExpand);
  };

  const handleMovingProduct = function () {
    dispatch(
      Action_ProductStock.SetUpdateProductStockData({
        productStockId: stringIsNotEmpty(productStockInfo?.id)
          ? productStockInfo?.id
          : '',
      })
    );
    redirectTo(`/update/product-stock`);
  };

  return (
    <React.Fragment>
      <div
        className={'flex'
          .concat(!isLast ? ' border-b border-gray-200' : '')
          .concat(' hover:bg-amber-50')}
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
            className={'flex w-40 flex-none'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')}
          >
            <p className='text-base text-zinc-500'>
              {`${
                stringIsNotEmpty(productStockInfo?.importId)
                  ? `${trimUUID(productStockInfo?.importId)}`.toUpperCase()
                  : 'N/A'
              }`}
            </p>
          </div>
          {/* <div
            className={'flex w-14 flex-none'
              .concat(' items-center justify-start')
              .concat(' py-1.5')}
          >
            <div
              className={'flex flex-col'
                .concat(' xxs:w-12 xxs:h-12')
                .concat(' md:w-12 md:h-12')
                .concat(' relative overflow-hidden')
                .concat(' rounded-md')
                .concat(` border border-zinc-200`)
                .concat(' bg-zinc-100')}
            >
              {stringIsNotEmpty(productStockInfo?.logoId) ? (
                <React.Fragment>
                  <Image
                    // loader={function ({ src }) {
                    //   return src;
                    // }}
                    src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/photos/product/download/url?id=${productStockInfo?.logoId}`}
                    alt={` `}
                    layout='fill'
                    objectFit='contain'
                    unoptimized
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <ReactSVG
                    src={SvgIcon['cube-sr']}
                    className={'fill-zinc-500'
                      .concat(' w-full h-full')
                      .concat(' p-2')}
                  />
                </React.Fragment>
              )}
            </div>
          </div> */}
          {/* <div
            className={'flex w-full'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')}
          >
            <p className='text-base text-dark'>
              {`${
                stringIsNotEmpty(productStockInfo?.name)
                  ? `${productStockInfo?.name}`
                  : 'N/A'
              }`}
            </p>
          </div> */}
          <div
            className={'flex w-full'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')}
          >
            {stringIsNotEmpty(productStockInfo?.lotName) ? (
              <p className='text-base text-dark text-center'>
                {productStockInfo?.lotName}
              </p>
            ) : (
              <p className='text-base text-dark text-center italic'>
                {`Chưa sắp xếp`}
              </p>
            )}
          </div>
          <div
            className={'flex w-full'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')}
          >
            {stringIsNotEmpty(productStockInfo?.rackName) ? (
              <p className='text-base text-dark text-center'>
                {productStockInfo?.rackName}
              </p>
            ) : (
              <p className='text-base text-dark text-center italic'>
                {`Chưa sắp xếp`}
              </p>
            )}
          </div>
          <div
            className={'flex w-32 flex-none'
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
          <div
            className={'flex w-40 flex-none'
              .concat(' items-start justify-center')
              .concat(' px-2 py-1.5')}
          >
            <p className='text-base text-dark text-center'>
              {`${
                stringIsNotEmpty(productStockInfo?.addedDate)
                  ? moment(productStockInfo?.addedDate).format(
                      'DD/MM/YYYY HH:mm:ss'
                    )
                  : 'N/A'
              }`}
            </p>
          </div>
          {/* <div
            className={'flex w-40 flex-none'
              .concat(' items-start justify-center')
              .concat(' px-2 py-1.5')}
          >
            <p className='text-base text-dark text-center'>{`${
              stringIsNotEmpty(productStockInfo?.updatedDate)
                ? moment(productStockInfo?.updatedDate).format(
                    'DD/MM/YYYY HH:mm:ss'
                  )
                : 'N/A'
            }`}</p>
          </div> */}
        </div>

        <div
          className={'flex w-16 flex-none'
            .concat(' items-center justify-end')
            .concat(' px-2 py-1.5')
            .concat(' space-x-3')}
        >
          {rackInfo?.currentUserAllowUpdateProductsLocation && (
            <React.Fragment>
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
            </React.Fragment>
          )}
          {/* <button
            title='Xoá'
            type='button'
            className={'flex items-center justify-center'
              .concat(' rounded-lg')
              .concat(' hover:bg-white')
              .concat(' w-6 h-6')
              .concat(' hover:shadow-md hover:border border-zinc-50')}
          >
            <ReactSVG src={SvgIcon.trash} className={'fill-red-500 w-4 h-4'} />
          </button> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductStockItem;
