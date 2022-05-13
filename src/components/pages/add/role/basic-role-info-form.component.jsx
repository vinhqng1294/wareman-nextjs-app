import { InputState } from '@/components/ui/input/input.enum';
import InputText from '@/components/ui/input/simple-input-text.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import AddRoleHeader from './add-role-header.component';
import { Select } from '@/components/ui/select/select.component';
import { getPermissions } from '@/apis/role.api';

const BasicRoleInfoForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  defaultValue,
  setErrorMsg,
  setViewErrorPopup,
  ...props
}) {
  const dispatch = useDispatch();
  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [permissions, setPermissions] = useState([]);

  const [roleBasicInfo, setRoleBasicInfo] = useState({
    name: defaultValue?.name,
    permissions: defaultValue?.permissions,
  });

  const [inputValidation, setInputValidation] = useState({
    name: true,
    permissions: true,
  });

  const inputFields = {
    name: {
      label: 'Tên chức vụ',
      placeholder: 'Tên chức vụ',
      errorText: '',
    },
    permissions: {
      label: 'Danh sách quyền hạn',
      placeholder: 'Danh sách quyền hạn',
      errorText: '',
    }
  };

  const continueBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { ...roleBasicInfo } });
      handleNextStep({});
    }
  };

  const nameOnChange = function ({ value, evt }) {
    setRoleBasicInfo({ ...roleBasicInfo, name: value });
    if (stringIsNotEmpty(value)) {
      setInputValidation({ ...inputValidation, name: true });
    } else {
      setInputValidation({ ...inputValidation, name: false });
    }
  };

  const permissionsOnChange = function ({ value, evt }) {
    setRoleBasicInfo({ ...roleBasicInfo, permissions: Object.keys(value).map(i => value[i].value) });
  };

  useEffect(
    function () {
      if (!stringIsNotEmpty(auth?.accessToken)) {
        redirectTo('/login');
      }
    },
    [auth]
  );

  useEffect(function({...props}) {
    if (stringIsNotEmpty(auth?.accessToken)) {
      getPermissions({
        accessToken: auth?.accessToken,
        reqData: {},
      })
        .then(function ({ data: resData }) {
          setPermissions([...resData?.data]);
        })
        .catch(function (err) {
          setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
          setViewErrorPopup(!viewErrorPopup);
        });
    }
  }, [auth?.accessToken]);

  // const permissions = ["LOGIN","VIEW_USER_INFO","VIEW_CURRENT_USER_INFO","CREATE_USER","UPDATE_USER_INFO","UPDATE_CURRENT_USER_INFO","DELETE_USER","CREATE_PRODUCT","VIEW_PRODUCT","VIEW_LIST_PRODUCT","UPDATE_PRODUCT","DELETE_PRODUCT","CREATE_BR","VIEW_BR","VIEW_LIST_BR","UPDATE_SUBMITTED_BR","DELETE_DRAFT_BR","CREATE_PO","VIEW_PO","VIEW_LIST_PO","UPDATE_SUBMITTED_PO","DELETE_DRAFT_PO","CREATE_SO","VIEW_SO","VIEW_LIST_SO","UPDATE_SUBMITTED_SO","DELETE_DRAFT_SO","CREATE_IMPORT","VIEW_IMPORT","VIEW_LIST_IMPORT","UPDATE_SUBMITTED_IMPORT","DELETE_DRAFT_IMPORT","CREATE_EXPORT","VIEW_EXPORT","VIEW_LIST_EXPORT","UPDATE_SUBMITTED_EXPORT","DELETE_DRAFT_EXPORT"]
  return (
    <React.Fragment>
      <AddRoleHeader
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
                {inputFields?.name?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.name
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.name?.placeholder}
                defaultText={roleBasicInfo?.name}
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
                {inputFields?.permissions?.label}
              </label>
              <Select options={permissions} mutiple={true} onChange={permissionsOnChange}/>
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
              inputValidation?.name && stringIsNotEmpty(roleBasicInfo?.name)
                ? ' cursor-pointer'
                : ' cursor-not-allowed opacity-50')}
          disabled={
            !(inputValidation?.name && stringIsNotEmpty(roleBasicInfo?.name))
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

export default BasicRoleInfoForm;
