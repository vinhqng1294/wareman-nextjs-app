import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import FormScreenLayout from '@/layouts/FormScreen.layout';
import BasicCustomerInfoForm from './basic-customer-info-form.component';
import { useState } from 'react';
import AddressesForm from './addresses-form/addresses-form.component';
import UploadImgForm from './upload-img-form.component';
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
import { addProvider } from '@/apis/provider.api';
import ContactsForm from './contact-form/contacts-form.component';
import { addCustomer } from '@/apis/customer.api';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const AddCustomerMain = function ({ ...props }) {
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

  const addCustomerSteps = {
    1: {
      title: '',
      subTitle: '',
    },
    2: {
      title: 'Địa chỉ',
      subTitle: 'Vui lòng thêm dịa chỉ của khách hàng',
    },
    3: {
      title: 'Thông tin liên hệ',
      subTitle: 'Vui lòng thêm thông tin liên hệ của khách hàng',
    },
    4: {
      title: 'Hình ảnh của khách hàng',
      subTitle: 'Vui lòng tải lên các hình ảnh của khách hàng',
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
    addresses: [],
    contacts: [],
    photoIds: [],
  });
  const updateFinalData = function ({ data, ...props }) {
    // console.info('updateFinalData finalData', finalData);
    // console.info('data', data);
    setFinalData({ ...finalData, ...data });
  };
  console.info('finalData', finalData);
  const submitFinalData = async function ({ submitData, ...props }) {
    addCustomer({
      accessToken: auth?.accessToken,
      reqData: { ...submitData },
    })
      .then(function ({ data: resData }) {
        console.info('addCustomer resData', resData);
        redirectTo('/customers/'.concat(resData?.data?.id));
      })
      .catch(function (err) {
        console.error('err', err);
        console.error('err', err?.response);
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
          permissionKey: PermissionList.CREATE_CUSTOMER.key,
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
                  <BasicCustomerInfoForm
                    formHeader={addCustomerSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    defaultValue={{
                      name: finalData?.name,
                      description: finalData?.description,
                    }}
                  />
                )}
                {currStep === 2 && (
                  <AddressesForm
                    formHeader={addCustomerSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    defaultValue={{ addresses: finalData?.addresses }}
                  />
                )}
                {currStep === 3 && (
                  <ContactsForm
                    formHeader={addCustomerSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    defaultValue={{ contacts: finalData?.contacts }}
                  />
                )}
                {currStep === 4 && (
                  <UploadImgForm
                    formHeader={addCustomerSteps[currStep]}
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

export default AddCustomerMain;
