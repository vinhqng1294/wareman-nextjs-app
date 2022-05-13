import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';

const EmptyListInfo = function ({ itemLabel, ...props }) {
  return (
    <React.Fragment>
      <div className='flex items-center py-10 px-3'>
        <p className='text-zinc-500 italic text-base'>
          Chưa có {stringIsNotEmpty(itemLabel) ? itemLabel : '<phần tử>'} nào
          trong danh sách
        </p>
      </div>
    </React.Fragment>
  );
};

export const ErrorListInfo = function ({ message, ...props }) {
  return (
    <React.Fragment>
      <div className='flex items-center justify-center py-10 px-3'>
        <p className='text-zinc-500 italic text-base'>
          {stringIsNotEmpty(message) ? message : 'Something went wrong!'}
        </p>
      </div>
    </React.Fragment>
  );
};

export default EmptyListInfo;
