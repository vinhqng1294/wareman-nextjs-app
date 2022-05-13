import {
  isBoolean,
  isFunction,
  isObject,
  isString,
} from '@/utils/commons/checkVariableType.utils';
import {
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { CheckboxSize } from './checkbox.enum';

const Checkbox = function ({
  checkboxId: userDefined_CheckboxId,
  bgColor: userDefined_BgColor,
  size: userDefined_Size,
  label: userDefined_Label,
  labelColor: userDefined_LabelColor,
  labelFontSize: userDefined_LabelFontSize,
  spaceX: userDefined_SpaceX,
  onChange: userDefined_OnChange,
  checked: userDefined_Checked,
  ...props
}) {
  const [checkboxId, setCheckboxId] = useState(null);
  const [bgColor, setBgColor] = useState(null);
  const [size, setSize] = useState(null);
  const [checkboxSize, setCheckboxSize] = useState(null);
  const [label, setLabel] = useState(null);
  const [labelColor, setLabelColor] = useState(null);
  const [labelFontSize, setLabelFontSize] = useState(null);
  const [spaceX, setSpaceX] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const checkboxOnChange = function (evt) {
    setIsChecked(evt?.target?.checked);
    if (isFunction(userDefined_OnChange)) {
      userDefined_OnChange({ checked: evt?.target?.checked, evt: evt });
    }
  };

  useEffect(
    function () {
      if (userDefined_Checked) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    },
    [userDefined_Checked]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_CheckboxId)) {
        setCheckboxId(userDefined_CheckboxId);
      } else {
        setCheckboxId(null);
      }
    },
    [userDefined_CheckboxId]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_BgColor)) {
        setBgColor(userDefined_BgColor);
      } else {
        setBgColor('checked:bg-sky-400');
      }
    },
    [userDefined_BgColor]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_Size)) {
        setSize(userDefined_Size);
      } else {
        setSize(CheckboxSize.regular);
      }
    },
    [userDefined_Size]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(size)) {
        switch (size) {
          case CheckboxSize.small:
            setCheckboxSize('w-3 h-3');
            break;
          case CheckboxSize.large:
            setCheckboxSize('w-5 h-5');
            break;
          default:
            setCheckboxSize('w-4 h-4');
        }
      }
    },
    [size]
  );

  useEffect(
    function () {
      if (
        stringIsNotEmpty(userDefined_Label) ||
        objectIsNotNull(userDefined_Label)
      ) {
        setLabel(userDefined_Label);
      } else {
        setLabel(null);
      }
    },
    [userDefined_Label]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_LabelColor)) {
        setLabelColor(userDefined_LabelColor);
      } else {
        setLabelColor('text-dark');
      }
    },
    [userDefined_LabelColor]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_LabelFontSize)) {
        setLabelFontSize(userDefined_LabelFontSize);
      } else {
        setLabelFontSize('text-sm leading-4');
      }
    },
    [userDefined_LabelFontSize]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_SpaceX)) {
        setSpaceX(userDefined_SpaceX);
      } else {
        setSpaceX('space-x-3');
      }
    },
    [userDefined_SpaceX]
  );

  return (
    <React.Fragment>
      <div className={'flex items-center'.concat(spaceX ? ` ${spaceX}` : '')}>
        <div className='flex items-center'>
          <input
            id={checkboxId}
            type='checkbox'
            className={'rounded bg-gray-50 outline-none'
              .concat(' border border-gray-300')
              .concat(' focus:ring-0 focus:ring-blue-300')
              .concat(' hover:shadow-md')
              .concat(checkboxSize ? ` ${checkboxSize}` : '')
              .concat(bgColor ? ` ${bgColor}` : '')}
            checked={isChecked}
            onChange={checkboxOnChange}
          />
        </div>
        <div className='flex items-center'>
          {isString(label) && (
            <p
              className={''
                .concat(labelColor ? ` ${labelColor}` : '')
                .concat(labelFontSize ? ` ${labelFontSize}` : '')}
            >
              {label}
            </p>
          )}
          {isObject(label) && label}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkbox;

// Usage example

// <Checkbox
//   label={function ({ ...props }) {
//     return (
//       <p className='text-sm leading-4 text-dark space-x-1 w-28'>
//         <span>Agree with dasd sad ada asd asdasd ada ad ad</span>
//         <span className='text-blue-400'>terms</span>
//       </p>
//     );
//   }}
// />;
