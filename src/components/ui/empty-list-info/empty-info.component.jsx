import { objectIsNotNull } from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';

const EmptyInfo = function ({
  msg = 'Chưa có thông tin',
  CustomComp,
  ...props
}) {
  return (
    <React.Fragment>
      <div className='flex flex-col items-center py-7 px-3 mx-auto'>
        {objectIsNotNull(CustomComp) ? (
          <CustomComp />
        ) : (
          <React.Fragment>
            <p className='text-zinc-500 italic text-base'>{`${msg}`}</p>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default EmptyInfo;
