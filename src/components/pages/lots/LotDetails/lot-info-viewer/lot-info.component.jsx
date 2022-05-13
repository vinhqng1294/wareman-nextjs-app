import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import moment from 'moment';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';

const LotInfo = function ({
  lotInfo,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' flex-none w-full')
          .concat(' lg:w-7/12')}
      >
        <div className='flex'>
          <p
            className={'font-bold text-left'
              .concat(' xxs:text-base md:text-xl')
              .concat(' text-dark')}
          >{`${lotInfo?.name}`}</p>
        </div>
        <div className={'flex mt-2 space-x-16'}>
          <div
            className={
              'flex flex-col items-start'
              // .concat(' mt-2')
            }
          >
            <p
              className={'flex-none text-left'
                .concat(' xxs:text-sm md:text-base')
                .concat(' font-semibold')
                .concat(' text-dark')}
            >
              Ngày tạo:
            </p>
            <p
              className={'text-left mt-1'
                .concat(' xxs:text-sm md:text-base')
                .concat(' w-full')
                .concat(' text-dark')}
            >
              {`${
                stringIsNotEmpty(lotInfo?.addedDate)
                  ? moment(lotInfo?.addedDate).format('DD/MM/YYYY HH:mm:ss')
                  : 'N/A'
              }`}
            </p>
          </div>
          <div
            className={
              'flex flex-col items-start'
              // .concat(' mt-2')
            }
          >
            <p
              className={'flex-none text-left'
                .concat(' xxs:text-sm md:text-base')
                .concat(' font-semibold')
                .concat(' text-dark')}
            >
              Cập nhật lúc:
            </p>
            <p
              className={'text-left mt-1'
                .concat(' xxs:text-sm md:text-base')
                .concat(' w-full')
                .concat(' text-dark')}
            >
              {`${
                stringIsNotEmpty(lotInfo?.updatedDate)
                  ? moment(lotInfo?.updatedDate).format('DD/MM/YYYY HH:mm:ss')
                  : 'N/A'
              }`}
            </p>
          </div>
        </div>
        <div className={'flex flex-col items-start'.concat(' mt-2')}>
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            Mô tả chi tiết:
          </p>
          <p
            className={'text-left mt-1'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')
              .concat(' text-dark')}
          >
            {`${
              stringIsNotEmpty(lotInfo?.description)
                ? lotInfo?.description
                : 'N/A'
            }`}
          </p>
        </div>
        <div
          className={'flex w-full space-x-3'
            .concat(' px-5 py-3 mt-auto')
            .concat(' items-center')
            .concat(' border-y border-gray-200')}
        >
          <button
            type='button'
            className={
              'flex items-center justify-center'
                .concat(' rounded-full')
                .concat(' bg-red-500')
                .concat(' border border-transparent')
                .concat(' px-5 py-1.5')
                .concat(' hover:shadow-md hover:bg-opacity-70')
                .concat(' space-x-2 flex-none')
              // .concat(' xxs:w-full md:w-1/3')
            }
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              // if (isFunction(handleViewChangeHistoryModal)) {
              //   handleViewChangeHistoryModal({});
              // }
            }}
          >
            <ReactSVG
              src={SvgIcon['trash']}
              className={'fill-white'.concat(' w-4')}
            />
            <p className='text-white font-semibold text-sm'>{`Xóa`}</p>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LotInfo;
