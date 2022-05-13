import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';

export const SearchBarType1 = function ({
  defaultValue,
  onChange: userDefined_OnChange,
  placeholder,
  ...props
}) {
  const [inputVal, setInputVal] = useState('');

  const inputOnChange = function (evt) {
    setInputVal(evt?.target?.value);
    if (isFunction(userDefined_OnChange)) {
      userDefined_OnChange(evt?.target?.value);
    }
  };

  useEffect(
    function () {
      if (stringIsNotEmpty(defaultValue)) {
        setInputVal(defaultValue);
      } else {
        setInputVal('');
      }
    },
    [defaultValue]
  );

  console.info('search input', inputVal);

  return (
    <React.Fragment>
      <div
        className={'flex items-center'
          .concat(' overflow-hidden')
          .concat(' rounded-full bg-white')
          .concat(' relative w-full')
          .concat(' border-2 border-zinc-200')
          .concat(' hover:shadow-md')
          .concat(' focus-within:shadow-md focus-within:border-sky-300')}
      >
        <input
          className={'appearance-none w-full rounded-full'
            .concat(' outline-none focus:outline-none')
            .concat(' border-0 focus:ring-0')
            .concat(' placeholder-zinc-400 focus:placeholder-zinc-300')
            .concat(' text-dark focus:text-dark')
            .concat(' xxs:text-sm xxs:leading-6')
            .concat(' md:text-base md:leading-7')
            .concat(' xxs:pl-3 md:pl-4 xxs:pr-0.5')}
          type='text'
          placeholder={
            stringIsNotEmpty(placeholder)
              ? `${placeholder}`
              : 'Tìm kiếm sản phẩm'
          }
          value={inputVal}
          onChange={inputOnChange}
          // {...props}
        />
        <button
          className={'flex items-center justify-center'
            .concat(' bg-blue-500')
            .concat(' xxs:w-8 xxs:h-8')
            .concat(' md:w-9 md:h-9')
            .concat(' rounded-full flex-none xxs:mr-0.5 md:mr-1')}
        >
          <ReactSVG
            src={SvgIcon.search}
            className={'fill-white'
              .concat(' xxs:w-4 xxs:h-4')
              .concat(' xxs:w-5 xxs:h-5')}
          />
        </button>
      </div>
    </React.Fragment>
  );
};
