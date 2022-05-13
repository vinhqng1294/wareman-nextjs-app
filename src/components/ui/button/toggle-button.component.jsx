import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';

const ToggleButton = function ({
  defaultChecked,
  onCheck,
  primaryColor: userDefined_PrimaryColor,
  ...props
}) {
  const [isChecked, setIsChecked] = useState(defaultChecked ? true : false);
  const [primaryColor, setPrimaryColor] = useState('');

  const handleCheckChange = function (evt) {
    // console.info('evt', evt);
    evt?.preventDefault();
    evt?.stopPropagation();
    setIsChecked(!isChecked);
    if (isFunction(onCheck)) {
      onCheck(!isChecked);
    }
  };

  useEffect(
    function () {
      setIsChecked(defaultChecked);
    },
    [defaultChecked]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_PrimaryColor)) {
        setPrimaryColor(userDefined_PrimaryColor);
      } else {
        setPrimaryColor('bg-blue-500');
      }
    },
    [userDefined_PrimaryColor]
  );

  return (
    <React.Fragment>
      <div className='flex items-center justify-center flex-none'>
        <label
          htmlFor='toggle'
          className='flex items-center cursor-pointer'
          onClick={handleCheckChange}
        >
          <div className='relative'>
            <input type='checkbox' id='toggle' className='sr-only' />
            <div
              className={`block rounded-full`
                .concat(' xxs:w-11 xxs:h-6 shadow')
                // .concat(' md:w-14 md:h-8')
                .concat(isChecked ? ` ${primaryColor}` : ' bg-zinc-300')}
            ></div>
            <div
              className={`absolute bg-white rounded-full transition`
                .concat(' xxs:left-2 xxs:top-1')
                .concat(' xxs:w-4 xxs:h-4')
                // .concat(' md:left-2.5 md:top-1.5')
                // .concat(' md:w-5 md:h-5')
                .concat(
                  isChecked
                    ? ' transform translate-x-full'
                    : ' transform xxs:-translate-x-1'
                  // .concat(' md:-translate-x-1')
                )}
            ></div>
          </div>
          {/* <div className='ml-3 text-gray-700 font-medium'>Toggle Me!</div> */}
        </label>
      </div>
    </React.Fragment>
  );
};

export default ToggleButton;
