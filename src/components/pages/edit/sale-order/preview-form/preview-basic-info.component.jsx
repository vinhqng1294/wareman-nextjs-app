import { makeFullName } from '@/utils/commons/makeFullName.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';

const PreviewBasicInfo = function ({
  defaultValue,
  userData,
  customerInfo,
  ...props
}) {
  return (
    <React.Fragment>
      <div className='flex flex-col'>
        <div className='flex items-center space-x-2'>
          {/* <p className={'text-base text-dark'}>Tên yêu cầu mua hàng:</p> */}
          <p className={'text-2xl text-dark font-semibold'}>
            {defaultValue?.name}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <p className={'text-base text-dark flex-none'}>Người tạo:</p>
          <p className={'text-base text-blue-500 font-semibold'}>
            {makeFullName({
              firstName: userData?.firstName,
              lastName: userData?.lastName,
            })}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <p className={'text-base text-dark'}>Bán cho khách hàng:</p>
          <p className={'text-base text-blue-500 font-semibold'}>
            {`${customerInfo?.name}`}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <p className={'text-base text-dark flex-none'}>Mô tả:</p>
          <p className={'text-base text-zinc-500'}>
            {stringIsNotEmpty(defaultValue?.description)
              ? defaultValue?.description
              : 'N/A'}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <p className={'text-base text-dark flex-none'}>Ghi chú:</p>
          <p className={'text-base text-zinc-500'}>
            {stringIsNotEmpty(defaultValue?.notes)
              ? defaultValue?.notes
              : 'N/A'}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PreviewBasicInfo;
