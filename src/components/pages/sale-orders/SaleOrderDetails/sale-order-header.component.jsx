import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import moment from 'moment';
import { makeFullName } from '@/utils/commons/makeFullName.utils';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';
import { SaleOrderStatusList } from '../sale-order.enum';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';

const SaleOrderHeader = function ({
  saleOrderInfo,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(false);

  const handleEditOnClick = function () {
    redirectTo(`/edit/sale-order/${saleOrderInfo?.id}`);
  };

  // const [creatorData, setCreatorData] = useState({});

  // useEffect(
  //   function () {
  //     if (objectIsNotEmpty(saleOrderInfo)) {
  //       setComponentLoading(true);
  //       getUserProfileById({
  //         accessToken,
  //         userId: saleOrderInfo?.userId,
  //       })
  //         .then(function ({ data: resData }) {
  //           console.info('getUserProfileById resData', resData);
  //           setCreatorData({ ...resData?.data });
  //         })
  //         .catch(function (err) {
  //           console.error('err', err);
  //           console.error('err', err.response);
  //           setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
  //           setViewErrorPopup(!viewErrorPopup);
  //         })
  //         .finally(function () {
  //           setComponentLoading(false);
  //         });
  //     }
  //   },
  //   [saleOrderInfo]
  // );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full max-w-4xl')
          .concat(' bg-white')
          .concat(' rounded-md shadow-md')}
      >
        <div className='flex w-full px-5 pt-4 pb-1.5'>
          <div className='flex items-center'>
            <TextEllipsis
              content={
                stringIsNotEmpty(saleOrderInfo?.id)
                  ? `Mã đơn bán hàng: ${trimUUID(
                      saleOrderInfo?.id
                    ).toUpperCase()}`
                  : `<Mã đơn bán hàng>`
              }
              textFormat={`whitespace-pre-wrap`
                .concat(` text-base text-zinc-500`)
                .concat('')}
              customTextStyles={{
                WebkitLineClamp: 1,
                display: `-webkit-box`,
                WebkitBoxOrient: `vertical`,
              }}
            />
          </div>
          <div className='flex ml-auto'>
            <div className='flex justify-end'>
              <div className='flex space-x-1'>
                <p className={`text-sm text-zinc-500`}>Cập nhật lúc:</p>
                <p className={`text-sm text-zinc-500 font-medium`}>
                  {moment(saleOrderInfo?.updatedDate).format(
                    'DD/MM/YYYY HH:mm:ss'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='w-full border-b border-gray-200'></div> */}
        <div
          className={'flex items-center'
            .concat(' px-5 pb-4')
            .concat(' space-x-3')}
        >
          <div className='flex flex-col w-full'>
            <div className='flex'>
              <TextEllipsis
                content={
                  stringIsNotEmpty(saleOrderInfo?.name)
                    ? saleOrderInfo?.name
                    : `<Tên đơn bán hàng>`
                }
                textFormat={`whitespace-pre-wrap`
                  .concat(` text-xl text-dark`)
                  .concat(' font-semibold')}
                customTextStyles={{
                  WebkitLineClamp: 1,
                  display: `-webkit-box`,
                  WebkitBoxOrient: `vertical`,
                }}
              />
            </div>
            <div className='flex space-x-2 mt-1'>
              <p className={`text-base text-zinc-500 flex-none`}>Khách hàng:</p>
              <p className={`text-base text-blue-500 font-medium`}>
                {saleOrderInfo?.customerName}
              </p>
            </div>
            <div
              className={'flex'.concat(' relative').concat(' space-x-3 mt-1')}
            >
              <div className='flex space-x-2 w-full max-w-[24.5rem]'>
                <p className={`text-base text-zinc-500 flex-none`}>
                  Người tạo:
                </p>
                <p className={`text-base text-blue-500 font-medium`}>
                  {makeFullName({
                    firstName: saleOrderInfo?.userFirstName,
                    lastName: saleOrderInfo?.userLastName,
                  })}
                </p>
              </div>
              <div className='flex space-x-2 w-full max-w-[24.5rem]'>
                <p className={`text-base text-zinc-500 flex-none`}>Ngày tạo:</p>
                <p className={`text-base text-blue-500 font-medium`}>
                  {moment(saleOrderInfo?.addedDate).format(
                    'DD/MM/YYYY HH:mm:ss'
                  )}
                </p>
              </div>

              <div
                className={'flex flex-none'
                  .concat(' items-center')
                  .concat(' absolute right-0 bottom-0')
                  .concat(' space-x-1')}
              >
                {saleOrderInfo?.status === SaleOrderStatusList[0].key && (
                  <React.Fragment>
                    <button
                      title='Sửa đơn'
                      type='button'
                      className={'flex items-center justify-center'
                        .concat(' rounded-full')
                        .concat(' bg-white')
                        .concat(' w-7 h-7')
                        .concat(' hover:border border-zinc-50')
                        .concat(' hover:shadow-md')}
                      onClick={function (evt) {
                        evt?.preventDefault();
                        evt?.stopPropagation();
                        handleEditOnClick();
                      }}
                    >
                      <ReactSVG
                        src={SvgIcon.pencil}
                        className={'fill-blue-500 w-4 h-4'}
                      />
                    </button>
                  </React.Fragment>
                )}

                {/* <button
                  title='Tải file'
                  type='button'
                  className={'flex items-center justify-center'
                    .concat(' rounded-full')
                    .concat(' bg-white')
                    .concat(' w-7 h-7')
                    .concat(' hover:border border-zinc-50')
                    .concat(' hover:shadow-md')}
                >
                  <ReactSVG
                    src={SvgIcon['cloud-download']}
                    className={'fill-zinc-700 w-4 h-4'}
                  />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SaleOrderHeader;
