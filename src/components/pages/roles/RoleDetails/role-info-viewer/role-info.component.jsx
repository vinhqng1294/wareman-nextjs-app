import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const RoleInfo = function ({
  roleInfo,
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
          >{`${roleInfo?.name}`}</p>
        </div>
        <div className={'flex flex-col items-start'.concat(' mt-2')}>
          <p
            className={'flex-none text-left'
              .concat(' xxs:text-sm md:text-base')
              .concat(' font-semibold')
              .concat(' text-dark')}
          >
            Permissions:
          </p>
          {
            roleInfo?.permissions?.length > 0
              ? roleInfo?.permissions.map((item, i) => {
                return (
                  <p
                    key={i}
                    className={'text-left mt-1'
                      .concat(' xxs:text-sm md:text-base')
                      .concat(' w-full')
                      .concat(' text-dark')}
                  >
                    {item}
                  </p>)
              })
              : (
                <p
                  className={'text-left mt-1'
                    .concat(' xxs:text-sm md:text-base')
                    .concat(' w-full')
                    .concat(' text-dark')}
                >
                  {'N/A'}
                </p>
              )
          }
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
              stringIsNotEmpty(roleInfo?.addedDate)
                ? moment(roleInfo?.addedDate).format('DD/MM/YYYY HH:mm:ss')
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
              stringIsNotEmpty(roleInfo?.updatedDate)
                ? moment(roleInfo?.updatedDate).format('DD/MM/YYYY HH:mm:ss')
                : 'N/A'
            }`}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RoleInfo;
