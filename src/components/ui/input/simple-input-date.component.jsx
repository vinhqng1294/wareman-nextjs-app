import { isFunction, isInteger } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { InputSize, InputState, InputTextPosition } from './input.enum';

const InputDate = function ({
  inputState: userDefined_InputState,
  disabled: userDefined_Disabled,
  size: userDefined_Size,
  inputBold: userDefined_InputBold,
  textPosition: userDefined_TextPosition,
  placeholder: userDefined_Placeholder,
  onChange: userDefined_OnChange,
  defaultText: userDefined_DefaultText,
  rows: userDefined_Rows,
  ...props
}) {
  const [inputVal, setInputVal] = useState('');
  const [textPosition, setTextPosition] = useState(null);
  const [inputBorderColor, setInputBorderColor] = useState(null);
  const [inputBgColor, setInputBgColor] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const [focusInputBorderColor, setFocusInputBorderColor] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [padding, setPadding] = useState(null);
  const [disabled, setDisabled] = useState(null);

  const inputOnChange = function (evt) {
    setInputVal(evt?.target?.value);
    if (isFunction(userDefined_OnChange)) {
      userDefined_OnChange({ value: evt?.target?.value, evt: evt });
    }
  };

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_DefaultText)) {
        setInputVal(userDefined_DefaultText);
      } else {
        setInputVal('');
      }
    },
    [userDefined_DefaultText]
  );

  useEffect(
    function () {
      switch (userDefined_InputState) {
        case InputState.warning:
          setInputBgColor('bg-white');
          setInputBorderColor('border-amber-400');
          setFocusInputBorderColor('focus:border-amber-400');
          setTextColor('text-amber-500');
          break;
        case InputState.danger:
          setInputBgColor('bg-white');
          setInputBorderColor('border-red-400');
          setFocusInputBorderColor('focus:border-red-400');
          setTextColor('text-red-500');
          break;
        case InputState.disabled:
          setInputBgColor('bg-stone-200');
          setInputBorderColor('border-zinc-300');
          setFocusInputBorderColor('focus:border-zinc-300');
          setTextColor('text-zinc-700');
          break;
        default:
          setInputBgColor('bg-white');
          setInputBorderColor('border-zinc-300');
          setFocusInputBorderColor('focus:border-sky-300');
          setTextColor('text-zinc-500');
      }
    },
    [userDefined_InputState]
  );
  useEffect(
    function () {
      if (userDefined_Disabled) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    },
    [userDefined_Disabled]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_TextPosition)) {
        switch (userDefined_TextPosition) {
          case InputTextPosition.right:
            setTextPosition('text-right');
            break;
          case InputTextPosition.center:
            setTextPosition('text-center');
            break;
          case InputTextPosition.justify:
            setTextPosition('text-justify');
            break;
          default:
            setTextPosition(null);
        }
      } else {
        setTextPosition(null);
      }
    },
    [userDefined_TextPosition]
  );

  useEffect(
    function () {
      switch (userDefined_Size) {
        case InputSize.large:
          setFontSize('text-lg');
          setPadding('py-3 pr-3 pl-9');
          break;
        case InputSize.small:
          setFontSize('text-sm');
          setPadding('py-1 pr-3 pl-9');
          break;
        default:
          setFontSize('text-base');
          setPadding('py-2 pr-3 pl-9');
      }
    },
    [userDefined_Size]
  );

  useEffect(function () {
    require('tw-elements');
  }, []);

  return (
    <React.Fragment>
      <div
        className={'datepicker relative'.concat(' flex items-center')}
        data-mdb-toggle-button='false'
      >
        <ReactSVG
          src={SvgIcon['calendar-sr']}
          className={'fill-zinc-500 w-5 h-5'.concat(' absolute left-2.5')}
        />
        <input
          className={'leading-tight appearance-none w-full'
            .concat(' border-1.5 rounded-md outline-none')
            .concat(' placeholder-zinc-400 focus:placeholder-zinc-300')
            .concat(' focus:text-dark focus:border-2')
            .concat(userDefined_InputBold ? ` font-semibold` : '')
            .concat(textColor ? ` ${textColor}` : '')
            .concat(inputBgColor ? ` ${inputBgColor}` : '')
            .concat(inputBorderColor ? ` ${inputBorderColor}` : '')
            .concat(padding ? ` ${padding}` : '')
            .concat(fontSize ? ` ${fontSize}` : '')
            .concat(textPosition ? ` ${textPosition}` : '')
            .concat(!disabled ? ' hover:shadow' : '')
            .concat(
              !disabled
                ? ' focus:shadow-md focus:ring-0'.concat(
                    focusInputBorderColor ? ` ${focusInputBorderColor}` : ''
                  )
                : ''
            )
            .concat(disabled ? ' cursor-not-allowed' : '')}
          type='text'
          placeholder={
            stringIsNotEmpty(userDefined_Placeholder)
              ? userDefined_Placeholder
              : ''
          }
          disabled={disabled}
          defaultValue={inputVal}
          // onBlur={inputOnChange}
          onFocus={inputOnChange}
          data-mdb-toggle='datepicker'
          {...props}
        />
      </div>
    </React.Fragment>
  );
};

export default InputDate;
