import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import FormScreenLayout from '@/layouts/FormScreen.layout';
import BasicLotInfoForm from './basic-lot-info-form.component';
import { useState } from 'react';
import UploadLotImgForm from './upload-lot-img-form.component';
import { addLot } from '@/apis/lot.api';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import { v4 as UUIDv4 } from 'uuid';
import { getCurrentUserPermission } from '@/apis/authentication.api';
import { checkPermission } from '@/utils/commons/checkPermission.utils';
import { PermissionList } from '@/utils/permission-list.enum';
import { DotLoader } from '@/components/ui/loader/loader.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const AddLotMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [pageLoading, setPageLoading] = useState(true);

  const [isPermitted, setIsPermitted] = useState(true);
  const [userPermissions, setUserPermissions] = useState([]);

  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorPopupOnClose = function () {
    setViewErrorPopup(!viewErrorPopup);
    setErrorMsg('');
    setPageLoading(false);
  };

  const addLotSteps = {
    1: {
      title: 'Thông tin cơ bản',
      subTitle: 'Vui lòng nhập các thông tin cơ bản của phân khu',
    },
    2: {
      title: 'Hình ảnh của phân khu',
      subTitle: 'Vui lòng tải lên các hình ảnh của phân khu',
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
    description: '',
  });
  const updateFinalData = function ({ data, ...props }) {
    setFinalData({ ...finalData, ...data });
  };

  const submitFinalData = async function ({ ...props }) {
    addLot({
      accessToken: auth?.accessToken,
      reqData: { ...finalData },
    })
      .then(function ({ data: resData }) {
        redirectTo(`/lots/${resData?.data?.id}`);
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
          permissionKey: PermissionList.CREATE_PRODUCT.key,
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
          {pageLoading ? (
            <React.Fragment>
              <div className='flex items-center justify-center py-10 my-auto'>
                <DotLoader loading={pageLoading} />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div
                className={'flex flex-col'
                  .concat(' w-full h-full md:max-w-2xl')
                  .concat(' xxs:px-4 md:px-0')
                  .concat(' overflow-hidden')}
              >
                {currStep === 1 && (
                  <BasicLotInfoForm
                    formHeader={addLotSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    defaultValue={{
                      name: finalData?.name,
                      description: finalData?.description,
                    }}
                  />
                )}
                {currStep === 2 && (
                  <UploadLotImgForm
                    formHeader={addLotSteps[currStep]}
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
              </div>
            </React.Fragment>
          )}
        </div>
      </FormScreenLayout>
    </React.Fragment>
  );
};

export default AddLotMain;
