import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import Tooltip from '../tooltip/tooltip.component';
import {
  InputLabelPosition,
  InputSize,
  InputState,
  InputTextPosition,
  LabelSize,
} from './input.enum';

const InputText = function ({
  labelBold: userDefined_LabelBold,
  labelColor: userDefined_LabelColor,
  labelSize: userDefined_LabelSize,
  labelPosition: userDefined_LabelPosition,
  label: userDefined_Label,
  inputState: userDefined_InputState,
  disabled: userDefined_Disabled,
  size: userDefined_Size,
  inputBold: userDefined_InputBold,
  textPosition: userDefined_TextPosition,
  placeholder: userDefined_Placeholder,
  helpText: userDefined_HelpText,
  helpTooltipId: userDefined_HelpTooltipId,
  helpIconColor: userDefined_HelpIconColor,
  helpTooltipColor: userDefined_HelpTooltipColor,
  errorTooltipId: userDefined_ErrorTooltipId,
  errorText: userDefined_ErrorText,
  onChange: userDefined_OnChange,
  defaultText: userDefined_DefaultText,
  ...props
}) {
  const [labelBold, setLabelBold] = useState(null);
  const [labelColor, setLabelColor] = useState(null);
  const [labelSize, setLabelSize] = useState(null);
  const [labelFontSize, setLabelFontSize] = useState(null);
  const [labelPosition, setLabelPosition] = useState(null);
  const [label, setLabel] = useState(null);

  const [inputState, setInputState] = useState(null);
  const [inputBorderColor, setInputBorderColor] = useState(null);
  const [inputBgColor, setInputBgColor] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const [disabled, setDisabled] = useState(null);

  const [size, setSize] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [padding, setPadding] = useState(null);
  const [gapLabelInput, setGapLabelInput] = useState(null);
  const [inputBold, setInputBold] = useState(null);

  const [textPosition, setTextPosition] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const [helpText, setHelpText] = useState(null);
  const [helpIconSize, setHelpIconSize] = useState(null);
  const [helpIconColor, setHelpIconColor] = useState(null);

  const [helpIconPadding, setHelpIconPadding] = useState(null);
  const [inputStateIconSrc, setInputStateIconSrc] = useState(null);
  const [inputStateIconColor, setInputStateIconColor] = useState(null);
  const [inputStateIconPadding, setInputStateIconPadding] = useState(null);
  const [inputStateIconSize, setInputStateIconSize] = useState(null);

  const [focusInputBorderColor, setFocusInputBorderColor] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [helpTooltipColor, setHelpTooltipColor] = useState(null);

  const [inputVal, setInputVal] = useState('');

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
      if (userDefined_LabelBold) {
        setLabelBold(true);
      } else {
        setLabelBold(false);
      }
    },
    [userDefined_LabelBold]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_LabelColor)) {
        setLabelColor(userDefined_LabelColor);
      } else {
        setLabelColor('text-neutral-500');
      }
    },
    [userDefined_LabelColor]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_HelpIconColor)) {
        setHelpIconColor(userDefined_HelpIconColor);
      } else {
        setHelpIconColor('fill-neutral-500');
      }
    },
    [userDefined_HelpIconColor]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_HelpTooltipColor)) {
        setHelpTooltipColor(userDefined_HelpTooltipColor);
      } else {
        setHelpTooltipColor('bg-neutral-500');
      }
    },
    [userDefined_HelpTooltipColor]
  );

  useEffect(
    function () {
      if (size === null) {
        return;
      }
      if (stringIsNotEmpty(userDefined_LabelSize)) {
        setLabelSize(userDefined_LabelSize);
      } else {
        setLabelSize(LabelSize.regular);
      }
    },
    [size, userDefined_LabelSize]
  );
  useEffect(
    function () {
      if (stringIsNotEmpty(labelSize)) {
        switch (labelSize) {
          case LabelSize.large:
            setLabelFontSize('text-lg'); // 18
            setHelpIconSize('w-4 h-4');
            setHelpIconPadding('space-x-2.5');
            break;
          case LabelSize.small:
            setLabelFontSize('text-sm'); // 14
            setHelpIconSize('w-3 h-3');
            setHelpIconPadding('space-x-1.5');
            break;
          default:
            setLabelFontSize('text-base'); // 16
            setHelpIconSize('w-3.5 h-3.5');
            setHelpIconPadding('space-x-2');
        }
      }
    },
    [labelSize]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_LabelPosition)) {
        switch (userDefined_LabelPosition) {
          case InputLabelPosition.right:
            setLabelPosition('text-right');
            break;
          case InputLabelPosition.center:
            setLabelPosition('text-center');
            break;
          case InputLabelPosition.justify:
            setLabelPosition('text-justify');
            break;
          default:
            setLabelPosition(null);
        }
      } else {
        setLabelPosition(null);
      }
    },
    [userDefined_LabelPosition]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_Label)) {
        setLabel(userDefined_Label);
      } else {
        setLabel(null);
      }
    },
    [userDefined_Label]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_InputState)) {
        setInputState(userDefined_InputState);
      } else {
        setInputState(InputState.default);
      }
    },
    [userDefined_InputState]
  );
  useEffect(
    function () {
      if (stringIsNotEmpty(inputState)) {
        switch (inputState) {
          case InputState.warning:
            setInputBgColor('bg-white');
            setInputBorderColor('border-amber-400');
            setFocusInputBorderColor('focus:border-amber-400');
            setTextColor('text-amber-500');
            setInputStateIconColor(null);
            setInputStateIconSrc(null);
            break;
          case InputState.danger:
            setInputBgColor('bg-white');
            setInputBorderColor('border-red-400');
            setFocusInputBorderColor('focus:border-red-400');
            setTextColor('text-red-500');
            setInputStateIconColor('fill-red-500');
            setInputStateIconSrc(
              '/assets/flaticon/solid/fi-sr-exclamation.svg'
            );
            break;
          case InputState.disabled:
            setInputBgColor('bg-stone-200');
            setInputBorderColor('border-zinc-300');
            setFocusInputBorderColor('focus:border-zinc-300');
            setTextColor('text-zinc-700');
            setInputStateIconColor(null);
            setInputStateIconSrc(null);
            break;
          default:
            setInputBgColor('bg-white');
            setInputBorderColor('border-zinc-300');
            setFocusInputBorderColor('focus:border-sky-300');
            setTextColor('text-zinc-500');
            setInputStateIconColor(null);
            setInputStateIconSrc(null);
        }
      }
    },
    [inputState]
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
      if (stringIsNotEmpty(userDefined_Size)) {
        setSize(userDefined_Size);
      } else {
        setSize(InputSize.regular);
      }
    },
    [userDefined_Size]
  );
  useEffect(
    function () {
      if (stringIsNotEmpty(size)) {
        switch (size) {
          case InputSize.large:
            setFontSize('text-lg');
            setGapLabelInput('space-y-2');
            setInputStateIconPadding('px-4');
            setInputStateIconSize('w-4 h-4');
            if (inputState === InputState.danger) {
              setPadding('py-3 pl-4 pr-12');
            } else {
              setPadding('py-3 px-4');
            }
            break;
          case InputSize.small:
            setFontSize('text-sm');
            setGapLabelInput('space-y-0');
            setInputStateIconPadding('px-2');
            setInputStateIconSize('w-3 h-3');
            if (inputState === InputState.danger) {
              setPadding('py-1 pl-2 pr-7');
            } else {
              setPadding('py-1 px-2');
            }
            break;
          default:
            setFontSize('text-base');
            setGapLabelInput('space-y-1.5');
            setInputStateIconPadding('px-3');
            setInputStateIconSize('w-3.5 h-3.5');
            if (inputState === InputState.danger) {
              setPadding('py-2 pl-3 pr-9');
            } else {
              setPadding('py-2 px-3');
            }
        }
      }
    },
    [size, inputState]
  );

  useEffect(
    function () {
      if (userDefined_InputBold) {
        setInputBold(true);
      } else {
        setInputBold(false);
      }
    },
    [userDefined_InputBold]
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
      if (stringIsNotEmpty(userDefined_Placeholder)) {
        setPlaceholder(userDefined_Placeholder);
      } else {
        setPlaceholder('');
      }
    },
    [userDefined_Placeholder]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_HelpText)) {
        setHelpText(userDefined_HelpText);
      } else {
        setHelpText(null);
      }
    },
    [userDefined_HelpText]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_ErrorText)) {
        setErrorText(userDefined_ErrorText);
      } else {
        setErrorText(null);
      }
    },
    [userDefined_ErrorText]
  );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col w-full'.concat(
          gapLabelInput ? ` ${gapLabelInput}` : ''
        )}
      >
        {label && (
          <div className={'flex flex-col'}>
            <div
              className={'flex items-center'.concat(
                helpIconPadding ? ` ${helpIconPadding}` : ''
              )}
            >
              <p
                className={'leading-snug'
                  .concat(labelBold ? ' font-semibold' : '')
                  .concat(labelColor ? ` ${labelColor}` : '')
                  .concat(labelFontSize ? ` ${labelFontSize}` : '')
                  .concat(labelPosition ? ` ${labelPosition}` : '')}
              >
                {label}
              </p>
              <React.Fragment>
                <button
                  className={''.concat(
                    helpText && stringIsNotEmpty(userDefined_HelpTooltipId)
                      ? ' flex'
                      : ' hidden'
                  )}
                  data-tooltip-target={userDefined_HelpTooltipId}
                  data-tooltip-trigger='hover'
                  // data-tooltip-placement='right'
                  type='button'
                >
                  <ReactSVG
                    src={'/assets/flaticon/solid/fi-sr-interrogation.svg'}
                    className={'cursor-pointer'
                      .concat(helpIconSize ? ` ${helpIconSize}` : '')
                      .concat(helpIconColor ? ` ${helpIconColor}` : '')}
                  />
                </button>
                <Tooltip
                  id={userDefined_HelpTooltipId}
                  content={helpText}
                  textColor={'text-white'}
                  bgColor={helpTooltipColor}
                  fontSize={'text-xs'}
                />
              </React.Fragment>
            </div>
          </div>
        )}
        <div className='flex flex-col relative'>
          <React.Fragment>
            <div
              className={'items-center justify-center h-full'
                .concat(' absolute top-0 right-0 z-1')
                .concat(inputState === InputState.danger ? ' flex' : ' hidden')
                .concat(
                  inputStateIconPadding ? ` ${inputStateIconPadding}` : ''
                )}
            >
              <button
                className='flex'
                data-tooltip-target={userDefined_ErrorTooltipId}
                data-tooltip-trigger='hover'
                // data-tooltip-placement='right'
                type='button'
              >
                <ReactSVG
                  src={inputStateIconSrc ? inputStateIconSrc : ''}
                  className={''
                    .concat(
                      inputStateIconColor ? ` ${inputStateIconColor}` : ''
                    )
                    .concat(inputStateIconSize ? ` ${inputStateIconSize}` : '')}
                />
              </button>
            </div>
            {errorText && stringIsNotEmpty(userDefined_ErrorTooltipId) && (
              <Tooltip
                id={userDefined_ErrorTooltipId}
                bgColor={'bg-red-600'}
                textColor={'text-white'}
                content={errorText}
                // bold
                fontSize={'text-xs'}
              />
            )}
          </React.Fragment>
          <input
            className={'leading-tight appearance-none w-full'
              .concat(' border-1.5 rounded-md outline-none')
              .concat(' placeholder-zinc-400 focus:placeholder-zinc-300')
              .concat(' focus:text-dark focus:border-2')
              .concat(inputBold ? ` font-semibold` : '')
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
            placeholder={placeholder}
            disabled={disabled}
            value={inputVal}
            onChange={inputOnChange}
            {...props}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default InputText;

// Usage example
{
  /* <InputText
  labelBold
  labelFontSize={'text-base'}
  labelColor={'text-red-400'}
  labelPosition={InputLabelPosition.center}
  label={'Label'}
  inputState={InputState.disabled}
  size={InputSize.small}
  inputBold
  textPosition={InputTextPosition.right}
  placeholder={'eg. abc'}
/>
<InputText
  labelBold
  labelFontSize={'text-base'}
  labelColor={'text-red-400'}
  label={'Label'}
  inputState={InputState.disabled}
  disabled
  placeholder={'eg. abc'}
  id={'name'}
  name={'name'}
/> */
}

{
  /* <InputText
  labelBold
  // labelColor={'text-blue-400'}
  // helpIconColor={'fill-blue-400'}
  // labelPosition={InputLabelPosition.center}
  label={'Label'}
  inputState={InputState.danger}
  // size={InputSize.regular}
  inputBold
  // textPosition={InputTextPosition.right}
  placeholder={'eg. abc'}
  helpText={
    'You can use any value defined in your opacity scale, or use arbitrary values if you need to deviate from your design tokens.'
  }
  helpTooltipId={'tooltip1'}
  labelSize={LabelSize.small}
  errorTooltipId={'name-error'}
  errorText={
    'You can use any value defined in your opacity scale, or use arbitrary values if you need to deviate from your design tokens.'
  }
/>; */
}
{
  /* <InputText
  labelBold
  // labelColor={'text-blue-400'}
  // helpIconColor={'fill-blue-400'}
  // labelPosition={InputLabelPosition.center}
  label={'Label'}
  inputState={isError ? InputState.danger : InputState.default}
  // size={InputSize.regular}
  inputBold
  // textPosition={InputTextPosition.right}
  placeholder={'eg. abc'}
  helpText={
    'You can use any value defined in your opacity scale, or use arbitrary values if you need to deviate from your design tokens.'
  }
  helpTooltipId={'tooltip1'}
  labelSize={LabelSize.small}
  errorTooltipId={'name-error'}
  errorText={
    'You can use any value defined in your opacity scale, or use arbitrary values if you need to deviate from your design tokens.'
  }
  defaultText={'hello'}
  onChange={inputChange}
/>; */
}
