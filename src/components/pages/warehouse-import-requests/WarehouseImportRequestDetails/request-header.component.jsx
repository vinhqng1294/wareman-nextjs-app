import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import moment from 'moment';
import { makeFullName } from '@/utils/commons/makeFullName.utils';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';

const RequestHeader = function ({
  requestInfo,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(false);

  // const [creatorData, setCreatorData] = useState({});

  // useEffect(
  //   function () {
  //     if (objectIsNotEmpty(purchaseOrderInfo)) {
  //       setComponentLoading(true);
  //       getUserProfileById({
  //         accessToken,
  //         userId: purchaseOrderInfo?.userId,
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
  //   [purchaseOrderInfo]
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
                stringIsNotEmpty(requestInfo?.id)
                  ? `Mã yêu cầu nhập kho: ${trimUUID(
                      requestInfo?.id
                    ).toUpperCase()}`
                  : `<Mã yêu cầu nhập kho>`
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
                  {moment(requestInfo?.updatedDate).format(
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
                  stringIsNotEmpty(requestInfo?.name)
                    ? requestInfo?.name
                    : `<Tên yêu cầu nhập kho>`
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
              <p className={`text-base text-zinc-500 flex-none`}>
                Nhà cung cấp:
              </p>
              <p className={`text-base text-blue-500 font-medium`}>
                {stringIsNotEmpty(requestInfo?.providerName)
                  ? requestInfo?.providerName
                  : 'N/A'}
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
                    firstName: requestInfo?.userFirstName,
                    lastName: requestInfo?.userLastName,
                  })}
                </p>
              </div>
              <div className='flex space-x-2 w-full max-w-[24.5rem]'>
                <p className={`text-base text-zinc-500 flex-none`}>Ngày tạo:</p>
                <p className={`text-base text-blue-500 font-medium`}>
                  {moment(requestInfo?.addedDate).format('DD/MM/YYYY HH:mm:ss')}
                </p>
              </div>

              <div
                className={'flex flex-none'
                  .concat(' items-center')
                  .concat(' absolute right-0 bottom-0')
                  .concat(' space-x-1')}
              >
                <button
                  title='Tải file'
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
                    window.location.assign(
                      `${process.env.NEXT_PUBLIC_API_DOMAIN}`
                        .concat('/import/')
                        .concat(requestInfo?.id)
                        .concat('/excel')
                    );
                  }}
                >
                  <ReactSVG
                    src={SvgIcon['cloud-download']}
                    className={'fill-zinc-700 w-4 h-4'}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RequestHeader;
