import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import FormScreenLayout from '@/layouts/FormScreen.layout';
import BasicInfoForm from './basic-info-form.component';
import { useState } from 'react';
import PreviewForm from './preview-form/preview-form.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import SelectLotForm from './select-lot-form/select-lot-form.component';
import { PermissionList } from '@/utils/permission-list.enum';
import { checkPermission } from '@/utils/commons/checkPermission.utils';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { getCurrentUserPermission } from '@/apis/authentication.api';
import {
  getProductStockInfoById,
  moveProductStock,
} from '@/apis/product-stock.api';
import SelectRackForm from './select-rack-form/select-rack-form.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const UpdateProductStockMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const { auth, productStock } = useSelector(
    (state) => ({ auth: state?.auth, productStock: state?.productStock }),
    shallowEqual
  );

  const { productStockId } = productStock?.updateProductStock;
  console.info('updateProductStockData', { productStockId });

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

  const addProductSteps = {
    1: {
      title: '',
      subTitle: '',
    },
    2: {
      title: 'Chọn phân khu',
      subTitle: 'Vui lòng chọn 1 phân khu',
    },
    3: {
      title: 'Chọn kệ',
      subTitle: 'Vui lòng chọn 1 kệ',
    },
    4: {
      // title: 'Kiểm tra lại thông tin',
      subTitle: 'Vui lòng kiểm tra lại thông tin trước khi gửi',
    },
  };
  const [currStep, setCurrStep] = useState(1);
  const handleNextStep = function ({ isPrev = false, step = 1 }) {
    if (isPrev) {
      setCurrStep(currStep - step);
    } else {
      setCurrStep(currStep + step);
    }
  };

  const [finalData, setFinalData] = useState({
    quantity: 0,
  });
  const updateFinalData = function ({ data, ...props }) {
    setFinalData({ ...finalData, ...data });
  };
  console.info('finalData', finalData);

  const [productStockInfo, setProductStockInfo] = useState({});

  const [lotInfo, setLotInfo] = useState({});
  const updateLotInfo = function ({ data, ...props }) {
    setLotInfo(data);
  };
  const [selectedLotCount, setSelectedLotCount] = useState(0);
  console.info('lotInfo', lotInfo);
  console.info('selectedLotCount', selectedLotCount);

  const [rackInfo, setRackInfo] = useState({});
  const updateRackInfo = function ({ data, ...props }) {
    setRackInfo(data);
  };
  const [selectedRackCount, setSelectedRackCount] = useState(0);
  console.info('rackInfo', rackInfo);
  console.info('selectedRackCount', selectedRackCount);

  const submitFinalData = async function ({ ...props }) {
    console.info('submit finalData', finalData);
    moveProductStock({
      accessToken: auth?.accessToken,
      productStockId: productStockId,
      rackId: rackInfo?.id,
      reqData: { ...finalData },
    })
      .then(function ({ data: resData }) {
        // console.info('add product resData', resData);
        redirectTo(`/lots/${lotInfo?.id}/rack/${rackInfo?.id}`);
      })
      .catch(function (err) {
        console.error('err', err?.response);
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
          permissionKey: PermissionList.UPDATE_PRODUCTS_LOCATION.key,
          userPermissionList: userPermissions,
        });
        if (result) {
          setIsPermitted(true);
          // setPageLoading(false);
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

  useEffect(
    function () {
      if (!isPermitted) {
        return;
      }

      if (!stringIsNotEmpty(productStockId)) {
        redirectTo(`/lots`);
      } else {
        setPageLoading(true);
        getProductStockInfoById({
          accessToken: auth?.accessToken,
          productStockId: productStockId,
        })
          .then(function ({ data: resData }) {
            console.info('getProductStockInfoById resData', resData);
            setProductStockInfo({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setPageLoading(false);
          });
      }
    },
    [isPermitted, productStockId]
  );

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
                  <BasicInfoForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    defaultValue={{
                      quantity: finalData?.quantity,
                    }}
                    productStockInfo={productStockInfo}
                  />
                )}
                {currStep === 2 && (
                  <SelectLotForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    defaultValue={{
                      lotId: lotInfo?.id,
                    }}
                    defaultLotInfo={lotInfo}
                    updateLotInfo={updateLotInfo}
                    defaultSelectedCount={selectedLotCount}
                    updateSelectedCount={setSelectedLotCount}
                  />
                )}
                {currStep === 3 && (
                  <SelectRackForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    defaultValue={{
                      rackId: rackInfo?.id,
                    }}
                    defaultRackInfo={rackInfo}
                    updateRackInfo={updateRackInfo}
                    defaultSelectedCount={selectedRackCount}
                    updateSelectedCount={setSelectedRackCount}
                    defaultLotInfo={lotInfo}
                  />
                )}
                {currStep === 4 && (
                  <PreviewForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    defaultValue={{ ...finalData }}
                    submitFinalData={submitFinalData}
                    productStockInfo={productStockInfo}
                    lotInfo={lotInfo}
                    rackInfo={rackInfo}
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

export default UpdateProductStockMain;
