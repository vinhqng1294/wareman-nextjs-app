import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import { isNumber } from 'lodash';

const ReportItem = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  index,
  isLast,
  rowData,
  ...props
}) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(!isLast ? ' border-b border-gray-200' : '')
          .concat(' hover:bg-pink-200')}
      >
        <div
          className='flex w-full'
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            // redirectTo(`/products/${rowData?.id}`, true);
          }}
        >
          {/* stt */}
          <div
            className={'flex w-16 flex-none'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')
              .concat(' hover:bg-amber-100')}
          >
            <p className='text-sm text-dark'>{index + 1}</p>
          </div>

          {/* mặt hàng */}
          <div
            className={'flex w-full'
              .concat(' items-center justify-start')
              .concat(' px-2 py-1.5')
              .concat(' border-l border-gray-200')
              .concat(' hover:bg-amber-100')}
          >
            {stringIsNotEmpty(rowData?.productName) ? (
              <React.Fragment>
                <p className='text-sm text-dark'>{rowData?.productName}</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p className='text-sm text-zinc-500 italic'>{`N/A`}</p>
              </React.Fragment>
            )}
          </div>

          {/* đơn giá bình quân */}
          <div
            className={'flex w-36 flex-none'
              .concat(' items-center justify-center')
              .concat(' px-2 py-1.5')
              .concat(' border-l border-gray-200')
              .concat(' hover:bg-amber-100')}
          >
            {isNumber(rowData?.averageOpeningStockPrice) ? (
              <React.Fragment>
                <p className='text-sm text-dark font-medium text-center'>
                  {rowData?.averageOpeningStockPrice}
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p className='text-sm text-zinc-500 italic text-center'>{`N/A`}</p>
              </React.Fragment>
            )}
          </div>

          {/* đơn vị tính */}
          <div
            className={'flex w-24 flex-none'
              .concat(' items-center justify-center')
              .concat(' px-2 py-1.5')
              .concat(' border-l border-gray-200')
              .concat(' hover:bg-amber-100')}
          >
            {stringIsNotEmpty(rowData?.uomName) ? (
              <React.Fragment>
                <p className='text-sm text-zinc-500 text-center italic'>
                  {rowData?.uomName}
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p className='text-sm text-zinc-500 italic text-center'>{`N/A`}</p>
              </React.Fragment>
            )}
          </div>

          {/* tồn đầu kỳ */}
          <div
            className={'flex flex-none'
              .concat(' w-60')
              .concat(' border-l border-gray-200')}
          >
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' hover:bg-amber-100')}
            >
              {isNumber(rowData?.openingStockQuantity) ? (
                <React.Fragment>
                  <p className='text-sm text-dark text-center'>
                    {rowData?.openingStockQuantity}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className='text-sm text-zinc-500 italic text-center'>{`N/A`}</p>
                </React.Fragment>
              )}
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' border-l border-gray-200')
                .concat(' hover:bg-amber-100')}
            >
              {isNumber(rowData?.openingStockTotalPrice) ? (
                <React.Fragment>
                  <p className='text-sm text-blue-600 font-medium text-center'>
                    {rowData?.openingStockTotalPrice}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className='text-sm text-zinc-500 italic text-center'>{`N/A`}</p>
                </React.Fragment>
              )}
            </div>
          </div>

          {/* nhập trong kỳ */}
          <div
            className={'flex flex-none'
              .concat(' w-60')
              .concat(' border-l border-gray-200')}
          >
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' hover:bg-amber-100')}
            >
              {isNumber(rowData?.totalImportQuantity) ? (
                <React.Fragment>
                  <p className='text-sm text-dark text-center'>
                    {rowData?.totalImportQuantity}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className='text-sm text-zinc-500 italic text-center'>{`N/A`}</p>
                </React.Fragment>
              )}
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' border-l border-gray-200')
                .concat(' hover:bg-amber-100')}
            >
              {isNumber(rowData?.totalImportPrice) ? (
                <React.Fragment>
                  <p className='text-sm text-blue-600 font-medium text-center'>
                    {rowData?.totalImportPrice}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className='text-sm text-zinc-500 italic text-center'>{`N/A`}</p>
                </React.Fragment>
              )}
            </div>
          </div>

          {/* xuất trong kỳ */}
          <div
            className={'flex flex-none'
              .concat(' w-60')
              .concat(' border-l border-gray-200')}
          >
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' hover:bg-amber-100')}
            >
              {isNumber(rowData?.totalExportQuantity) ? (
                <React.Fragment>
                  <p className='text-sm text-dark text-center'>
                    {rowData?.totalExportQuantity}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className='text-sm text-zinc-500 italic text-center'>{`N/A`}</p>
                </React.Fragment>
              )}
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' border-l border-gray-200')
                .concat(' hover:bg-amber-100')}
            >
              {isNumber(rowData?.totalExportPrice) ? (
                <React.Fragment>
                  <p className='text-sm text-blue-600 font-medium text-center'>
                    {rowData?.totalExportPrice}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className='text-sm text-zinc-500 italic text-center'>{`N/A`}</p>
                </React.Fragment>
              )}
            </div>
          </div>

          {/* tồn cuối kỳ */}
          <div
            className={'flex flex-none'
              .concat(' w-60')
              .concat(' border-l border-gray-200')}
          >
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' hover:bg-amber-100')}
            >
              {isNumber(rowData?.closingStockQuantity) ? (
                <React.Fragment>
                  <p className='text-sm text-dark text-center'>
                    {rowData?.closingStockQuantity}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className='text-sm text-zinc-500 italic text-center'>{`N/A`}</p>
                </React.Fragment>
              )}
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' border-l border-gray-200')
                .concat(' hover:bg-amber-100')}
            >
              {isNumber(rowData?.closingStockTotalPrice) ? (
                <React.Fragment>
                  <p className='text-sm text-blue-600 font-medium text-center'>
                    {rowData?.closingStockTotalPrice}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className='text-sm text-zinc-500 italic text-center'>{`N/A`}</p>
                </React.Fragment>
              )}
            </div>
          </div>

          {/* <div
            className={'flex w-40 flex-none'
              .concat(' items-start justify-center')
              .concat(' px-2 py-1.5')}
          >
            <p className='text-sm text-dark text-center'>{`${
              stringIsNotEmpty(rowData?.updatedDate)
                ? moment(rowData?.updatedDate).format('DD/MM/YYYY HH:mm:ss')
                : 'N/A'
            }`}</p>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReportItem;
