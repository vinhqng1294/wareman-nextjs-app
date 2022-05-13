import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';

const EmptyListInfoV2 = function ({ itemLabel, ...props }) {
  return (
    <React.Fragment>
      <div className='flex items-center justify-center py-3 px-3 w-full'>
        <p className='text-zinc-500 italic text-base'>
          Chưa có {stringIsNotEmpty(itemLabel) ? itemLabel : '<phần tử>'} nào
          trong danh sách
        </p>
      </div>
    </React.Fragment>
  );
};

export default EmptyListInfoV2;
