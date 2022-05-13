import { isFunction, isInteger } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import { isNumber, round } from 'lodash';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

const InputNumberWithoutArrows = styled.input.attrs({ type: 'number' })`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const CounterInput = function ({
  min: minVal,
  max: maxVal,
  defaultValue,
  valueOnChange,
  inputWidth,
  isFloat = false,
  fractionDigits = 2,
  ...props
}) {
  const {} = props;

  const [value, setValue] = useState(isNumber(defaultValue) ? defaultValue : 0);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const increment = function () {
    let newVal = 0;
    let hasMax = isNumber(max) ? true : false;
    let currValue = isFloat
      ? parseFloat(value) + parseFloat(1)
      : parseInt(value) + parseInt(1);

    if (hasMax) {
      if (currValue <= max) {
        newVal = currValue;
      } else {
        newVal = max;
      }
    } else {
      newVal = currValue;
    }

    if (isFloat) {
      setValue(round(newVal, fractionDigits));
      if (isFunction(valueOnChange)) {
        valueOnChange({ value: round(newVal, fractionDigits) });
      }
    } else {
      setValue(newVal);
      if (isFunction(valueOnChange)) {
        valueOnChange({ value: newVal });
      }
    }
  };

  const decrement = async function () {
    let newVal = 0;
    let hasMin = isNumber(min) ? true : false;
    let currValue = isFloat
      ? parseFloat(value) - parseFloat(1)
      : parseInt(value) - parseInt(1);

    if (hasMin) {
      if (currValue >= min) {
        newVal = currValue;
      } else {
        newVal = min;
      }
    } else {
      newVal = currValue;
    }

    if (isFloat) {
      setValue(round(newVal, fractionDigits));
      if (isFunction(valueOnChange)) {
        valueOnChange({ value: round(newVal, fractionDigits) });
      }
    } else {
      setValue(newVal);
      if (isFunction(valueOnChange)) {
        valueOnChange({ value: newVal });
      }
    }
  };

  const inputChange = function (currVal) {
    let newVal = NaN;
    let hasMin = isNumber(min) ? true : false;
    let hasMax = isNumber(max) ? true : false;

    if (hasMin) {
      if (currVal > min) {
        newVal = currVal;
      }
    } else {
      newVal = currVal;
    }

    if (hasMax) {
      if (currVal < max) {
        newVal = currVal;
      }
    } else {
      newVal = currVal;
    }

    setValue(newVal);
    // if (typeof valueOnChange !== 'undefined') {
    //   valueOnChange({ value: newVal });
    // }
  };

  const inputBlur = function (currVal) {
    let newVal = currVal;
    let hasMin = isNumber(min) ? true : false;
    let hasMax = isNumber(max) ? true : false;

    if (Number.isNaN(newVal) || typeof newVal === 'undefined') {
      newVal = 0;
    }

    if (hasMin) {
      if (newVal < min || Number.isNaN(newVal)) {
        newVal = min;
      }
    } else {
      newVal = newVal;
    }

    if (hasMax) {
      if (newVal !== min && (newVal > max || Number.isNaN(newVal))) {
        newVal = max;
      }
    } else {
      newVal = newVal;
    }

    setValue(newVal);
    if (isFunction(valueOnChange)) {
      valueOnChange({ value: newVal });
    }
  };

  // useEffect(
  //   function () {
  //     if (isInteger(defaultValue) && (isInteger(min) || isInteger(max))) {
  //       inputBlur(defaultValue);
  //     }
  //   },
  //   [defaultValue, min, max]
  // );
  // useEffect(
  //   function () {
  //     if (isNumber(defaultValue)) {
  //       setValue(defaultValue);
  //     }
  //   },
  //   [defaultValue]
  // );

  useEffect(
    function () {
      if (typeof minVal !== 'undefined') {
        setMin(minVal);
      } else {
        setMin(null);
      }
    },
    [minVal]
  );

  useEffect(
    function () {
      if (typeof maxVal !== 'undefined') {
        setMax(maxVal);
      } else {
        setMax(null);
      }
    },
    [maxVal]
  );

  // console.info('value', value);

  return (
    <div className='flex'>
      <div
        className={`relative flex flex-row h-full w-full`
          .concat(` bg-white rounded-full`)
          .concat(` border-1 border-default z-0`)}
      >
        <button
          // data-action='decrement'
          className={`flex items-center justify-center`
            .concat(` cursor-pointer outline-none py-1 px-1.5`)
            .concat(` rounded-l-full hover:shadow flex-none`)
            .concat(` z-1`)}
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            decrement();
          }}
        >
          <ReactSVG
            src={SvgIcon['minus-small']}
            className={`w-4 h-4 fill-dark`}
          />
        </button>
        <InputNumberWithoutArrows
          className={`text-center font-bold text-sm`
            .concat(` py-1.5 z-0`)
            .concat(' outline-none border-none')
            .concat(' focus:shadow-inner focus:ring-0')
            .concat(stringIsNotEmpty(inputWidth) ? ` ${inputWidth}` : ` w-16`)}
          step={1}
          min={isNumber(min) ? min : null}
          max={isNumber(max) ? max : null}
          value={value.toString()}
          onChange={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            // console.info('input', evt?.target?.value);
            if (isFloat) {
              // const value = parseFloat(evt?.target?.value).toPrecision(
              //   fractionDigits
              // );
              inputChange(evt?.target?.value);
            } else {
              inputChange(parseInt(evt?.target?.value));
            }
          }}
          onBlur={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            // console.info('input', evt?.target?.value);
            if (isFloat) {
              const value = round(
                parseFloat(evt?.target?.value),
                fractionDigits
              );
              inputBlur(value);
            } else {
              inputBlur(parseInt(evt?.target?.value));
            }
          }}
        />
        <button
          // data-action='decrement'
          className={`flex items-center justify-center`
            .concat(` cursor-pointer outline-none py-1 px-1.5`)
            .concat(` rounded-r-full hover:shadow flex-none`)
            .concat(` z-1 ml-auto`)}
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            increment();
          }}
        >
          <ReactSVG
            src={SvgIcon['plus-small']}
            className={`w-4 h-4 fill-dark`}
          />
        </button>
      </div>
    </div>
  );
};

export default CounterInput;
