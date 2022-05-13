import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import { InputSize, InputState, InputTextPosition } from './input.enum';
import Select from 'react-select';

const InputSelect = function ({
  inputState: userDefined_InputState,
  disabled: userDefined_Disabled,
  size: userDefined_Size,
  inputBold: userDefined_InputBold,
  textPosition: userDefined_TextPosition,
  placeholder: userDefined_Placeholder,
  onChange: userDefined_OnChange,
  defaultValue: userDefined_DefaultValue,
  options: userDefined_Options,
  searchBoxId,
  ...props
}) {
  const [inputVal, setInputVal] = useState(null);
  const [textPosition, setTextPosition] = useState(null);
  const [inputBorderColor, setInputBorderColor] = useState(null);
  const [inputBgColor, setInputBgColor] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const [focusInputBorderColor, setFocusInputBorderColor] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [padding, setPadding] = useState(null);
  const [disabled, setDisabled] = useState(null);

  const inputOnChange = function (option) {
    setInputVal(option);
    if (isFunction(userDefined_OnChange)) {
      userDefined_OnChange({ selected: { ...option } });
    }
  };

  useEffect(
    function () {
      if (objectIsNotEmpty(userDefined_DefaultValue)) {
        setInputVal(userDefined_DefaultValue);
      } else {
        setInputVal(null);
      }
    },
    [userDefined_DefaultValue]
  );

  useEffect(
    function () {
      switch (userDefined_InputState) {
        case InputState.warning:
          setInputBgColor('bg-white');
          setInputBorderColor('border-amber-400');
          setFocusInputBorderColor('focus-within:border-amber-400');
          setTextColor('text-amber-500');
          break;
        case InputState.danger:
          setInputBgColor('bg-white');
          setInputBorderColor('border-red-400');
          setFocusInputBorderColor('focus-within:border-red-400');
          setTextColor('text-red-500');
          break;
        case InputState.disabled:
          setInputBgColor('bg-stone-200');
          setInputBorderColor('border-zinc-300');
          setFocusInputBorderColor('focus-within:border-zinc-300');
          setTextColor('text-zinc-700');
          break;
        default:
          setInputBgColor('bg-white');
          setInputBorderColor('border-zinc-300');
          setFocusInputBorderColor('focus-within:border-sky-300');
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
          setPadding('py-3 px-4');
          break;
        case InputSize.small:
          setFontSize('text-sm');
          setPadding('py-1 px-2');
          break;
        default:
          setFontSize('text-base');
          setPadding('py-2 px-3');
      }
    },
    [userDefined_Size]
  );

  useEffect(function () {
    const selectUomSearchInput = document.getElementById(searchBoxId);
    if (objectIsNotEmpty(selectUomSearchInput)) {
      selectUomSearchInput.style.boxShadow = 'none';
    }
  }, []);

  return (
    <React.Fragment>
      <Select
        inputId={searchBoxId}
        noOptionsMessage={() => {
          return `Danh sách rỗng`;
        }}
        value={inputVal}
        isDisabled={disabled}
        options={
          arrayIsNotEmpty(userDefined_Options) ? userDefined_Options : []
        }
        placeholder={
          stringIsNotEmpty(userDefined_Placeholder)
            ? userDefined_Placeholder
            : ''
        }
        onChange={inputOnChange}
        onSubmit={() => validate()}
        className={'leading-tight appearance-none w-full '
          .concat(' border-1.5 rounded-md outline-none')
          // .concat(' placeholder-zinc-400 focus:placeholder-zinc-300 focus-within:text-dark')
          .concat(' focus-within:border-2')
          .concat(textColor ? ` ${textColor}` : '')
          .concat(inputBgColor ? ` ${inputBgColor}` : '')
          .concat(inputBorderColor ? ` ${inputBorderColor}` : '')
          .concat(fontSize ? ` ${fontSize}` : '')
          .concat(!disabled ? ' hover:shadow' : '')
          .concat(
            !disabled
              ? ' focus-within:shadow-md focus-within:ring-0'.concat(
                  focusInputBorderColor ? ` ${focusInputBorderColor}` : ''
                )
              : ''
          )
          .concat(disabled ? ' cursor-not-allowed' : '')}
        styles={{
          control: function (styles, actions) {
            return {
              ...styles,
              border: '0px',
              borderRadius: '0.375rem',
              boxShadow: '0',
              padding: '0px',
              margin: '0px',
              minHeight: '0px',
              outline: '2px solid transparent',
              outlineOffset: '2px',
              appearance: 'none',
              backgroundColor: 'transparent',
            };
          },
          valueContainer: function (styles, actions) {
            return {
              ...styles,
              border: '0px',
              boxShadow: '0',
              padding: '0 0.5rem',
              margin: '0px',
              minHeight: '0px',
              outline: '0px solid transparent',
              outlineOffset: '0px',
              appearance: 'none',
              backgroundColor: 'transparent',
            };
          },
          input: function (styles, actions) {
            return {
              ...styles,
              color: 'rgba(13,27,30,1)',
            };
          },
          singleValue: function (styles, actions) {
            return {
              ...styles,
              color: 'rgba(13,27,30,1)',
              // color: 'rgba(37,99,235,1)',
            };
          },
          placeholder: function (styles, actions) {
            return {
              ...styles,
              color: actions?.isFocused
                ? 'rgba(212,212,216,1)'
                : 'rgba(161,161,170,1)',
            };
          },
          option: function (styles, actions) {
            return { ...styles };
          },
          menu: function (styles, options) {
            return {
              ...styles,
            };
          },
          menuList: function (styles, options) {
            return {
              ...styles,
              maxHeight: '12rem',
            };
          },
        }}
      />
    </React.Fragment>
  );
};

export default InputSelect;
