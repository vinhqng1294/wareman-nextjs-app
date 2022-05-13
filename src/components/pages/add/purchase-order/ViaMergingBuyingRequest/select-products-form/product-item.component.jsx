import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon, TextColor } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { isFunction } from '@/utils/commons/checkVariableType.utils';

const ProductItem = function ({
  productItemData,
  productItemOnClick,
  defaultSelected,
  isLast,
  ...props
}) {
  const [selected, setSelected] = useState(defaultSelected ?? false);
  const itemOnClick = function () {
    setSelected(!selected);
    if (isFunction(productItemOnClick)) {
      productItemOnClick({
        selected: !selected,
        productItemData: productItemData,
      });
    }
  };

  return (
    <React.Fragment>
      <div className='flex flex-col'>
        <div
          className={'flex flex-col py-4'
            .concat(' border-gray-200 border-l-5')
            .concat(' relative w-full')
            .concat(selected ? ' border-l-blue-500' : ' border-l-white')
            // .concat(selected ? ' ring-[1.5px] ring-sky-400' : '')
            .concat(!isLast ? ' border-b' : '')}
          // className={'flex flex-col relative'
          //   .concat(' w-full max-w-xl')
          //   .concat(' bg-white')
          //   .concat(' rounded-md shadow-md')
          //   .concat(' xxs:py-3 xxs:px-4')
          //   .concat(' md:py-4 md:px-5')
          //   .concat(' cursor-pointer')
          //   .concat(selected ? ' ring-[1.5px] ring-sky-400' : '')}
          title={
            stringIsNotEmpty(productItemData?.productName)
              ? productItemData?.productName
              : `<Tên sản phẩm>`
          }
          onClick={itemOnClick}
        >
          <div className='flex items-center w-full px-2'>
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
              {stringIsNotEmpty(productItemData?.productLogoId) ? (
                <React.Fragment>
                  <Image
                    // loader={function ({ src }) {
                    //   return src;
                    // }}
                    src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/photos/product/download/url?id=${productItemData?.productLogoId}`}
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
                  stringIsNotEmpty(productItemData?.productName)
                    ? productItemData?.productName
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
            <div className='flex flex-none px-1 ml-auto'>
              <div
                className={'flex flex-none'
                  .concat(' items-center justify-center')
                  .concat(' w-4 h-4')
                  .concat(' rounded-full')
                  .concat(selected ? ' bg-blue-500' : ' bg-white')
                  .concat(
                    selected ? ' border-transparent' : ' border-gray-300'
                  )}
              >
                <ReactSVG
                  src={SvgIcon.check}
                  className={'w-2.5 h-2.5'.concat(
                    selected ? ' fill-white' : ' fill-transparent'
                  )}
                />
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductItem;
