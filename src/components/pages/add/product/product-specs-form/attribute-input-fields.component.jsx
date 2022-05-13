import { InputState } from '@/components/ui/input/input.enum';
import InputText from '@/components/ui/input/simple-input-text.component';
import InputTextArea from '@/components/ui/input/simple-input-textarea.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';

const AttributeInputFields = function ({
  index: compIndex,
  defaultValue,
  attrNameOnChange: default_attrNameOnChange,
  attrValueOnChange: default_attrValueOnChange,
  onItemRemove,
  ...props
}) {
  const inputFields = {
    attributeName: {
      label: 'Tên thuộc tính',
      placeholder: 'Kích thước',
      errorText: '',
    },
    attributeValue: {
      label: 'Mô tả thuộc tính',
      placeholder: '3,550 x 2,500 mm',
      errorText: '',
    },
  };
  const [attrData, setAttrData] = useState({
    attributeName: defaultValue?.attributeName ?? '',
    attributeValue: defaultValue?.attributeValue ?? '',
  });
  const [inputValidation, setInputValidation] = useState({
    attributeName: true,
    attributeValue: true,
  });

  const attrNameOnChange = function ({ value, evt }) {
    setAttrData({ ...attrData, attributeName: value });
    if (isFunction(default_attrNameOnChange)) {
      default_attrNameOnChange({ compIndex, value });
    }
  };
  const attrValueOnChange = function ({ value, evt }) {
    setAttrData({ ...attrData, attributeValue: value });
    if (isFunction(default_attrValueOnChange)) {
      default_attrValueOnChange({ compIndex, value });
    }
  };
  const onRemove = function () {
    if (isFunction(onItemRemove)) {
      onItemRemove({ compIndex });
    }
  };

  return (
    <React.Fragment>
      <div className='flex flex-col space-y-1.5'>
        <div className={'flex items-center space-x-4'}>
          <div
            className={'flex border-b border-neutral-300 w-8 flex-none'}
          ></div>
          <p className='text-xl font-bold text-sky-500 flex-none'>
            {compIndex + 1}
          </p>
          <div className={'flex border-b border-neutral-300 w-full'}></div>
          <button
            type='button'
            className={'flex items-center justify-center'
              .concat(' rounded-full')
              .concat(' bg-white')
              .concat(' w-6 h-6')
              .concat(' hover:shadow-md hover:border border-zinc-50')
              .concat(' flex-none')}
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              onRemove();
            }}
          >
            <ReactSVG
              src={SvgIcon['cross-circle']}
              className={'fill-red-500 w-5 h-5'}
            />
          </button>
        </div>
        <div className={'flex flex-col space-y-3'}>
          <div className='flex space-x-2'>
            <label
              className={'font-semibold leading-tight'
                .concat(' text-base text-dark')
                .concat(' border-y-1.5 border-transparent')
                .concat(' flex-none py-2 w-32')}
            >
              {inputFields?.attributeName?.label}
            </label>
            <InputText
              inputState={
                !inputValidation?.attributeName
                  ? InputState.danger
                  : InputState.default
              }
              placeholder={inputFields?.attributeName?.placeholder}
              defaultText={attrData?.attributeName}
              onChange={attrNameOnChange}
            />
            {!inputValidation?.attributeName &&
              stringIsNotEmpty(inputFields?.attributeName?.errorText) && (
                <div className='flex space-x-2 items-center mt-1.5'>
                  <ReactSVG
                    src={SvgIcon['exclamation-sr']}
                    className='w-5 h-5 fill-red-500 flex-none'
                  />
                  <p className='text-red-500 text-base'>
                    {inputFields?.name?.errorText}
                  </p>
                </div>
              )}
          </div>
          <div className='flex space-x-2'>
            <label
              className={'font-semibold leading-tight'
                .concat(' text-base text-dark')
                .concat(' border-y-1.5 border-transparent')
                .concat(' flex-none py-2 w-32')}
            >
              {inputFields?.attributeValue?.label}
            </label>
            <InputTextArea
              inputState={
                !inputValidation?.attributeValue
                  ? InputState.danger
                  : InputState.default
              }
              placeholder={inputFields?.attributeValue?.placeholder}
              defaultText={attrData?.attributeValue}
              onChange={attrValueOnChange}
            />
            {!inputValidation?.attributeValue &&
              stringIsNotEmpty(inputFields?.attributeValue?.errorText) && (
                <div className='flex space-x-2 items-center mt-1.5'>
                  <ReactSVG
                    src={SvgIcon['exclamation-sr']}
                    className='w-5 h-5 fill-red-500 flex-none'
                  />
                  <p className='text-red-500 text-base'>
                    {inputFields?.attributeValue?.errorText}
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AttributeInputFields;
