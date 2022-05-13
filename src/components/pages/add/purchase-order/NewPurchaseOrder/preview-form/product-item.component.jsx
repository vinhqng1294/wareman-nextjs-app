import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { isFunction } from '@/utils/commons/checkVariableType.utils';

const ProductItem = function ({
  productItemData,
  index,
  isLast,
  productInfoData,
  onItemRemove,
  uomList,
  onItemEdit,
  ...props
}) {
  const [sourceUomName, setSourceUomName] = useState('');

  const handleItemRemove = function () {
    if (isFunction(onItemRemove)) {
      onItemRemove({ index });
    }
  };

  const handleItemEdit = function () {
    if (isFunction(onItemEdit)) {
      onItemEdit({ index, productInfoData });
    }
  };

  const [isExpand, setIsExpand] = useState(false);
  const expandBtnOnClick = function () {
    setIsExpand(!isExpand);
  };

  console.info('productItemData', productItemData);

  useEffect(
    function () {
      if (arrayIsNotEmpty(uomList)) {
        const foundUom = [...uomList].find(function (value) {
          if (productItemData?.sourceUomId === value?.id) {
            return value;
          }
        });
        setSourceUomName(foundUom?.name);
      }
    },
    [uomList]
  );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col py-4'
          .concat(' border-t border-gray-200')
          .concat(isLast ? ' border-b' : '')}
      >
        <div className='flex items-center'>
          <div className='flex flex-none'>
            <div className='flex flex-none'>
              <button
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-md')
                  .concat(' bg-white')
                  .concat(' w-7 h-7')
                  .concat(' hover:shadow-md hover:border border-zinc-50')}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  expandBtnOnClick();
                }}
              >
                <ReactSVG
                  src={isExpand ? SvgIcon['angle-up'] : SvgIcon['angle-down']}
                  className={'fill-dark w-4 h-4'}
                />
              </button>
            </div>
          </div>
          <div
            className={'flex flex-col'
              .concat(' xxs:w-12 xxs:h-12')
              .concat(' md:w-14 md:h-14')
              .concat(' relative overflow-hidden')
              .concat(' rounded-md')
              .concat(` border border-zinc-200`)
              .concat(' bg-zinc-100')
              .concat(' flex-none ml-2.5')}
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
          <div className={'flex ml-2.5'}>
            <TextEllipsis
              content={
                stringIsNotEmpty(productInfoData?.name)
                  ? productInfoData?.name
                  : `<Tên sản phẩm>`
              }
              textFormat={`whitespace-pre-wrap`
                .concat(` text-base text-dark font-medium`)
                .concat('')}
              customTextStyles={{
                WebkitLineClamp: 2,
                display: `-webkit-box`,
                WebkitBoxOrient: `vertical`,
              }}
            />
          </div>
          <div className={'flex flex-none ml-auto'}>
            <div className='flex flex-none'>
              <button
                title='Sửa'
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(' bg-white')
                  .concat(' w-7 h-7')
                  .concat(' hover:shadow-md hover:border border-zinc-50')}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  handleItemEdit();
                }}
              >
                <ReactSVG
                  src={SvgIcon.pencil}
                  className={'fill-blue-500 w-4 h-4'}
                />
              </button>
            </div>
            <div className='flex flex-none items-center ml-2'>
              <button
                title='Xoá'
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(' bg-white')
                  .concat(' w-7 h-7')
                  .concat(' hover:shadow-md hover:border border-zinc-50')}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  handleItemRemove();
                }}
              >
                <ReactSVG
                  src={SvgIcon['cross-circle']}
                  className={'fill-red-500 w-5 h-5'}
                />
              </button>
            </div>
          </div>
        </div>
        {isExpand && (
          <React.Fragment>
            <div className='flex flex-col pl-10 pr-5 mt-1'>
              <div className='flex items-center space-x-2'>
                <p className={'text-base text-dark'}>Nhập từ nhà cung cấp:</p>
                <p className={'text-base text-blue-500 font-semibold'}>
                  {`${productItemData?.sourceQuantity}`}
                </p>
                <p className={'text-base text-dark font-medium'}>
                  {`${sourceUomName}`}
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <p className={'text-base text-dark'}>
                  Tương ứng với số lượng nhập kho:
                </p>
                <p className={'text-base text-blue-500 font-semibold'}>
                  {`${productItemData?.destQuantity}`}
                </p>
                <p className={'text-base text-dark font-medium'}>
                  {`${productInfoData?.uomName}`}
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <p className={'text-base text-dark'}>Đơn giá trước thuế:</p>
                <p className={'text-base text-blue-500 font-semibold'}>
                  {`${productItemData?.priceBeforeTax}`}
                </p>
                <p className={'text-base text-dark font-medium'}>
                  {`₫`}
                  {/* {`₫/${productInfoData?.uomName}`} */}
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <p className={'text-base text-dark'}>Thuế:</p>
                <p className={'text-base text-blue-500 font-semibold'}>
                  {`${productItemData?.taxPercentage}`}
                </p>
                <p className={'text-base text-dark font-medium'}>{`%`}</p>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductItem;
