import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import CounterInput from '@/components/ui/counter-input/counter-input.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';

const ProductItem = function ({
  index,
  isLast,
  productItemData,
  productInfoData,
  itemQuantityOnChange,
  ...props
}) {
  const [isExpand, setIsExpand] = useState(false);
  const expandBtnOnClick = function () {
    setIsExpand(!isExpand);
  };

  const quantityOnChange = function ({ value }) {
    // console.info('productItemData', productItemData);
    // console.info('productInfoData', productInfoData);
    // console.info(value);
    if (isFunction(itemQuantityOnChange)) {
      itemQuantityOnChange({ newQuantity: value, index });
    }
  };

  // console.info('productItemData', productItemData);
  // console.info('productInfoData', productInfoData);

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
            {stringIsNotEmpty(productInfoData?.productLogoId) ? (
              <React.Fragment>
                <Image
                  // loader={function ({ src }) {
                  //   return src;
                  // }}
                  src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/photos/product/download/url?id=${productInfoData?.productLogoId}`}
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
                stringIsNotEmpty(productInfoData?.productName)
                  ? productInfoData?.productName
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
        </div>
        {isExpand && (
          <React.Fragment>
            <div className='flex flex-col pl-10 pr-5 mt-1'>
              <div className='flex items-center space-x-2'>
                <p className={'text-base text-dark'}>Nhập vào kho:</p>
                <div className='flex flex-none'>
                  <CounterInput
                    min={0}
                    max={productInfoData?.remainingQuantity}
                    defaultValue={productItemData?.quantity}
                    valueOnChange={quantityOnChange}
                    isFloat={productInfoData?.uomIsFloat}
                    fractionDigits={3}
                    inputWidth={'w-56'}
                  />
                </div>
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
