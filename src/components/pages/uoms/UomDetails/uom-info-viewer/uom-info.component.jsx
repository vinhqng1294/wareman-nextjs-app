import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const UomInfo = function ({
  uomInfo,
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
          .concat(' lg:w-6/12 xl:w-1/2')}
      >
        <div className='flex'>
          <p
            className={'font-bold text-left'
              .concat(' xxs:text-base md:text-xl')
              .concat(' text-dark')}
          >{`${uomInfo?.name}`}</p>
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
              stringIsNotEmpty(uomInfo?.description)
                ? uomInfo?.description
                : 'N/A'
            }`}
          </p>
        </div>

        <div className={'flex flex-col items-start'.concat(' mt-2')}>
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            Số thực:
          </p>
          <p
            className={'text-left mt-1'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')
              .concat(' text-dark')}
          >
            {uomInfo?.isFloat?.toString()}
          </p>
        </div>

        <div className={'flex flex-col items-start'.concat(' mt-2')}>
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
              stringIsNotEmpty(uomInfo?.addedDate)
                ? moment(uomInfo?.addedDate).format('DD/MM/YYYY HH:mm:ss')
                : 'N/A'
            }`}
          </p>
        </div>
        <div className={'flex flex-col items-start'.concat(' mt-2')}>
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
              stringIsNotEmpty(uomInfo?.updatedDate)
                ? moment(uomInfo?.updatedDate).format('DD/MM/YYYY HH:mm:ss')
                : 'N/A'
            }`}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UomInfo;
