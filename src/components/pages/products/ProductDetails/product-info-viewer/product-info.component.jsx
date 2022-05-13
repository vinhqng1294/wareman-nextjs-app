import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getUomInfoById } from '@/apis/uom.api';
import Barcode from 'react-barcode';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';

const ProductInfo = function ({
  productInfo,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  const [uomData, setUomData] = useState({});

  useEffect(
    function () {
      if (stringIsNotEmpty(productInfo?.uomId)) {
        getUomInfoById({ accessToken, uomId: productInfo?.uomId })
          .then(function ({ data: resData }) {
            console.info('getUomInfoById resData', resData);
            setUomData({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [productInfo]
  );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' flex-none w-full')
          .concat(' lg:w-6/12 xl:w-1/2')}
      >
        <div className='flex'>
          <p
            className={'font-bold text-left'
              .concat(' xxs:text-base md:text-xl')
              .concat(' text-dark')}
          >{`${productInfo?.name}`}</p>
        </div>
        <div
          className={'flex items-start'
            .concat(' xxs:mt-3 md:mt-4')
            .concat(' xxs:space-x-1 md:space-x-2')}
        >
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            Đơn vị đo lường:
          </p>
          <p
            className={'text-left text-dark'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')}
          >
            {`${stringIsNotEmpty(uomData?.name) ? uomData?.name : 'N/A'}`}
          </p>
        </div>
        {/* <div className={'flex flex-col items-start'.concat(' mt-2')}>
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            Barcode:
          </p>
          <div className='flex flex-col mt-1'>
            <Barcode
              margin={0}
              width={1}
              height={45}
              fontSize={16}
              value={`${
                stringIsNotEmpty(productInfo?.barcode)
                  ? productInfo?.barcode?.toUpperCase()
                  : 'N/A'
              }`}
            />
          </div>
          <p
            className={'text-left mt-1'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')
              .concat(' text-dark')}
          >
            {`${
              stringIsNotEmpty(productInfo?.barcode)
                ? productInfo?.barcode
                : 'N/A'
            }`}
          </p>
        </div> */}
        {/* <div className={'flex flex-col items-start'.concat(' mt-2')}>
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            SKU:
          </p>
          <div className='flex flex-col mt-1'>
            <Barcode
              margin={0}
              width={1}
              height={45}
              fontSize={16}
              value={`${
                stringIsNotEmpty(productInfo?.sku)
                  ? productInfo?.sku?.toUpperCase()
                  : 'N/A'
              }`}
            />
          </div>
          <p
            className={'text-left mt-1'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')
              .concat(' text-dark')}
          >
            {`${stringIsNotEmpty(productInfo?.sku) ? productInfo?.sku : 'N/A'}`}
          </p>
        </div> */}
        <div className={'flex flex-col items-start'.concat(' mt-2')}>
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            Mô tả ngắn gọn:
          </p>
          <p
            className={'text-left mt-1'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')
              .concat(' text-dark')}
          >
            {`${
              stringIsNotEmpty(productInfo?.shortDescription)
                ? productInfo?.shortDescription
                : 'N/A'
            }`}
          </p>
        </div>
        {/* <div className={'flex flex-col items-start'.concat(' mt-2')}>
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            Mô tả chi tiết:
          </p>
          <p
            className={'text-left mt-1'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')
              .concat(' text-dark')}
          >
            {`${
              stringIsNotEmpty(productInfo?.longDescription)
                ? productInfo?.longDescription
                : 'N/A'
            }`}
          </p>
        </div> */}
        <div className={'flex flex-col items-start'.concat(' mt-2')}>
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            Ngày tạo:
          </p>
          <p
            className={'text-left mt-1'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')
              .concat(' text-dark')}
          >
            {`${
              stringIsNotEmpty(productInfo?.addedDate)
                ? moment(productInfo?.addedDate).format('DD/MM/YYYY HH:mm:ss')
                : 'N/A'
            }`}
          </p>
        </div>
        <div className={'flex flex-col items-start'.concat(' mt-2')}>
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            Cập nhật lúc:
          </p>
          <p
            className={'text-left mt-1'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')
              .concat(' text-dark')}
          >
            {`${
              stringIsNotEmpty(productInfo?.updatedDate)
                ? moment(productInfo?.updatedDate).format('DD/MM/YYYY HH:mm:ss')
                : 'N/A'
            }`}
          </p>
        </div>
        <div
          className={'flex w-full space-x-3'
            .concat(' px-5 py-3 mt-auto')
            .concat(' items-center')
            .concat(' border-y border-gray-200')}
        >
          <button
            type='button'
            className={
              'flex items-center justify-center'
                .concat(' rounded-full')
                .concat(' bg-red-500')
                .concat(' border border-transparent')
                .concat(' px-5 py-1.5')
                .concat(' hover:shadow-md hover:bg-opacity-70')
                .concat(' space-x-2 flex-none')
              // .concat(' xxs:w-full md:w-1/3')
            }
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              // if (isFunction(handleViewChangeHistoryModal)) {
              //   handleViewChangeHistoryModal({});
              // }
            }}
          >
            <ReactSVG
              src={SvgIcon['trash']}
              className={'fill-white'.concat(' w-4')}
            />
            <p className='text-white font-semibold text-sm'>{`Xóa`}</p>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductInfo;
