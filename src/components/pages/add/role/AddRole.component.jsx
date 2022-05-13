import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import FormScreenLayout from '@/layouts/FormScreen.layout';
import BasicRoleInfoForm from './basic-role-info-form.component';
import { useState } from 'react';
import RoleSpecsForm from './role-specs-form/role-specs-form.component';
import UploadRoleImgForm from './upload-role-img-form.component';
import { addRole } from '@/apis/role.api';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import { v4 as UUIDv4 } from 'uuid';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const AddroleMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [pageLoading, setPageLoading] = useState(false);

  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorPopupOnClose = function () {
    setViewErrorPopup(!viewErrorPopup);
    setErrorMsg('');
    setPageLoading(false);
  };

  const addRoleSteps = {
    1: {
      title: 'Thông tin cơ bản',
      subTitle: 'Vui lòng nhập các thông tin cơ bản của chức vụ',
    },
    // 2: {
    //   title: 'Địa chỉ của chức vụ',
    //   subTitle: 'Vui lòng thêm danh sách địa chỉ của chức vụ',
    // },
    2: {
      title: 'Chọn Hoàn tất để  tạo chức vụ',
      subTitle: '',
    },
  };
  const [currStep, setCurrStep] = useState(1);
  const handleNextStep = function ({ isPrev = false }) {
    if (isPrev) {
      setCurrStep(currStep - 1);
    } else {
      setCurrStep(currStep + 1);
    }
  };

  const [finalData, setFinalData] = useState({
    name: '',
    permissions: [],
  });

  const updateFinalData = function ({ data, ...props }) {
    setFinalData({ ...finalData, ...data });
  };

  const submitFinalData = async function ({ ...props }) {
    addRole({
      accessToken: auth?.accessToken,
      reqData: { ...finalData },
    })
      .then(function ({ data: resData }) {
        redirectTo('/roles');
      })
      .catch(function (err) {
        setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      });
  };

  useEffect(
    function () {
      if (!stringIsNotEmpty(auth?.accessToken)) {
        redirectTo('/login');
      }
    },
    [auth?.accessToken]
  );

  // console.log(finalData);

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <ErrorModal
        open={viewErrorPopup}
        errorMsg={errorMsg}
        onClose={errorPopupOnClose}
      />
      <FormScreenLayout
        layoutBgColor={'bg-white'}
        bodyPaddingY={'xxs:py-4 md:py-5'}
      >
        <div
          className={
            'flex flex-col'.concat(' w-full h-full').concat(' items-center')
            // .concat(' overflow-hidden')
          }
        >
          <div
            className={'flex flex-col'
              .concat(' w-full h-full md:max-w-2xl')
              .concat(' xxs:px-4 md:px-0')
              .concat(' overflow-hidden')}
          >
            {currStep === 1 && (
              <BasicRoleInfoForm
                formHeader={addRoleSteps[currStep]}
                handleNextStep={handleNextStep}
                updateFinalData={updateFinalData}
                defaultValue={{
                  name: finalData?.name,
                  permissions: finalData?.permissions,
                }}
                setErrorMsg={setErrorMsg}
                setViewErrorPopup={setViewErrorPopup}
              />
            )}
            {/* {currStep === 2 && (
              <RoleSpecsForm
                formHeader={addRoleSteps[currStep]}
                handleNextStep={handleNextStep}
                updateFinalData={updateFinalData}
                defaultValue={{
                  name: finalData?.name,
                  description: finalData?.description,
                  addresses: finalData?.addresses,
                }}
              />
            )} */}
            {currStep === 2 && (
              <UploadRoleImgForm
                formHeader={addRoleSteps[currStep]}
                submitFinalData={submitFinalData}
                handleNextStep={handleNextStep}
              />
            )}
          </div>
        </div>
      </FormScreenLayout>
    </React.Fragment>
  );
};

export default AddroleMain;
