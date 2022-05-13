import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';

const GenderSelect = function ({
  options = [],
  defaultCheckedOptionIndex,
  onOptionChange,
  ...props
}) {
  const [prevSelectedItemIndex, setPrevSelectedItemIndex] = useState(
    defaultCheckedOptionIndex
  );
  const [optionList, setOptionList] = useState([]);

  const optionOnClick = function ({ index, optionData }) {
    // console.info(`radio ${index}`, { index, optionItem });
    // console.info(`optionList[${index}]`, optionList[index]);
    // console.info(
    //   `optionList[${prevSelectedItemIndex}]`,
    //   optionList[prevSelectedItemIndex]
    // );

    if (prevSelectedItemIndex !== index) {
      const updatedOptionList = [...optionList];
      updatedOptionList[index].active = true;
      updatedOptionList[prevSelectedItemIndex].active = false;
      setOptionList([...updatedOptionList]);
      setPrevSelectedItemIndex(index);
      if (isFunction(onOptionChange)) {
        onOptionChange({ index, optionData: optionData });
      }
      setTimeout(function () {}, 100);
    }
  };

  useEffect(
    function () {
      if (arrayIsNotEmpty(options)) {
        setPrevSelectedItemIndex(defaultCheckedOptionIndex);
        setOptionList(
          [...options].map(function (option, index) {
            const optionItemData = {};
            if (index == defaultCheckedOptionIndex) {
              optionItemData.active = true;
              optionItemData.id = option?.id;
              optionItemData.label = option?.label;
            } else {
              optionItemData.active = false;
              optionItemData.id = option?.id;
              optionItemData.label = option?.label;
            }
            return optionItemData;
          })
        );
      }
    },
    [options, defaultCheckedOptionIndex]
  );

  //   console.info('optionList', optionList);

  return (
    <React.Fragment>
      <div className='flex space-x-4 items-center'>
        {optionList.map(function (option, index) {
          return (
            <React.Fragment key={index}>
              <OptionItem
                index={index}
                optionData={option}
                optionOnClick={optionOnClick}
              />
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};
export default GenderSelect;

const OptionItem = function ({ index, optionData, optionOnClick, ...props }) {
  const [checked, setChecked] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(
    function () {
      if (objectIsNotEmpty(optionData)) {
        setChecked(optionData?.active);
        setLabel(optionData?.label);
      }
    },
    [optionData]
  );

  return (
    <div
      className={'flex space-x-2 cursor-pointer'}
      onClick={function (evt) {
        evt?.stopPropagation();
        evt?.preventDefault();
        optionOnClick({ index, optionData: optionData });
      }}
    >
      <div
        className={'flex flex-none'
          .concat(' items-center justify-center')
          .concat(' rounded w-5 h-5')
          .concat(' hover:shadow border-1.5')
          .concat(checked ? ' bg-sky-400' : ' bg-white')
          .concat(checked ? ' border-transparent' : ' border-gray-200')}
      >
        <ReactSVG
          src={SvgIcon['check']}
          className={'w-3.5 h-3.5'.concat(
            checked ? ' fill-white' : ' fill-transparent'
          )}
        />
      </div>
      <p className='text-zinc-700 text-base leading-5'>{label}</p>
    </div>
  );
};
