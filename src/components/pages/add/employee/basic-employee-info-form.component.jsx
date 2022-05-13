import { InputState } from '@/components/ui/input/input.enum';
import InputText from '@/components/ui/input/simple-input-text.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import AddEmployeeHeader from './add-employee-header.component';
import passwordValidation from '@/utils/commons/passwordValidation.utils';
import Checkbox from '@/components/ui/checkbox/checkbox.component';
import RadioBtn from '@/components/ui/radio/radio.component';
import GenderSelect from './gender-select.component';
import InputPassword from '@/components/ui/input/input-password.component';
import emailValidation from '@/utils/commons/emailValidation.utils';

const BasicEmployeeInfoForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  defaultValue,
  ...props
}) {
  const [basicInfo, setBasicInfo] = useState({
    lastName: defaultValue?.lastName,
    firstName: defaultValue?.firstName,
    email: defaultValue?.email,
    password: defaultValue?.password,
    rePassword: defaultValue?.rePassword,
    isFemale: defaultValue?.isFemale,
  });

  const [inputValidation, setInputValidation] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    rePassword: true,
    isFemale: true,
  });

  const inputFields = {
    lastName: {
      label: 'Họ và tên lót',
      placeholder: '',
      errorText: '',
    },
    firstName: {
      label: 'Tên',
      placeholder: '',
      errorText: 'Tên không được bỏ trống',
    },
    email: {
      label: 'Email',
      placeholder: '',
      errorText: 'Địa chỉ email không hợp lệ',
    },
    password: {
      label: 'Mật khẩu',
      placeholder: '',
      errorText: `Mật khẩu phải chứa từ 8 đến 20 ký tự. Trong đó phải chứa ít nhất 1 chữ số, 1 chữ cái in hoa, 1 chữ cái in thường, và 1 ký tự đặc biệt`,
    },
    rePassword: {
      label: 'Nhập lại mật khẩu',
      placeholder: '',
      errorText: 'Mật khẩu không khớp. Vui lòng thử lại.',
    },
    gender: {
      name: 'gender',
      label: 'Giới tính',
      options: [
        { label: 'Nam', id: 'gender_male' },
        { label: 'Nữ', id: 'gender_female' },
      ],
      placeholder: '',
      errorText: '',
    },
  };

  const continueBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { ...basicInfo } });
      handleNextStep({});
    }
  };

  const firstNameOnChange = function ({ value, evt }) {
    setBasicInfo({ ...basicInfo, firstName: value });
    if (stringIsNotEmpty(value)) {
      setInputValidation({ ...inputValidation, firstName: true });
    } else {
      setInputValidation({ ...inputValidation, firstName: false });
    }
  };
  const lastNameOnChange = function ({ value, evt }) {
    setBasicInfo({ ...basicInfo, lastName: value });
  };
  const passwordOnChange = function ({ value, evt }) {
    setBasicInfo({ ...basicInfo, password: value });
    setInputValidation({
      ...inputValidation,
      password: passwordValidation(value),
    });
  };
  const rePasswordOnChange = function ({ value, evt }) {
    setBasicInfo({ ...basicInfo, rePassword: value });
    setInputValidation({
      ...inputValidation,
      rePassword: value === basicInfo?.password,
    });
  };
  const emailOnChange = function ({ value, evt }) {
    setBasicInfo({ ...basicInfo, email: value });
    setInputValidation({
      ...inputValidation,
      email: emailValidation(value),
    });
  };
  const genderOnChange = function ({ index, optionData }) {
    // console.info('data', optionData);
    setBasicInfo({
      ...basicInfo,
      isFemale: optionData?.id === inputFields?.gender?.options[1].id,
    });
  };

  console.info('basicInfo', basicInfo);

  return (
    <React.Fragment>
      <AddEmployeeHeader
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
            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.lastName?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.lastName
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.lastName?.placeholder}
                defaultText={basicInfo?.lastName}
                onChange={lastNameOnChange}
              />
              {!inputValidation?.lastName &&
                stringIsNotEmpty(inputFields?.lastName?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.lastName?.errorText}
                    </p>
                  </div>
                )}
            </div>

            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.firstName?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.firstName
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.firstName?.placeholder}
                defaultText={basicInfo?.firstName}
                onChange={firstNameOnChange}
              />
              {!inputValidation?.firstName &&
                stringIsNotEmpty(inputFields?.firstName?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.firstName?.errorText}
                    </p>
                  </div>
                )}
            </div>

            <div className='flex items-center space-x-6'>
              <label className={'font-semibold text-base text-dark'}>
                {inputFields?.gender?.label}
              </label>
              <GenderSelect
                options={[...inputFields?.gender?.options]}
                defaultCheckedOptionIndex={inputFields?.gender?.options?.findIndex(
                  function (value, index) {
                    const defaultOptionId = basicInfo?.isFemale
                      ? inputFields?.gender?.options[1].id
                      : inputFields?.gender?.options[0].id;
                    if (value?.id === defaultOptionId) {
                      return value;
                    }
                  }
                )}
                onOptionChange={genderOnChange}
              />
            </div>

            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.email?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.email
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.email?.placeholder}
                defaultText={basicInfo?.email}
                onChange={emailOnChange}
              />
              {!inputValidation?.email &&
                stringIsNotEmpty(inputFields?.email?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.email?.errorText}
                    </p>
                  </div>
                )}
            </div>

            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.password?.label}
              </label>
              <InputPassword
                inputState={
                  !inputValidation.password
                    ? InputState.danger
                    : InputState.default
                }
                onChange={passwordOnChange}
              />
              {!inputValidation?.password &&
                stringIsNotEmpty(inputFields?.password?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.password?.errorText}
                    </p>
                  </div>
                )}
            </div>
            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.rePassword?.label}
              </label>
              <InputPassword
                inputState={
                  !inputValidation.rePassword
                    ? InputState.danger
                    : InputState.default
                }
                onChange={rePasswordOnChange}
              />
              {!inputValidation?.password &&
                stringIsNotEmpty(inputFields?.password?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.password?.errorText}
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
              inputValidation?.firstName &&
                stringIsNotEmpty(basicInfo?.firstName) &&
                inputValidation?.password &&
                stringIsNotEmpty(basicInfo?.password) &&
                inputValidation?.email &&
                stringIsNotEmpty(basicInfo?.email) &&
                inputValidation?.rePassword &&
                stringIsNotEmpty(basicInfo?.rePassword)
                ? ' cursor-pointer'
                : ' cursor-not-allowed opacity-50'
            )}
          disabled={
            !(
              inputValidation?.firstName &&
              stringIsNotEmpty(basicInfo?.firstName) &&
              inputValidation?.password &&
              stringIsNotEmpty(basicInfo?.password) &&
              inputValidation?.email &&
              stringIsNotEmpty(basicInfo?.email) &&
              inputValidation?.rePassword &&
              stringIsNotEmpty(basicInfo?.rePassword)
            )
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

export default BasicEmployeeInfoForm;
