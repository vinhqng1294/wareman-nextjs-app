import { getRoles } from '@/apis/role.api';
import { addUserRole } from '@/apis/user.api';
import { InputState } from '@/components/ui/input/input.enum';
import InputSelect from '@/components/ui/input/simple-input-select.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import FormHeader from './form-header.component';

const EmployeeEditForm = function ({
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  handleCloseForm,
  userInfo,
  updateIsEdited,
  ...props
}) {
  const [getRoleLoading, setGetRoleLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [inputValues, setInputValues] = useState({
    roleId: '',
  });
  const [inputValidation, setInputValidation] = useState({
    roleId: true,
  });
  const inputFields = {
    role: {
      label: 'Chức vụ',
      placeholder: 'Vui lòng chọn 1 chức vụ',
      errorText: 'Chức vụ không được bỏ trống',
    },
  };

  const submitBtnOnClick = function () {
    setSubmitLoading(true);
    addUserRole({
      accessToken: accessToken,
      roleId: inputValues?.roleId,
      userId: userInfo?.userId,
    })
      .then(function ({ data: resData }) {
        console.info('addUserRole resData', resData);
        if (isFunction(handleCloseForm)) {
          updateIsEdited(true);
          handleCloseForm();
        }
      })
      .catch(function (err) {
        console.error('err', err);
        console.error('err', err?.response);
        setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      })
      .finally(function () {
        setSubmitLoading(false);
        updateIsEdited(false);
      });
  };
  const abortBtnOnClick = function () {
    if (isFunction(handleCloseForm)) {
      handleCloseForm();
    }
  };

  const roleOnChange = function ({ selected }) {
    console.info('selected', selected);
    setInputValues({ ...inputValues, roleId: selected?.value });
    if (stringIsNotEmpty(selected?.value)) {
      setInputValidation({ ...inputValidation, roleId: true });
    } else {
      setInputValidation({ ...inputValidation, roleId: false });
    }
  };

  // console.info('productBasicInfo', productBasicInfo);

  const [roleOptions, setRoleOptions] = useState([]);
  const mapRoleData = (data) =>
    data?.map((x) => ({
      value: x.id,
      label: x.name,
    })) ?? [];

  const findSelectListViaLabel = function (list, label) {
    return list?.find((x) => x.label === label);
  };
  const findSelectListViaValue = function (list, value) {
    return list?.find((x) => x.value === value);
  };

  useEffect(
    function () {
      if (stringIsNotEmpty(accessToken)) {
        updateIsEdited(false);
        setGetRoleLoading(true);
        getRoles({
          accessToken,
          reqData: {},
        })
          .then(function ({ data: resData }) {
            console.info('getRoles resData', resData);
            const roleList = resData?.data ?? [];
            setRoleOptions(mapRoleData(roleList));
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setGetRoleLoading(false);
          });
      }
    },
    [accessToken]
  );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' bg-white rounded-lg')
          .concat(' shadow-md')
          .concat(' mt-4 mb-6')
          .concat(' py-5 px-6')
          .concat(' w-full max-w-2xl')
          .concat(' mx-auto')}
      >
        <FormHeader />
        <div className={'flex flex-col'.concat(' w-full').concat(' my-5')}>
          <div className='flex flex-col space-y-4 px-2.5 pb-3'>
            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.role?.label}
              </label>
              {getRoleLoading ? (
                <React.Fragment>
                  <div className='flex items-center justify-center mx-auto'>
                    <DotLoader loading={getRoleLoading} />
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <InputSelect
                    searchBoxId={'select-role-search-box'}
                    inputState={
                      !inputValidation?.roleId
                        ? InputState.danger
                        : InputState.default
                    }
                    placeholder={inputFields?.role?.placeholder}
                    onChange={roleOnChange}
                    options={roleOptions}
                    defaultValue={findSelectListViaValue(
                      roleOptions,
                      inputValues?.roleId
                    )}
                  />
                </React.Fragment>
              )}
              {!inputValidation?.roleId &&
                stringIsNotEmpty(inputFields?.role?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.role?.errorText}
                    </p>
                  </div>
                )}
            </div>
            {/*  */}
          </div>
          <div
            className={'flex space-x-4'
              .concat(' justify-between items-center')
              .concat(' xxs:mt-auto md:mt-5')
              .concat(' py-1 px-2.5')}
          >
            <button
              type='button'
              className={
                'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(' bg-white')
                  .concat(' border border-zinc-200')
                  .concat(' px-6 py-2')
                  .concat(' hover:shadow-md')
                  .concat(' space-x-3')
                // .concat(' xxs:w-full md:w-1/3')
              }
              onClick={function (evt) {
                evt?.preventDefault();
                evt?.stopPropagation();
                abortBtnOnClick();
              }}
            >
              <p className='text-red-500 font-semibold text-base'>Hủy</p>
            </button>
            <div className={'flex flex-col'.concat(' xxs:w-full md:w-2/3')}>
              {submitLoading ? (
                <React.Fragment>
                  <div className='flex items-center justify-center mx-auto'>
                    <DotLoader loading={submitLoading} />
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    type='button'
                    className={'flex items-center justify-center'
                      .concat(' rounded-full')
                      .concat(' bg-blue-500')
                      .concat(' px-5 py-2')
                      .concat(' hover:shadow-md')
                      .concat(' space-x-3')
                      .concat(' w-full')
                      .concat(
                        inputValidation?.roleId &&
                          stringIsNotEmpty(inputValues?.roleId)
                          ? ' cursor-pointer'
                          : ' cursor-not-allowed opacity-50'
                      )}
                    disabled={
                      !(
                        inputValidation?.roleId &&
                        stringIsNotEmpty(inputValues?.roleId)
                      )
                    }
                    onClick={function (evt) {
                      evt?.preventDefault();
                      evt?.stopPropagation();
                      submitBtnOnClick();
                    }}
                  >
                    <p className='text-white font-semibold text-base'>
                      Thêm chức vụ
                    </p>
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployeeEditForm;
