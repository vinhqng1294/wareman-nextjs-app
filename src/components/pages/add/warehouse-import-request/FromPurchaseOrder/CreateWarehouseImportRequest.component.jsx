import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import FormScreenLayout from '@/layouts/FormScreen.layout';
import BasicInfoForm from './basic-info-form.component';
import { useState } from 'react';
import PreviewForm from './preview-form/preview-form.component';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import {
  getPurchaseOrderInfoById,
  getPurchaseOrderProducts,
} from '@/apis/purchase-order.api';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { isNumber } from 'lodash';
import {
  addWarehouseImportRequestFromPurchaseOrder,
} from '@/apis/warehouse-import-request.api';
import { Action_ImportRequest } from '@/redux/warehouse-import-request/import-request.action';
import { getCurrentUserPermission } from '@/apis/authentication.api';
import { checkPermission } from '@/utils/commons/checkPermission.utils';
import { PermissionList } from '@/utils/permission-list.enum';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const CreateWarehouseImportRequestMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const { auth, warehouseImportRequest } = useSelector(
    (state) => ({
      auth: state?.auth,
      warehouseImportRequest: state?.warehouseImportRequest,
    }),
    shallowEqual
  );

  const { purchaseOrderId } = warehouseImportRequest?.createImportRequest;
  console.info('purchaseOrderId', purchaseOrderId);

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
      // title: 'Kiểm tra lại thông tin',
      subTitle: 'Vui lòng kiểm tra lại thông tin trước khi gửi yêu cầu',
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
    name: '',
    description: '',
    notes: '',
    providerId: '',
    products: [],
  });
  const updateFinalData = function ({ data, ...props }) {
    setFinalData({ ...finalData, ...data });
  };
  console.info('finalData', finalData);

  const [purchaseOrderInfo, setPurchaseOrderInfo] = useState({});
  const [warehouseImportRequestRes, setWarehouseImportRequestRes] = useState(
    {}
  );

  const [productInfoList, setProductInfoList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const handleLoadMore = function () {
    setCurrPage(currPage + 1);
  };
  // console.info('productInfoList', productInfoList);

  const submitFinalData = async function ({ ...props }) {
    console.info('submit finalData', finalData);
    await addWarehouseImportRequestFromPurchaseOrder({
      accessToken: auth?.accessToken,
      purchaseOrderId: purchaseOrderId,
      reqData: { ...finalData },
    })
      .then(function ({ data: resData }) {
        // console.info('add product resData', resData);
        setWarehouseImportRequestRes(resData?.data);
        dispatch(Action_ImportRequest.ClearCreateImportData({}));
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
          permissionKey: PermissionList.CREATE_IMPORT.key,
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

      if (!stringIsNotEmpty(purchaseOrderId)) {
        if (objectIsNotEmpty(warehouseImportRequestRes)) {
          redirectTo(
            '/warehouse-import-requests/'.concat(warehouseImportRequestRes?.id)
          );
        } else {
          redirectTo(`/`);
        }
      } else {
        setPageLoading(true);
        getPurchaseOrderInfoById({
          accessToken: auth?.accessToken,
          purchaseOrderId: purchaseOrderId,
        })
          .then(function ({ data: resData }) {
            console.info('getPurchaseOrderInfoById resData', resData);
            setPurchaseOrderInfo({ ...resData?.data });
          })
          .then(async function () {
            await getPurchaseOrderProducts({
              accessToken: auth?.accessToken,
              purchaseOrderId: purchaseOrderId,
              reqData: {
                page: currPage,
                size: pageSize,
                // keyword: `""`,
              },
            })
              .then(function ({ data: resData }) {
                console.info('getPurchaseOrderProducts resData', resData);
                setProductInfoList([...productInfoList, ...resData?.data]);
                setTotalDataCount(
                  resData?.paginationData?.totalResultsCount ?? 0
                );
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
    [isPermitted, purchaseOrderId]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(purchaseOrderInfo)) {
        updateFinalData({
          data: {
            name: `Yêu cầu nhập kho từ đơn đặt hàng: ${purchaseOrderInfo?.name}`,
            providerId: stringIsNotEmpty(purchaseOrderInfo?.providerId)
              ? purchaseOrderInfo?.providerId
              : '',
          },
        });
      }
    },
    [purchaseOrderInfo]
  );

  useEffect(
    function () {
      if (arrayIsNotEmpty(productInfoList)) {
        let updatedFinalDataProducts = [];
        for (let i = 0; i < productInfoList?.length; i++) {
          const currProductInfo = productInfoList[i];
          // console.info('currProductInfo', currProductInfo);
          updatedFinalDataProducts.push({
            productId: stringIsNotEmpty(currProductInfo?.productId)
              ? currProductInfo?.productId
              : '',
            uomId: stringIsNotEmpty(currProductInfo?.destUomName)
              ? currProductInfo?.destUomId
              : '',
            quantity:
              isNumber(currProductInfo?.destQuantity) &&
              currProductInfo?.destQuantity >= 0
                ? currProductInfo?.destQuantity
                : 0,
            priceBeforeTax:
              isNumber(currProductInfo?.priceBeforeTax) &&
              currProductInfo?.priceBeforeTax >= 0
                ? currProductInfo?.priceBeforeTax
                : 0,
            taxPercentage:
              isNumber(currProductInfo?.taxPercentage) &&
              currProductInfo?.taxPercentage >= 0
                ? currProductInfo?.taxPercentage
                : 0,
          });
        }
        updateFinalData({
          data: {
            products: [...finalData?.products, ...updatedFinalDataProducts],
          },
        });
      }
    },
    [productInfoList]
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
                      name: finalData?.name,
                      description: finalData?.description,
                      notes: finalData?.notes,
                    }}
                  />
                )}

                {currStep === 2 && (
                  <PreviewForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    defaultValue={{ ...finalData }}
                    productInfoList={productInfoList}
                    submitFinalData={submitFinalData}
                    userData={{
                      firstName: auth?.user1?.firstName,
                      lastName: auth?.user1?.lastName,
                    }}
                    providerInfo={{
                      id: purchaseOrderInfo?.providerId,
                      name: purchaseOrderInfo?.providerName,
                    }}
                    purchaseOrderInfo={purchaseOrderInfo}
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

export default CreateWarehouseImportRequestMain;
