import ToggleButton from '@/components/ui/button/toggle-button.component';
import { InputState } from '@/components/ui/input/input.enum';
import InputText from '@/components/ui/input/simple-input-text.component';
import InputTextArea from '@/components/ui/input/simple-input-textarea.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';

const ContactInputFields = function ({
  index: compIndex,
  defaultValue,
  nameOnChange: default_nameOnChange,
  titleOnChange: default_titleOnChange,
  primaryPhoneOnChange: default_primaryPhoneOnChange,
  secondaryPhoneOnChange: default_secondaryPhoneOnChange,
  primaryEmailOnChange: default_primaryEmailOnChange,
  secondaryEmailOnChange: default_secondaryEmailOnChange,
  onItemRemove,
  ...props
}) {
  const inputFields = {
    name: {
      label: 'Tên người liên hệ',
      placeholder: '',
      errorText: 'Vui lòng nhập địa chỉ',
    },
    title: {
      label: 'Chức vụ',
      placeholder: '',
      errorText: '',
    },
    primaryPhone: {
      label: 'Số điện thoại',
      placeholder: '',
      errorText: '',
    },
    secondaryPhone: {
      label: 'Số điện thoại khác',
      placeholder: '',
      errorText: '',
    },
    primaryEmail: {
      label: 'Email',
      placeholder: '',
      errorText: '',
    },
    secondaryEmail: {
      label: 'Email khác',
      placeholder: '',
      errorText: '',
    },
  };
  const [inputData, setInputData] = useState({
    name: defaultValue?.name ?? '',
    title: defaultValue?.title ?? '',
    primaryPhone: defaultValue?.primaryPhone ?? '',
    secondaryPhone: defaultValue?.secondaryPhone ?? '',
    primaryEmail: defaultValue?.primaryEmail ?? '',
    secondaryEmail: defaultValue?.secondaryEmail ?? '',
  });
  const [inputValidation, setInputValidation] = useState({
    name: true,
    title: true,
    primaryPhone: true,
    secondaryPhone: true,
    primaryEmail: true,
    secondaryEmail: true,
  });

  const nameOnChange = function ({ value, evt }) {
    setInputData({ ...inputData, name: value });
    if (stringIsNotEmpty(value)) {
      setInputValidation({ ...inputValidation, name: true });
    } else {
      setInputValidation({ ...inputValidation, name: false });
    }
    if (isFunction(default_nameOnChange)) {
      default_nameOnChange({ compIndex, value: value });
    }
  };
  const titleOnChange = function ({ value, evt }) {
    setInputData({ ...inputData, title: value });
    if (stringIsNotEmpty(value)) {
      setInputValidation({ ...inputValidation, title: true });
    } else {
      setInputValidation({ ...inputValidation, title: false });
    }
    if (isFunction(default_titleOnChange)) {
      default_titleOnChange({ compIndex, value: value });
    }
  };
  const primaryPhoneOnChange = function ({ value, evt }) {
    setInputData({ ...inputData, primaryPhone: value });
    if (isFunction(default_primaryPhoneOnChange)) {
      default_primaryPhoneOnChange({ compIndex, value: value });
    }
  };
  const secondaryPhoneOnChange = function ({ value, evt }) {
    setInputData({ ...inputData, secondaryPhone: value });
    if (isFunction(default_secondaryPhoneOnChange)) {
      default_secondaryPhoneOnChange({ compIndex, value: value });
    }
  };
  const primaryEmailOnChange = function ({ value, evt }) {
    setInputData({ ...inputData, primaryEmail: value });
    if (isFunction(default_primaryEmailOnChange)) {
      default_primaryEmailOnChange({ compIndex, value: value });
    }
  };
  const secondaryEmailOnChange = function ({ value, evt }) {
    setInputData({ ...inputData, secondaryEmail: value });
    if (isFunction(default_secondaryEmailOnChange)) {
      default_secondaryEmailOnChange({ compIndex, value: value });
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

        <div
          className={'flex flex-col'
            .concat(' space-y-4 px-2.5 py-3')
            .concat(' bg-stone-100 rounded-md shadow-md')}
        >
          <div className='flex flex-col'>
            <label className={'mb-1 font-semibold text-base text-dark'}>
              {inputFields?.name?.label}
            </label>
            <InputText
              inputState={
                !inputValidation?.name ? InputState.danger : InputState.default
              }
              placeholder={inputFields?.name?.placeholder}
              defaultText={inputData?.name}
              onChange={nameOnChange}
            />
            {!inputValidation?.name &&
              stringIsNotEmpty(inputFields?.name?.errorText) && (
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

          <div className='flex flex-col'>
            <label className={'mb-1 font-semibold text-base text-dark'}>
              {inputFields?.title?.label}
            </label>
            <InputText
              inputState={
                !inputValidation?.title ? InputState.danger : InputState.default
              }
              placeholder={inputFields?.title?.placeholder}
              defaultText={inputData?.title}
              onChange={titleOnChange}
            />
            {!inputValidation?.title &&
              stringIsNotEmpty(inputFields?.title?.errorText) && (
                <div className='flex space-x-2 items-center mt-1.5'>
                  <ReactSVG
                    src={SvgIcon['exclamation-sr']}
                    className='w-5 h-5 fill-red-500 flex-none'
                  />
                  <p className='text-red-500 text-base'>
                    {inputFields?.title?.errorText}
                  </p>
                </div>
              )}
          </div>

          <div className='flex flex-col space-y-2'>
            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.primaryEmail?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.primaryEmail
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.primaryEmail?.placeholder}
                defaultText={inputData?.primaryEmail}
                onChange={primaryEmailOnChange}
              />
              {!inputValidation?.primaryEmail &&
                stringIsNotEmpty(inputFields?.primaryEmail?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.primaryEmail?.errorText}
                    </p>
                  </div>
                )}
            </div>
            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.primaryPhone?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.primaryPhone
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.primaryPhone?.placeholder}
                defaultText={inputData?.primaryPhone}
                onChange={primaryPhoneOnChange}
              />
              {!inputValidation?.primaryPhone &&
                stringIsNotEmpty(inputFields?.primaryPhone?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.primaryPhone?.errorText}
                    </p>
                  </div>
                )}
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.secondaryEmail?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.secondaryEmail
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.secondaryEmail?.placeholder}
                defaultText={inputData?.secondaryEmail}
                onChange={secondaryEmailOnChange}
              />
              {!inputValidation?.secondaryEmail &&
                stringIsNotEmpty(inputFields?.secondaryEmail?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.secondaryEmail?.errorText}
                    </p>
                  </div>
                )}
            </div>
            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.secondaryPhone?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.secondaryPhone
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.secondaryPhone?.placeholder}
                defaultText={inputData?.secondaryPhone}
                onChange={secondaryPhoneOnChange}
              />
              {!inputValidation?.secondaryPhone &&
                stringIsNotEmpty(inputFields?.secondaryPhone?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.secondaryPhone?.errorText}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactInputFields;
