import { InputState } from '@/components/ui/input/input.enum';
import InputText from '@/components/ui/input/simple-input-text.component';
import InputTextArea from '@/components/ui/input/simple-input-textarea.component';
import Checkbox from '@/components/ui/checkbox/checkbox.component';
import { isInteger } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';

const AttributeInputFields = function ({
  index,
  updateFinalData,
  defaultValue,
  ...props
}) {
  const inputFields = {
    address: {
      label: 'Địa chỉ',
      placeholder: 'Địa chỉ',
      errorText: '',
    },
    addressIsFactory: {
      label: 'Địa chỉ nhà máy',
      placeholder: 'Địa chỉ nhà máy',
      errorText: '',
    },
    addressIsHq: {
      label: 'Trụ sở chính',
      placeholder: 'Trụ sở chính',
      errorText: '',
    },
    addressIsOffice: {
      label: 'Địa chỉ văn phòng',
      placeholder: 'Địa chỉ văn phòng',
      errorText: '',
    },
  };

  const [inputValidation, setInputValidation] = useState({
    address: true,
    addressIsFactory: true,
    addressIsHq: true,
    addressIsOffice: true,
  });

  const addressOnChange = function ({ value, evt }) {
    updateFinalData({ ...defaultValue, addresses: defaultValue?.addresses.map((item, i) => {
      if (i == index) {
        item.address = value;
        return item;
      }
      return item;
    })});
  };

  const addressIsFactoryOnChange = function ({ value, evt }) {
    updateFinalData({ ...defaultValue, addresses: defaultValue?.addresses.map((item, i) => {
      if (i == index) {
        item.addressIsFactory = value;
        return item;
      }
      return item;
    })});
  };

  const addressIsHqOnChange = function ({ value, evt }) {
    updateFinalData({ ...defaultValue, addresses: defaultValue?.addresses.map((item, i) => {
      if (i == index) {
        item.addressIsHq = value;
        return item;
      }
      return item;
    })});
  };

  const addressIsOfficeOnChange = function ({ value, evt }) {
    updateFinalData({ ...defaultValue, addresses: defaultValue?.addresses.map((item, i) => {
      if (i == index) {
        item.addressIsOffice = value;
        return item;
      }
      return item;
    })});
  };

  // console.log(index, defaultValue);

  return (
    <React.Fragment>
      <div className='flex flex-col space-y-1.5'>
        <div className={'flex items-center space-x-4'}>
          <div
            className={'flex border-b border-neutral-300 w-8 flex-none'}
          ></div>
          <p className='text-xl font-bold text-sky-500 flex-none'>
            {index + 1}
          </p>
          <div className={'flex border-b border-neutral-300 w-full'}></div>
        </div>
        <div className={'flex flex-col space-y-3'}>
          <div className='flex space-x-2'>
            <label
              className={'font-semibold leading-tight'
                .concat(' text-base text-dark')
                .concat(' border-y-1.5 border-transparent')
                .concat(' flex-none py-2 w-32')}
            >
              {inputFields?.address?.label}
            </label>
            <InputText
              inputState={
                !inputValidation?.address
                  ? InputState.danger
                  : InputState.default
              }
              placeholder={inputFields?.address?.placeholder}
              defaultText={defaultValue?.addresses[index]?.address}
              onChange={addressOnChange}
            />
            {!inputValidation?.address &&
              stringIsNotEmpty(inputFields?.address?.errorText) && (
                <div className='flex space-x-2 items-center mt-1.5'>
                  <ReactSVG
                    src={SvgIcon['exclamation-sr']}
                    className='w-5 h-5 fill-red-500 flex-none'
                  />
                  <p className='text-red-500 text-base'>
                    {inputFields?.address?.errorText}
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
              {inputFields?.addressIsFactory?.label}
            </label>
            <Checkbox 
              checked={defaultValue?.addresses[index]?.addressIsFactory}
              // onChange={addressIsFactoryOnChange}
            />
          </div>

          <div className='flex space-x-2'>
            <label
              className={'font-semibold leading-tight'
                .concat(' text-base text-dark')
                .concat(' border-y-1.5 border-transparent')
                .concat(' flex-none py-2 w-32')}
            >
              {inputFields?.addressIsHq?.label}
            </label>
            <Checkbox 
              checked={defaultValue?.addresses[index]?.addressIsHq}
              // onChange={addressIsHqyOnChange}
            />
          </div>

          <div className='flex space-x-2'>
            <label
              className={'font-semibold leading-tight'
                .concat(' text-base text-dark')
                .concat(' border-y-1.5 border-transparent')
                .concat(' flex-none py-2 w-32')}
            >
              {inputFields?.addressIsOffice?.label}
            </label>
            <Checkbox 
              checked={defaultValue?.addresses[index]?.addressIsOffice}
              // onChange={addressIsOfficeOnChange}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AttributeInputFields;
