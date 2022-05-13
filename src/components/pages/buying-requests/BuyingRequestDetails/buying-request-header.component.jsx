import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import moment from 'moment';
import { makeFullName } from '@/utils/commons/makeFullName.utils';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';

const BuyingRequestHeader = function ({
  buyingRequestInfo,
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
  //     if (objectIsNotEmpty(buyingRequestInfo)) {
  //       setComponentLoading(true);
  //       getUserProfileById({
  //         accessToken,
  //         userId: buyingRequestInfo?.userId,
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
  //   [buyingRequestInfo]
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
                stringIsNotEmpty(buyingRequestInfo?.id)
                  ? `Mã yêu cầu mua hàng: ${trimUUID(
                      buyingRequestInfo?.id
                    ).toUpperCase()}`
                  : `<Mã yêu cầu mua hàng>`
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
                  {moment(buyingRequestInfo?.updatedDate).format(
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
                  stringIsNotEmpty(buyingRequestInfo?.name)
                    ? buyingRequestInfo?.name
                    : `<Tên yêu cầu mua hàng>`
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

            <div
              className={'flex'.concat(' relative').concat(' space-x-3 mt-1')}
            >
              <div className='flex space-x-2 w-full max-w-[24.5rem]'>
                <p className={`text-base text-zinc-500 flex-none`}>
                  Người tạo:
                </p>
                <p className={`text-base text-blue-500 font-medium`}>
                  {makeFullName({
                    firstName: buyingRequestInfo?.userFirstName,
                    lastName: buyingRequestInfo?.userLastName,
                  })}
                </p>
              </div>
              <div className='flex space-x-2 w-full max-w-[24.5rem]'>
                <p className={`text-base text-zinc-500 flex-none`}>Ngày tạo:</p>
                <p className={`text-base text-blue-500 font-medium`}>
                  {moment(buyingRequestInfo?.addedDate).format(
                    'DD/MM/YYYY HH:mm:ss'
                  )}
                </p>
              </div>

              {/* <div
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
                >
                  <ReactSVG
                    src={SvgIcon['cloud-download']}
                    className={'fill-zinc-700 w-4 h-4'}
                  />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuyingRequestHeader;
