import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { isNumber } from 'lodash';
import AddProductStockExportForm from './add-product-stock-export-form.component';

const ProductStockItem = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  productStockInfo,
  index,
  isLast,
  requestInfo,
  handleExpandRequestProductItem,
  ...props
}) {
  const dispatch = useDispatch();

  const [viewForm, setViewForm] = useState(false);
  const handleAddToCart = function () {
    setViewForm(!viewForm);
  };

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(!isLast ? ' border-b border-gray-200' : '')
          .concat(' hover:bg-amber-50')
          .concat(viewForm ? ' bg-amber-50' : '')}
      >
        <div className='flex'>
          <div
            className='flex w-full cursor-pointer'
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              // redirectTo(`/products/${productStockInfo?.id}`, true);
            }}
          >
            <div
              className={'flex w-12 flex-none'
                .concat(' items-center justify-start')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-sm text-dark'>{index + 1}</p>
            </div>
            <div
              className={'flex w-24 flex-none'
                .concat(' items-center justify-start')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-sm text-zinc-500'>
                {`${
                  stringIsNotEmpty(productStockInfo?.importId)
                    ? `${trimUUID(productStockInfo?.importId)}`.toUpperCase()
                    : 'N/A'
                }`}
              </p>
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-start')
                .concat(' px-2 py-1.5')}
            >
              {stringIsNotEmpty(productStockInfo?.lotName) ? (
                <p className='text-sm text-dark text-center'>
                  {productStockInfo?.lotName}
                </p>
              ) : (
                <p className='text-sm text-dark text-center italic'>
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
                <p className='text-sm text-dark text-center'>
                  {productStockInfo?.rackName}
                </p>
              ) : (
                <p className='text-sm text-dark text-center italic'>
                  {`Chưa sắp xếp`}
                </p>
              )}
            </div>
            <div
              className={'flex w-20 flex-none'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-sm text-blue-500 text-center font-medium'>
                {`${
                  stringIsNotEmpty(productStockInfo?.quantity) ||
                  isNumber(productStockInfo?.quantity)
                    ? productStockInfo?.quantity
                    : 'N/A'
                }`}
              </p>
            </div>
            <div
              className={'flex w-20 flex-none'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-sm text-dark text-center'>
                {`${
                  stringIsNotEmpty(productStockInfo?.productUomName)
                    ? productStockInfo?.productUomName
                    : 'N/A'
                }`}
              </p>
            </div>
            <div
              className={'flex w-20 flex-none'
                .concat(' items-start justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-sm text-dark text-center'>
                {`${
                  stringIsNotEmpty(productStockInfo?.addedDate)
                    ? moment(productStockInfo?.addedDate).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )
                    : 'N/A'
                }`}
              </p>
            </div>
          </div>
          <React.Fragment>
            <div
              className={'flex w-16 flex-none'
                .concat(' items-center justify-end')
                .concat(' px-2 py-1.5')
                .concat(' space-x-3')}
            >
              {requestInfo?.currentUserAllowUpdateProductStockExport ===
                true && (
                <button
                  title='Thêm vào giỏ'
                  type='button'
                  className={'flex items-center justify-center'
                    .concat(' rounded-lg')
                    .concat(' hover:bg-white')
                    .concat(' w-6 h-6')
                    .concat(' hover:shadow-md hover:border border-zinc-50')}
                  onClick={function (evt) {
                    evt?.stopPropagation();
                    evt?.preventDefault();
                    handleAddToCart();
                  }}
                >
                  <ReactSVG
                    src={
                      !viewForm
                        ? SvgIcon['shopping-bag-add']
                        : SvgIcon['cross-circle']
                    }
                    className={'w-4 h-4'.concat(
                      !viewForm ? ' fill-blue-500' : ' fill-red-500'
                    )}
                  />
                </button>
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
          </React.Fragment>
        </div>

        {viewForm && (
          <React.Fragment>
            <div className='flex flex-col'>
              <AddProductStockExportForm
                setErrorMsg={setErrorMsg}
                setViewErrorPopup={setViewErrorPopup}
                viewErrorPopup={viewErrorPopup}
                accessToken={accessToken}
                productStockInfo={productStockInfo}
                requestInfo={requestInfo}
                handleExpandRequestProductItem={handleExpandRequestProductItem}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductStockItem;
