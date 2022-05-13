import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const EmployeeInfo = function ({
  employeeInfo,
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
          >{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</p>
        </div>
        <div className={'flex flex-col items-start'.concat(' mt-2')}>
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            Email:
          </p>
          <p
            className={'text-left mt-1'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')
              .concat(' text-dark')}
          >
            {`${
              stringIsNotEmpty(employeeInfo?.email)
                ? employeeInfo?.email
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
            Ngày tạo:
          </p>
          <p
            className={'text-left mt-1'
              .concat(' xxs:text-sm md:text-base')
              .concat(' w-full')
              .concat(' text-dark')}
          >
            {`${
              stringIsNotEmpty(employeeInfo?.addedDate)
                ? moment(employeeInfo?.addedDate).format('DD/MM/YYYY HH:mm:ss')
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
              stringIsNotEmpty(employeeInfo?.updatedDate)
                ? moment(employeeInfo?.updatedDate).format(
                    'DD/MM/YYYY HH:mm:ss'
                  )
                : 'N/A'
            }`}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployeeInfo;
