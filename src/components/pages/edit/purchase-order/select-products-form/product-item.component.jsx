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
          className={'flex flex-col relative'
            .concat(' w-full max-w-xl')
            .concat(' bg-white')
            .concat(' rounded-md shadow-md')
            .concat(' xxs:py-3 xxs:px-4')
            .concat(' md:py-4 md:px-5')
            .concat(' cursor-pointer')
            .concat(selected ? ' ring-[1.5px] ring-sky-400' : '')}
          title={
            stringIsNotEmpty(productItemData?.name)
              ? productItemData?.name
              : `<Tên sản phẩm>`
          }
          onClick={itemOnClick}
        >
          {selected && (
            <React.Fragment>
              <div className={'absolute top-1 left-1 flex flex-col'}>
                <div
                  className={'flex flex-none'
                    .concat(' items-center justify-center')
                    .concat(' w-4 h-4')
                    .concat(' rounded-full')
                    .concat(' bg-blue-500')}
                >
                  <ReactSVG
                    src={SvgIcon.check}
                    className={'w-2.5 h-2.5'.concat(' fill-white')}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
          {/* <div className='flex'>
            <TextEllipsis
              content={
                stringIsNotEmpty(productItemData?.id)
                  ? `#${trimUUID(productItemData?.id).toUpperCase()}`
                  : `<Mã sản phẩm>`
              }
              textFormat={`whitespace-pre-wrap`
                .concat(` text-sm text-zinc-500`)
                .concat('')}
              customTextStyles={{
                WebkitLineClamp: 1,
                display: `-webkit-box`,
                WebkitBoxOrient: `vertical`,
              }}
            />
          </div> */}
          <div className='flex mt-0'>
            <TextEllipsis
              content={
                stringIsNotEmpty(productItemData?.name)
                  ? productItemData?.name
                  : `<Tên sản phẩm>`
              }
              textFormat={`whitespace-pre-wrap`
                .concat(` text-base text-dark`)
                .concat(' font-semibold')}
              customTextStyles={{
                WebkitLineClamp: 1,
                display: `-webkit-box`,
                WebkitBoxOrient: `vertical`,
              }}
            />
          </div>
          <div
            className={'flex items-center'
              .concat(' mt-1.5')
              .concat(' space-x-3')}
          >
            <div
              className={'flex flex-col'
                .concat(' xxs:w-12 xxs:h-12')
                .concat(' md:w-16 md:h-16')
                .concat(' relative overflow-hidden')
                .concat(' rounded-md')
                .concat(` border border-zinc-200`)
                .concat(' bg-zinc-100')
                .concat(' flex-none')}
            >
              {stringIsNotEmpty(productItemData?.logoId) ? (
                <React.Fragment>
                  <Image
                    // loader={function ({ src }) {
                    //   return src;
                    // }}
                    src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/photos/product/download/url?id=${productItemData?.logoId}`}
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
            <div className='flex'>
              <TextEllipsis
                content={
                  stringIsNotEmpty(productItemData?.shortDescription)
                    ? productItemData?.shortDescription
                    : `N/A`
                }
                textFormat={`whitespace-pre-wrap`
                  .concat(` text-sm ${TextColor.secondary}`)
                  .concat('')}
                customTextStyles={{
                  WebkitLineClamp: 3,
                  display: `-webkit-box`,
                  WebkitBoxOrient: `vertical`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductItem;
