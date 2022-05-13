import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import {
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { getProductInfoById } from '@/apis/product.api';

const ProductItem = function ({
  productItemData,
  isLast,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(false);
  const [productInfoData, setProductInfoData] = useState({});

  useEffect(
    function () {
      if (objectIsNotEmpty(productItemData)) {
        setComponentLoading(true);
        getProductInfoById({
          accessToken,
          productId: productItemData?.productId,
        })
          .then(function ({ data: resData }) {
            console.info('getProductInfoById resData', resData);
            setProductInfoData({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setComponentLoading(false);
          });
      }
    },
    [productItemData]
  );

  return (
    <React.Fragment>
      <div
        className={'flex items-center py-4 px-5'
          .concat(' border-t border-gray-200')
          .concat(isLast ? ' border-b' : '')}
      >
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
          <div className='flex flex-none items-center space-x-2'>
            <p className={`text-base text-zinc-500 flex-none`}>Số lượng:</p>
            <p className={`text-base text-blue-500 font-medium`}>
              {productItemData?.quantity}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductItem;
