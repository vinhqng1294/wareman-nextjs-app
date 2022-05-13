import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import FormScreenLayout from '@/layouts/FormScreen.layout';
import BasicUomInfoForm from './basic-uom-info-form.component';
import { useState } from 'react';
import { addUom } from '@/apis/uom.api';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import { v4 as UUIDv4 } from 'uuid';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { PermissionList } from '@/utils/permission-list.enum';
import { checkPermission } from '@/utils/commons/checkPermission.utils';
import { getCurrentUserPermission } from '@/apis/authentication.api';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const AdduomMain = function ({ ...props }) {
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

  const addUomSteps = {
    1: {
      title: '',
      subTitle: '',
    },
    // 2: {
    //   title: 'Địa chỉ của uom',
    //   subTitle: 'Vui lòng thêm danh sách địa chỉ của uom',
    // },
    // 2: {
    //   title: 'Hình ảnh của uom',
    //   subTitle: 'Vui lòng tải lên các hình ảnh của uom',
    // },
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
    isFloat: false,
  });

  const updateFinalData = function ({ data, ...props }) {
    setFinalData({ ...finalData, ...data });
  };

  const submitFinalData = async function ({ submitData, ...props }) {
    console.info(submitData);
    addUom({
      accessToken: auth?.accessToken,
      reqData: { ...submitData },
    })
      .then(function ({ data: resData }) {
        redirectTo('/uoms');
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
                  <BasicUomInfoForm
                    formHeader={addUomSteps[currStep]}
                    defaultValue={{
                      name: finalData?.name,
                      description: finalData?.description,
                      isFloat: finalData?.isFloat,
                    }}
                    submitFinalData={submitFinalData}
                  />
                )}
                {/* {currStep === 2 && (
              <UomSpecsForm
                formHeader={addUomSteps[currStep]}
                handleNextStep={handleNextStep}
                updateFinalData={updateFinalData}
                defaultValue={{
                  name: finalData?.name,
                  description: finalData?.description,
                  addresses: finalData?.addresses,
                }}
              />
            )} */}
                {/* {currStep === 2 && (
              <UploadUomImgForm
                formHeader={addUomSteps[currStep]}
                submitFinalData={submitFinalData}
                handleNextStep={handleNextStep}
              />
            )} */}
              </div>
            </React.Fragment>
          )}
        </div>
      </FormScreenLayout>
    </React.Fragment>
  );
};

export default AdduomMain;
