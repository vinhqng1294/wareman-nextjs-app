import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';

const FunctionItem = function ({ url, itemName, ...props }) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' rounded-lg bg-zinc-100')
          .concat(' hover:cursor-pointer')
          .concat(' xxs:px-4 xxs:py-3')
          .concat(' md:px-5 md:py-4')
          .concat(' space-y-3')
          .concat(' w-full')
          .concat(' hover:shadow-md')}
        onClick={function (evt) {
          evt?.preventDefault();
          evt?.stopPropagation();
          if (stringIsNotEmpty(url)) {
            redirectTo(url);
          }
        }}
      >
        <p
          className={'text-dark text-center font-bold'
            .concat(' xxs:text-base')
            .concat(' md:text-base')
            .concat(' px-6')}
        >
          {stringIsNotEmpty(itemName) ? `${itemName}` : '<Tên tính năng>'}
        </p>
      </div>
    </React.Fragment>
  );
};

export default FunctionItem;
