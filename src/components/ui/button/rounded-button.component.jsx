import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import { ButtonSize, ButtonType } from './button.enum';

const RoundedButton = function ({
  btnType: userDefinedType,
  size: userDefinedSize,
  bold,
  disabled: userDefinedDisabled,
  onClick: btnOnClick,
  payload,
  text,
  LeftIcon,
  RightIcon,
  roundedFull: userDefindedRoundedFull,
  ...props
}) {
  const [size, setSize] = useState(null);
  const [padding, setPadding] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [borderWidth, setBorderWidth] = useState(null);
  const [fontBold, setFontBold] = useState(null);
  const [type, setType] = useState(null);
  const [bgColor, setBgColor] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const [borderColor, setBorderColor] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [rounded, setRounded] = useState(null);

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefinedSize)) {
        setSize(userDefinedSize);
      } else {
        setSize(ButtonSize.regular);
      }
    },
    [userDefinedSize]
  );
  useEffect(
    function () {
      if (stringIsNotEmpty(size)) {
        switch (size) {
          case ButtonSize.small:
            setPadding('py-1 px-3.5');
            setFontSize('text-sm');
            setBorderWidth('border-1');
            break;
          case ButtonSize.regular:
            setPadding('py-1.5 px-5');
            setFontSize('text-base');
            setBorderWidth('border-2');
            break;
          case ButtonSize.large:
            setPadding('py-2 px-8');
            setFontSize('text-2xl');
            setBorderWidth('border-2.5');
            break;
          default:
            setPadding('py-1.5 px-5');
            setFontSize('text-base');
            setBorderWidth('border-2');
        }
      }
    },
    [size]
  );

  useEffect(
    function () {
      if (bold) {
        setFontBold('font-semibold');
      } else {
        setFontBold('font-medium');
      }
    },
    [bold]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefinedType)) {
        setType(userDefinedType);
      } else {
        setType(ButtonType.default);
      }
    },
    [userDefinedType]
  );
  useEffect(
    function () {
      if (stringIsNotEmpty(type)) {
        switch (type) {
          case ButtonType.primary:
            setBgColor('bg-blue-500');
            setTextColor('text-white');
            setBorderColor('border-transparent');
            break;
          case ButtonType.warning:
            setBgColor('bg-orange-500');
            setTextColor('text-white');
            setBorderColor('border-transparent');
            break;
          case ButtonType.danger:
            setBgColor('bg-red-600');
            setTextColor('text-white');
            setBorderColor('border-transparent');
            break;
          case ButtonType.success:
            setBgColor('bg-green-500');
            setTextColor('text-white');
            setBorderColor('border-transparent');
            break;
          case ButtonType.secondary:
            setBgColor('bg-gray-200');
            setTextColor('text-dark');
            setBorderColor('border-transparent');
            break;
          default:
            setBgColor('bg-white');
            setTextColor('text-dark');
            setBorderColor('border-gray-200');
        }
      }
    },
    [type]
  );

  useEffect(
    function () {
      if (userDefindedRoundedFull) {
        setRounded('rounded-full');
      } else {
        setRounded('rounded-md');
      }
    },
    [userDefindedRoundedFull]
  );

  useEffect(
    function () {
      if (
        typeof userDefinedDisabled === 'boolean' &&
        userDefinedDisabled === true
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    },
    [userDefinedDisabled]
  );

  return (
    <React.Fragment>
      <button
        className={'flex justify-center items-center'
          .concat(rounded ? ` ${rounded}` : '')
          .concat(padding ? ` ${padding}` : '')
          .concat(bgColor ? ` ${bgColor}` : '')
          .concat(borderWidth ? ` ${borderWidth}` : '')
          .concat(borderColor ? ` ${borderColor}` : '')
          .concat(
            disabled
              ? ' bg-opacity-50 cursor-not-allowed'
              : ' hover:shadow-md hover:bg-opacity-90'
          )}
        disabled={disabled}
        onClick={function (evt) {
          evt?.preventDefault();
          evt?.stopPropagation();
          if (isFunction(btnOnClick)) {
            btnOnClick({ ...payload });
          }
        }}
        {...props}
      >
        {typeof LeftIcon !== 'undefined' && <LeftIcon />}
        {stringIsNotEmpty(text) && (
          <p
            className={'leading-snug'
              .concat(fontSize ? ` ${fontSize}` : '')
              .concat(fontBold ? ` ${fontBold}` : '')
              .concat(textColor ? ` ${textColor}` : '')}
          >
            {text}
          </p>
        )}
        {typeof RightIcon !== 'undefined' && <RightIcon />}
      </button>
    </React.Fragment>
  );
};

export default RoundedButton;

// Usage example:
{
  /* <RoundedButton
  bold
  size={ButtonSize.small}
  type={ButtonType.danger}
  onClick={btnOnClick}
  text={'Hoan thanh'}
  LeftIcon={function () {
    return (
      <ReactSVG
        className='w-5 fill-white mr-2'
        src='/assets/flaticon/regular/fi-rr-add.svg'
      />
    );
  }}
  RightIcon={function () {
    return (
      <ReactSVG
        className='w-6 fill-white ml-5'
        src='/assets/flaticon/regular/fi-rr-add.svg'
      />
    );
  }}
/>; */
}
