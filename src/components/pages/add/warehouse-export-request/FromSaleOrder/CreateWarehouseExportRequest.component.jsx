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
import { DotLoader } from '@/components/ui/loader/loader.component';
import { isNumber } from 'lodash';
import { addWarehouseExportRequestFromSaleOrder } from '@/apis/warehouse-export-request.api';
import { Action_ExportRequest } from '@/redux/warehouse-export-request/export-request.action';
import {
  getSaleOrderInfoById,
  getSaleOrderProducts,
} from '@/apis/sale-order.api';
import { PermissionList } from '@/utils/permission-list.enum';
import { checkPermission } from '@/utils/commons/checkPermission.utils';
import { getCurrentUserPermission } from '@/apis/authentication.api';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const CreateWarehouseImportRequestMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const { auth, warehouseExportRequest } = useSelector(
    (state) => ({
      auth: state?.auth,
      warehouseExportRequest: state?.warehouseExportRequest,
    }),
    shallowEqual
  );

  const { saleOrderId } = warehouseExportRequest?.createExportRequest;
  console.info('saleOrderId', saleOrderId);

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

  const [saleOrderInfo, setSaleOrderInfo] = useState({});
  const [warehouseExportRequestRes, setWarehouseExportRequestRes] = useState(
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
    await addWarehouseExportRequestFromSaleOrder({
      accessToken: auth?.accessToken,
      saleOrderId: saleOrderId,
      reqData: { ...finalData },
    })
      .then(function ({ data: resData }) {
        // console.info('addWarehouseExportRequest resData', resData);
        setWarehouseExportRequestRes(resData?.data);
        dispatch(Action_ExportRequest.ClearCreateExportData({}));
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
          permissionKey: PermissionList.CREATE_EXPORT.key,
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

      if (!stringIsNotEmpty(saleOrderId)) {
        if (objectIsNotEmpty(warehouseExportRequestRes)) {
          redirectTo(
            '/warehouse-export-requests/'.concat(warehouseExportRequestRes?.id)
          );
        } else {
          redirectTo(`/`);
        }
      } else {
        setPageLoading(true);
        getSaleOrderInfoById({
          accessToken: auth?.accessToken,
          saleOrderId: saleOrderId,
        })
          .then(function ({ data: resData }) {
            console.info('getSaleOrderInfoById resData', resData);
            setSaleOrderInfo({ ...resData?.data });
          })
          .then(async function () {
            await getSaleOrderProducts({
              accessToken: auth?.accessToken,
              saleOrderId: saleOrderId,
              reqData: {
                page: currPage,
                size: pageSize,
                // keyword: `""`,
              },
            })
              .then(function ({ data: resData }) {
                console.info('getSaleOrderProducts resData', resData);
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
    [isPermitted, saleOrderId]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(saleOrderInfo)) {
        updateFinalData({
          data: {
            name: `Yêu cầu xuất kho từ đơn bán hàng: ${saleOrderInfo?.name}`,
            customerId: stringIsNotEmpty(saleOrderInfo?.customerId)
              ? saleOrderInfo?.customerId
              : '',
          },
        });
      }
    },
    [saleOrderInfo]
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
            uomId: stringIsNotEmpty(currProductInfo?.uomId)
              ? currProductInfo?.uomId
              : '',
            quantity:
              isNumber(currProductInfo?.quantity) &&
              currProductInfo?.quantity >= 0
                ? currProductInfo?.quantity
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
                    customerInfo={{
                      id: saleOrderInfo?.customerId,
                      name: saleOrderInfo?.customerName,
                    }}
                    saleOrderInfo={saleOrderInfo}
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
