import { InputState } from '@/components/ui/input/input.enum';
import InputText from '@/components/ui/input/simple-input-text.component';
import InputTextArea from '@/components/ui/input/simple-input-textarea.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import AddUomHeader from './add-uom-header.component';
import ToggleButton from '@/components/ui/button/toggle-button.component';

const BasicUomInfoForm = function ({
  formHeader,
  defaultValue,
  submitFinalData,
  ...props
}) {
  const [uomBasicInfo, setUomBasicInfo] = useState({
    name: defaultValue?.name,
    description: defaultValue?.description,
    isFloat: defaultValue?.isFloat,
  });

  const [inputValidation, setInputValidation] = useState({
    name: true,
    description: true,
    isFloat: true,
  });

  const inputFields = {
    name: {
      label: 'Tên đơn vị đo',
      placeholder: '',
      errorText: 'Tên đơn vị đo không được bỏ trống',
    },
    description: {
      label: 'Mô tả đơn vị đo',
      placeholder: '',
      errorText: '',
    },
    isFloat: {
      label: 'Đơn vị đo có là số thập phân hay không?',
      placeholder: '',
      errorText: '',
    },
  };

  const submitBtnOnClick = async function () {
    if (isFunction(submitFinalData)) {
      await submitFinalData({ submitData: { ...uomBasicInfo } });
    }
  };

  const nameOnChange = function ({ value, evt }) {
    setUomBasicInfo({ ...uomBasicInfo, name: value });
    if (stringIsNotEmpty(value)) {
      setInputValidation({ ...inputValidation, name: true });
    } else {
      setInputValidation({ ...inputValidation, name: false });
    }
  };

  const descriptionOnChange = function ({ value, evt }) {
    setUomBasicInfo({ ...uomBasicInfo, description: value });
  };

  const isFloatOnChange = function (checked) {
    setUomBasicInfo({ ...uomBasicInfo, isFloat: checked });
  };

  // console.info('uomBasicInfo', uomBasicInfo);

  return (
    <React.Fragment>
      <AddUomHeader title={formHeader?.title} subTitle={formHeader?.subTitle} />
      <div
        className={'flex flex-col w-full'
          .concat(' overflow-hidden')
          .concat(' xxs:my-4 md:my-5')}
      >
        <SimpleBarReact className='h-full w-full'>
          <div className='flex flex-col space-y-4 px-2.5 pb-3'>
            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.name?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.name
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.name?.placeholder}
                defaultText={uomBasicInfo?.name}
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
                {inputFields?.description?.label}
              </label>
              <InputTextArea
                inputState={
                  !inputValidation?.description
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.description?.placeholder}
                defaultText={uomBasicInfo?.description}
                rows={5}
                onChange={descriptionOnChange}
              />
              {!inputValidation?.description &&
                stringIsNotEmpty(inputFields?.description?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.description?.errorText}
                    </p>
                  </div>
                )}
            </div>
            <div className='flex flex-col'>
              <div className='flex items-center space-x-6'>
                <label className={'font-semibold text-base text-dark'}>
                  {inputFields?.isFloat?.label}
                </label>
                <div className='flex'>
                  <ToggleButton
                    defaultChecked={uomBasicInfo.isFloat}
                    onCheck={isFloatOnChange}
                  />
                </div>
              </div>
              {!inputValidation?.name &&
                stringIsNotEmpty(inputFields?.isFloat?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.isFloat?.errorText}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </SimpleBarReact>
      </div>
      <div
        className={'flex flex-col'
          .concat(' justify-between items-center')
          .concat(' xxs:mt-auto md:mt-5')
          .concat(' py-1 px-2.5')}
      >
        <button
          type='button'
          className={'flex items-center justify-center'
            .concat(' rounded-full')
            .concat(' bg-green-500')
            .concat(' px-5 py-2')
            .concat(' hover:shadow-md')
            .concat(' space-x-3')
            .concat(' xxs:w-full md:w-2/3')
            .concat(
              inputValidation?.name && stringIsNotEmpty(uomBasicInfo?.name)
                ? ' cursor-pointer'
                : ' cursor-not-allowed opacity-50'
            )}
          disabled={
            !(inputValidation?.name && stringIsNotEmpty(uomBasicInfo?.name))
          }
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            submitBtnOnClick();
          }}
        >
          <p className='text-white font-semibold text-base'>Hoàn tất</p>
        </button>
      </div>
    </React.Fragment>
  );
};

export default BasicUomInfoForm;
