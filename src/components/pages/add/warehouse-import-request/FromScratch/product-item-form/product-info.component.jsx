import { makeFullName } from '@/utils/commons/makeFullName.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { SvgIcon } from '@/utils/global.enums';
import QRCode from 'qrcode.react';

const ProductInfo = function ({ productInfoData, ...props }) {
  return (
    <React.Fragment>
      <div className='flex flex-col space-y-3'>
        <div className='flex items-center pr-4'>
          <div
            className={'flex flex-col'
              .concat(' xxs:w-12 xxs:h-12')
              .concat(' md:w-36 md:h-36')
              .concat(' relative overflow-hidden')
              .concat(' rounded-md')
              .concat(` border border-zinc-200`)
              .concat(' bg-zinc-100')
              .concat(' flex-none')}
          >
            {stringIsNotEmpty(productInfoData?.logoId) ? (
              <React.Fragment>
                <Image
                  // loader={function ({ src }) {
                  //   return src;
                  // }}
                  src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/photos/product/download/url?id=${productInfoData?.logoId}`}
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
          {/* QRCode để dùng điện thoại check thông tin sản phẩm này từ server */}
          {/* <div
            className={'flex flex-col'
              .concat(' xxs:w-12 xxs:h-12')
              .concat(' md:w-28 md:h-28')
              .concat(' relative overflow-hidden')
              // .concat(` border border-zinc-200`)
              .concat(' bg-zinc-100')
              .concat(' flex-none ml-auto')}
          >
            <QRCode
              value={
                stringIsNotEmpty(productInfoData?.barcode)
                  ? productInfoData?.barcode
                  : 'N/A'
              }
              level='M'
              className='w-full h-full'
              renderAs='svg'
            />
          </div> */}
        </div>
        <div className='flex flex-col'>
          <div className='flex items-center space-x-2'>
            {/* <p className={'text-base text-dark'}>Tên yêu cầu mua hàng:</p> */}
            <p className={'text-2xl text-dark font-semibold'}>
              {productInfoData?.name}
            </p>
          </div>
          {/* <div className='flex items-center space-x-2'>
            <p className={'text-base text-dark'}>SKU:</p>
            <p className={'text-base text-blue-500 font-medium'}>
              {stringIsNotEmpty(productInfoData?.sku)
                ? productInfoData?.sku
                : 'N/A'}
            </p>
          </div> */}
          <div className='flex items-center space-x-2'>
            <p className={'text-base text-dark flex-none'}>Mô tả:</p>
            <p className={'text-base text-blue-500 font-medium'}>
              {stringIsNotEmpty(productInfoData?.shortDescription)
                ? productInfoData?.shortDescription
                : 'N/A'}
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <p className={'text-base text-dark'}>Đơn vị:</p>
            <p className={'text-base text-blue-500 font-medium'}>
              {stringIsNotEmpty(productInfoData?.uomName)
                ? productInfoData?.uomName
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductInfo;
