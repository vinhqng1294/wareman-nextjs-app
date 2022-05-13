import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import moment from 'moment';
import Image from 'next/image';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { useDispatch } from 'react-redux';
import ProductStockListTab from './product-stock-list-tab.component';

const ProductItem = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  index,
  productInfo,
  lotInfo,
  rackInfo,
  ...props
}) {
  const dispatch = useDispatch();

  const [isExpand, setIsExpand] = useState(false);
  const expandBtnOnClick = function () {
    setIsExpand(!isExpand);
  };

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' border-b border-gray-200')
          .concat(' hover:bg-zinc-50')
          .concat(isExpand ? ' bg-zinc-50' : '')}
      >
        <div className='flex items-center w-full'>
          <div
            className={'flex w-8 flex-none'
              .concat(' items-center justify-start')
              .concat(' px-0.5 py-1.5')}
          >
            <button
              type='button'
              className={'flex items-center justify-center'
                .concat(' rounded-md')
                .concat(' hover:bg-white')
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

          <div
            className='flex w-full cursor-pointer'
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              redirectTo(`/products/${productInfo?.id}`, true);
            }}
          >
            <div
              className={'flex w-16 flex-none'
                .concat(' items-center justify-start')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark'>{index + 1}</p>
            </div>
            <div
              className={'flex w-16 flex-none'
                .concat(' items-center justify-start')
                .concat(' py-1.5')}
            >
              <div
                className={'flex flex-col'
                  .concat(' xxs:w-12 xxs:h-12')
                  .concat(' md:w-14 md:h-14')
                  .concat(' relative overflow-hidden')
                  .concat(' rounded-md')
                  .concat(` border border-zinc-200`)
                  .concat(' bg-zinc-100')}
              >
                {stringIsNotEmpty(productInfo?.logoId) ? (
                  <React.Fragment>
                    <Image
                      // loader={function ({ src }) {
                      //   return src;
                      // }}
                      src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/photos/product/download/url?id=${productInfo?.logoId}`}
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
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-start')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark'>
                {`${
                  stringIsNotEmpty(productInfo?.name)
                    ? `${productInfo?.name}`
                    : 'N/A'
                }`}
              </p>
            </div>
            <div
              className={'flex w-40 flex-none'
                .concat(' items-start justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark text-center'>
                {`${
                  stringIsNotEmpty(productInfo?.addedDate)
                    ? moment(productInfo?.addedDate).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )
                    : 'N/A'
                }`}
              </p>
            </div>
            <div
              className={'flex w-40 flex-none'
                .concat(' items-start justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark text-center'>{`${
                stringIsNotEmpty(productInfo?.updatedDate)
                  ? moment(productInfo?.updatedDate).format(
                      'DD/MM/YYYY HH:mm:ss'
                    )
                  : 'N/A'
              }`}</p>
            </div>
          </div>

          {/* <div
            className={'flex w-40 flex-none'
              .concat(' items-center justify-end')
              .concat(' px-2 py-1.5')
              .concat(' space-x-3')}
          >
            <button
              title='Xoá'
              type='button'
              className={'flex items-center justify-center'
                .concat(' rounded-lg')
                .concat(' hover:bg-white')
                .concat(' w-6 h-6')
                .concat(' hover:shadow-md hover:border border-zinc-50')}
            >
              <ReactSVG
                src={SvgIcon.trash}
                className={'fill-red-500 w-4 h-4'}
              />
            </button>
          </div> */}
        </div>
        {isExpand && (
          <React.Fragment>
            <div className='flex flex-col py-3 px-6'>
              <ProductStockListTab
                setErrorMsg={setErrorMsg}
                setViewErrorPopup={setViewErrorPopup}
                viewErrorPopup={viewErrorPopup}
                accessToken={accessToken}
                lotInfo={lotInfo}
                productInfo={productInfo}
                rackInfo={rackInfo}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductItem;
