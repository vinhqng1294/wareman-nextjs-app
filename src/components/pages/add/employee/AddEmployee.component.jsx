import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import FormScreenLayout from '@/layouts/FormScreen.layout';
import BasicEmployeeInfoForm from './basic-employee-info-form.component';
import { useState } from 'react';
import UploadEmployeeImgForm from './upload-employee-img-form.component';
import { getLotInfoById } from '@/apis/lot.api';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import { useRouter } from 'next/router';
import { addRack } from '@/apis/rack.api';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { getCurrentUserPermission } from '@/apis/authentication.api';
import { checkPermission } from '@/utils/commons/checkPermission.utils';
import { PermissionList } from '@/utils/permission-list.enum';
import { addUser } from '@/apis/user.api';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const AddEmployeeMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [pageLoading, setPageLoading] = useState(false);

  const [isPermitted, setIsPermitted] = useState(true);
  const [userPermissions, setUserPermissions] = useState([]);

  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorPopupOnClose = function () {
    setViewErrorPopup(!viewErrorPopup);
    setErrorMsg('');
    setPageLoading(false);
  };

  const addRackSteps = {
    1: {
      title: '',
      subTitle: '',
    },
    2: {
      title: 'Hình ảnh của kệ',
      subTitle: 'Vui lòng tải lên các hình ảnh của kệ',
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    isFemale: false,
    photoIds: [],
  });
  const updateFinalData = function ({ data, ...props }) {
    setFinalData({ ...finalData, ...data });
  };

  const submitFinalData = async function ({ ...props }) {
    await addUser({
      accessToken: auth?.accessToken,
      reqData: { ...finalData },
    })
      .then(function ({ data: resData }) {
        redirectTo('/employees');
        // redirectTo('/employee/'.concat(resData?.data?.id));
      })
      .catch(function (err) {
        setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      });
  };

  const [finalImgDataList, setFinalImgDataList] = useState({});

  useEffect(
    function () {
      if (!stringIsNotEmpty(auth?.accessToken)) {
        redirectTo('/login');
      }
    },
    [auth?.accessToken]
  );

  // start: user permission
  useEffect(
    function () {
      if (stringIsNotEmpty(auth?.accessToken)) {
        getCurrentUserPermission({ accessToken: auth?.accessToken })
          .then(function ({ data: resData }) {
            if (!arrayIsNotEmpty([...resData?.data])) {
              setIsPermitted(false);
            } else {
              setUserPermissions([...resData?.data]);
            }
          })
          .catch(function (err) {
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [auth?.accessToken]
  );
  useEffect(
    function () {
      if (arrayIsNotEmpty(userPermissions)) {
        console.info('userPermissions', userPermissions);
        const result = checkPermission({
          permissionKey: PermissionList.CREATE_USER.key,
          userPermissionList: userPermissions,
        });
        if (result) {
          setIsPermitted(true);
          setPageLoading(false);
        } else {
          setIsPermitted(false);
        }
      }
    },
    [userPermissions]
  );
  useEffect(
    function () {
      if (!isPermitted) {
        redirectTo('/');
      }
    },
    [isPermitted]
  );
  // end: user permission

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
            {pageLoading ? (
              <React.Fragment>
                <div className='flex items-center justify-center mx-auto my-auto'>
                  <DotLoader loading={pageLoading} />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {currStep === 1 && (
                  <BasicEmployeeInfoForm
                    formHeader={addRackSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    defaultValue={{
                      firstName: finalData?.firstName,
                      lastName: finalData?.lastName,
                      email: finalData?.email,
                      password: finalData?.password,
                      rePassword: finalData?.rePassword,
                      isFemale: finalData?.isFemale,
                    }}
                  />
                )}
                {currStep === 2 && (
                  <UploadEmployeeImgForm
                    formHeader={addRackSteps[currStep]}
                    handleNextStep={handleNextStep}
                    submitFinalData={submitFinalData}
                    imgDataList={{ ...finalImgDataList }}
                    updateImgDataList={setFinalImgDataList}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    finalData={{ ...finalData }}
                  />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </FormScreenLayout>
    </React.Fragment>
  );
};

export default AddEmployeeMain;
