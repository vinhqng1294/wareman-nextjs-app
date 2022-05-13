import { InputState } from '@/components/ui/input/input.enum';
import InputText from '@/components/ui/input/simple-input-text.component';
import InputTextArea from '@/components/ui/input/simple-input-textarea.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import AddRackHeader from './add-rack-header.component';

const BasicRackInfoForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  defaultValue,
  lotInfo,
  ...props
}) {
  const [rackBasicInfo, setRackBasicInfo] = useState({
    name: defaultValue?.name,
    description: defaultValue?.description,
  });

  const [inputValidation, setInputValidation] = useState({
    name: true,
    description: true,
  });

  const inputFields = {
    name: {
      label: 'Tên kệ',
      placeholder: 'Tên kệ',
      errorText: '',
    },
    description: {
      label: 'Mô tả chi tiết',
      placeholder: 'Một số thông tin về kệ',
      errorText: '',
    },
  };

  const continueBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { ...rackBasicInfo } });
      handleNextStep({});
    }
  };

  const nameOnChange = function ({ value, evt }) {
    setRackBasicInfo({ ...rackBasicInfo, name: value });
    if (stringIsNotEmpty(value)) {
      setInputValidation({ ...inputValidation, name: true });
    } else {
      setInputValidation({ ...inputValidation, name: false });
    }
  };
  const descriptionOnChange = function ({ value, evt }) {
    setRackBasicInfo({ ...rackBasicInfo, description: value });
  };
  console.info('lotBasicInfo', rackBasicInfo);

  return (
    <React.Fragment>
      <AddRackHeader
        title={formHeader?.title}
        subTitle={formHeader?.subTitle}
      />
      <div
        className={'flex flex-col w-full'
          .concat(' overflow-hidden')
          .concat(' xxs:my-4 md:my-5')}
      >
        <SimpleBarReact className='h-full w-full'>
          <div className='flex flex-col space-y-4 px-2.5 pb-3'>
            <div className='flex items-center space-x-2'>
              <p className={'text-base text-dark font-semibold flex-none'}>
                Thuộc phân khu:
              </p>
              <p className={'text-xl text-blue-500 font-semibold'}>
                {stringIsNotEmpty(lotInfo?.name) ? `${lotInfo?.name}` : 'N/A'}
              </p>
            </div>

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
                defaultText={rackBasicInfo?.name}
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
                defaultText={rackBasicInfo?.description}
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
            .concat(' bg-blue-500')
            .concat(' px-5 py-2')
            .concat(' hover:shadow-md')
            .concat(' space-x-3')
            .concat(' xxs:w-full md:w-2/3')
            .concat(
              inputValidation?.name && stringIsNotEmpty(rackBasicInfo?.name)
                ? ' cursor-pointer'
                : ' cursor-not-allowed opacity-50'
            )}
          disabled={
            !(inputValidation?.name && stringIsNotEmpty(rackBasicInfo?.name))
          }
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            continueBtnOnClick();
          }}
        >
          <p className='text-white font-semibold text-base'>Tiếp tục</p>
          <ReactSVG
            src={SvgIcon['arrow-right']}
            className={'fill-white'.concat(' w-3.5')}
          />
        </button>
      </div>
    </React.Fragment>
  );
};

export default BasicRackInfoForm;
