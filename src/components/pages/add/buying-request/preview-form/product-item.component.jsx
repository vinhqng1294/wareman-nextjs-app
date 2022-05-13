import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, {  } from 'react';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import CounterInput from '@/components/ui/counter-input/counter-input.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';

const ProductItem = function ({
  productItemData,
  itemQuantityOnChange,
  index,
  isLast,
  productInfoData,
  onItemRemove,
  ...props
}) {
  const quantityOnChange = function ({ value }) {
    // console.info('productItemData', productItemData);
    // console.info('productInfoData', productInfoData);
    // console.info(value);
    if (isFunction(itemQuantityOnChange)) {
      itemQuantityOnChange({ newQuantity: value, index });
    }
  };

  const handleItemRemove = function () {
    if (isFunction(onItemRemove)) {
      onItemRemove({ index });
    }
  };

  return (
    <React.Fragment>
      <div
        className={'flex flex-col py-4'
          .concat(' border-t border-gray-200')
          .concat(isLast ? ' border-b' : '')}
      >
        <div className='flex items-center'>
          <div
            className={'flex flex-col'
              .concat(' xxs:w-12 xxs:h-12')
              .concat(' md:w-14 md:h-14')
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
            <div className='flex flex-none items-center ml-2'>
              <button
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
        <div className='flex w-full mt-1'>
          <div className='flex items-center space-x-2 ml-auto mr-4'>
            <p className={'text-base text-dark font-medium'}>Số lượng:</p>
            <div className='flex flex-none'>
              <CounterInput
                min={0}
                max={999999}
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
          {/* <div className='flex flex-none'>
            <CounterInput
              min={1}
              max={999999}
              defaultValue={productItemData?.quantity}
              valueOnChange={quantityOnChange}
            />
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductItem;
