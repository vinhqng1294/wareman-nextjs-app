import { deleteLot } from '@/apis/lot.api';
import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React from 'react';
import { ReactSVG } from 'react-svg';

const LotItem = function ({
  lotItemData,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const handleDelete = async function () {
    await deleteLot({
      accessToken: accessToken,
      lotId: lotItemData?.id,
    })
      .then(function ({ data: resData }) {
        console.info('deleteLot resData', resData);
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
      <div
        className={'flex flex-col'
          .concat(' w-full')
          .concat(' bg-white')
          .concat(' rounded-md shadow-md')
          .concat(' xxs:py-3 xxs:px-4')
          .concat(' md:py-4 md:px-5')
          .concat(' relative')}
      >
        <div className={'flex absolute bottom-3 right-4'}>
          <button
            title='Xóa'
            type='button'
            className={'flex items-center justify-center'
              .concat(' rounded-full')
              .concat(' bg-white')
              .concat(' w-7 h-7')
              .concat(' hover:shadow-md hover:border border-zinc-50')}
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              handleDelete();
            }}
          >
            <ReactSVG src={SvgIcon.trash} className={'fill-red-500 w-5 h-5'} />
          </button>
        </div>
        <div
          className={'flex items-center'
            .concat(' cursor-pointer')
            .concat(' space-x-3')}
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            redirectTo(`/lots/${lotItemData?.id}`);
          }}
        >
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
            <ReactSVG
              src={SvgIcon['location-alt']}
              className={'fill-zinc-500'
                .concat(' w-full h-full')
                .concat(' p-5')}
            />
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex'>
              <TextEllipsis
                content={
                  stringIsNotEmpty(lotItemData?.id)
                    ? `Mã phân khu: ${trimUUID(lotItemData?.id).toUpperCase()}`
                    : `<Mã phân khu>`
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
                  stringIsNotEmpty(lotItemData?.name)
                    ? lotItemData?.name
                    : `<Tên phân khu>`
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
            <div className='flex mt-0.5 items-center space-x-2'>
              <p className={`text-base text-zinc-500 flex-none`}>Tổng số kệ:</p>
              <p className={`text-base text-blue-500 font-semibold`}>
                {lotItemData?.racksCount ?? 0}
              </p>
            </div>
            <div className='flex mt-0.5 items-center space-x-2'>
              <p className={`text-base text-zinc-500 flex-none`}>
                Tổng số sản phẩm:
              </p>
              <p className={`text-base text-blue-500 font-semibold`}>
                {lotItemData?.productsCount ?? 0}
              </p>
            </div>
            {/* <div
              className={'flex items-center'
                .concat(' w-full xxs:mt-2')
                .concat(' space-x-3')}
            >
              <button
                type='button'
                className={
                  'flex items-center justify-center'
                    .concat(' rounded-full')
                    .concat(' bg-white')
                    .concat(' border border-zinc-200')
                    .concat(' px-4 py-1.5')
                    .concat(' hover:shadow-md')
                  // .concat(' xxs:w-full md:w-1/3')
                }
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  redirectTo(`/lots/${lotItemData?.id}/shelves`);
                }}
              >
                <p className='text-dark font-semibold text-sm'>Xem tất cả kệ</p>
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
                  // .concat(' xxs:w-full md:w-1/3')
                }
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  redirectTo(`/lots/${lotItemData?.id}/products`);
                }}
              >
                <p className='text-dark font-semibold text-sm'>
                  Xem tất cả sản phẩm
                </p>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LotItem;
