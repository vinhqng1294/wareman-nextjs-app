import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon, TextColor } from '@/utils/global.enums';
import React from 'react';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { deleteProduct } from '@/apis/product.api';

const ProductItem = function ({
  productItemData,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const handleDelete = async function () {
    await deleteProduct({
      accessToken: accessToken,
      productId: productItemData?.id,
    })
      .then(function ({ data: resData }) {
        console.info('deleteProduct resData', resData);
        window?.location?.reload();
        // redirectTo(`/buying-requests/${resData?.data?.id}`);
      })
      .catch(function (err) {
        console.error('err', err?.response);
        setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      });
  };

  return (
    <React.Fragment>
      <div className='flex flex-col'>
        <div
          className={'flex flex-col'
            .concat(' w-full max-w-xl')
            .concat(' bg-white')
            .concat(' rounded-md shadow-md')
            .concat(' xxs:py-3 xxs:px-4')
            .concat(' md:py-4 md:px-5')}
          title={
            stringIsNotEmpty(productItemData?.name)
              ? productItemData?.name
              : `<Tên sản phẩm>`
          }
        >
          <div className='flex'>
            <TextEllipsis
              content={
                stringIsNotEmpty(productItemData?.id)
                  ? `Mã sản phẩm: ${trimUUID(
                      productItemData?.id
                    ).toUpperCase()}`
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
          </div>
          <div className='flex mt-0.5'>
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
            className={'flex items-center'.concat(' mt-2').concat(' space-x-3')}
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
          <div className='flex flex-col mt-2'>
            <div className='flex items-center space-x-2'>
              <p className={'text-base text-dark'}>Số lượng:</p>
              <p className={'text-base text-blue-500 font-semibold'}>
                {productItemData?.totalQuantity} {productItemData?.uomName}
              </p>
            </div>
          </div>
          <div className={'flex items-center'.concat(' mt-2').concat('')}>
            <button
              title='Xóa'
              type='button'
              className={'flex items-center justify-center'
                .concat(' rounded-full')
                .concat(' bg-white')
                .concat(' w-10 h-10')
                .concat(' hover:shadow-md hover:border border-zinc-50')}
              onClick={function (evt) {
                evt?.preventDefault();
                evt?.stopPropagation();
                handleDelete();
              }}
            >
              <ReactSVG
                src={SvgIcon.trash}
                className={'fill-red-500 w-5 h-5'}
              />
            </button>
            <button
              type='button'
              className={
                'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(' bg-white')
                  .concat(' border border-zinc-200')
                  .concat(' px-4 py-1.5')
                  .concat(' hover:shadow-md')
                  .concat(' ml-auto')
                // .concat(' xxs:w-full md:w-1/3')
              }
              onClick={function (evt) {
                evt?.preventDefault();
                evt?.stopPropagation();
                redirectTo(`/products/${productItemData?.id}`);
              }}
            >
              <p className='text-dark font-semibold text-sm'>Xem chi tiết</p>
            </button>
            {/* <button
              type='button'
              className={'flex items-center justify-center'
                .concat(' rounded-full')
                .concat(' bg-white')
                .concat(' w-10 h-10')
                .concat(' hover:shadow-md hover:border border-zinc-50')
                .concat(' ml-auto')}
              onClick={function (evt) {
                evt?.preventDefault();
                evt?.stopPropagation();
                redirectTo(`/products/${productItemData?.id}`);
              }}
            >
              <ReactSVG
                src={SvgIcon.info}
                className={'fill-blue-500 w-5 h-5'}
              />
              <p className='text-white font-semibold text-base'>Xem chi tiết</p>
            </button> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductItem;
