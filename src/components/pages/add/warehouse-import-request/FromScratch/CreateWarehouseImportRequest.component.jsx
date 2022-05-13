import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import FormScreenLayout from '@/layouts/FormScreen.layout';
import BasicInfoForm from './basic-info-form.component';
import { useState } from 'react';
import SelectProductsForm from './select-products-form/select-products-form.component';
import PreviewForm from './preview-form/preview-form.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import { addPurchaseOrder } from '@/apis/purchase-order.api';
import SelectProviderForm from './select-provider-form/select-provider-form.component';
import ProductItemForm from './product-item-form/product-item-form.component';
import { PermissionList } from '@/utils/permission-list.enum';
import { checkPermission } from '@/utils/commons/checkPermission.utils';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { getCurrentUserPermission } from '@/apis/authentication.api';
import { addWarehouseImportRequest } from '@/apis/warehouse-import-request.api';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const CreateWarehouseImportRequestMain = function ({ ...props }) {
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

  const addProductSteps = {
    1: {
      title: '',
      subTitle: '',
    },
    2: {
      title: 'Chọn nhà cung cấp',
      subTitle: 'Vui lòng chọn 1 nhà cung cấp',
    },
    3: {
      title: 'Chọn sản phẩm',
      subTitle: 'Vui lòng chọn các sản phẩm cho yêu cầu nhập kho này',
    },
    4: {
      title: 'Nhập thông tin sản phẩm',
      subTitle: 'Vui lòng điền các thông tin cần thiết cho sản phẩm này',
    },
    5: {
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
    // customDateTime: '',
  });
  const updateFinalData = function ({ data, ...props }) {
    setFinalData({ ...finalData, ...data });
  };
  console.info('finalData', finalData);

  const [isEditProductItem, setIsEditProductItem] = useState(false);
  const updateIsEditProductItem = function () {
    setIsEditProductItem(!isEditProductItem);
  };

  const [providerInfo, setProviderInfo] = useState({});
  const updateProviderInfo = function ({ data, ...props }) {
    setProviderInfo(data);
  };
  const [selectedProviderCount, setSelectedProviderCount] = useState(0);
  // console.info('providerInfo', providerInfo);
  // console.info('selectedProviderCount', selectedProviderCount);

  const [productInfoList, setProductInfoList] = useState([]);
  const updateProductInfoList = function ({ data, ...props }) {
    setProductInfoList(data);
  };
  const [selectedProductCount, setSelectedProductCount] = useState(0);
  const [selectedProductItemData, setSelectedProductItemData] = useState({});
  console.info('productInfoList', productInfoList);
  // console.info('selectedProductCount', selectedProductCount);
  // console.info('selectedProductItemData', selectedProductItemData);

  const submitFinalData = async function ({ ...props }) {
    console.info('submit finalData', finalData);
    await addWarehouseImportRequest({
      accessToken: auth?.accessToken,
      reqData: { ...finalData },
    })
      .then(function ({ data: resData }) {
        // console.info('add product resData', resData);
        redirectTo('/warehouse-import-requests/'.concat(resData?.data?.id));
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
                  <BasicInfoForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    defaultValue={{
                      name: finalData?.name,
                      description: finalData?.description,
                      notes: finalData?.notes,
                      // customDateTime: finalData?.customDateTime,
                    }}
                  />
                )}
                {currStep === 2 && (
                  <SelectProviderForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    defaultValue={{
                      providerId: finalData?.providerId,
                    }}
                    defaultProviderInfo={providerInfo}
                    updateProviderInfo={updateProviderInfo}
                    defaultSelectedCount={selectedProviderCount}
                    updateSelectedCount={setSelectedProviderCount}
                  />
                )}
                {currStep === 3 && (
                  <SelectProductsForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    defaultValue={{
                      products: finalData?.products,
                    }}
                    defaultProductInfoList={productInfoList}
                    updateProductInfoList={updateProductInfoList}
                    defaultSelectedCount={selectedProductCount}
                    updateDefaultSelectedCount={setSelectedProductCount}
                    updateSelectedProductItemData={setSelectedProductItemData}
                  />
                )}
                {currStep === 4 && (
                  <ProductItemForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    selectedProductItemData={{ ...selectedProductItemData }}
                    defaultValue={
                      [...finalData?.products].find(function (item) {
                        if (
                          item?.productId === selectedProductItemData?.data?.id
                        ) {
                          return item;
                        }
                      }) ?? {
                        quantity: 1,
                        priceBeforeTax: 0,
                        taxPercentage: 0,
                      }
                    }
                    defaultProductList={finalData?.products}
                    defaultProductInfoList={productInfoList}
                    updateProductInfoList={updateProductInfoList}
                    isEditProductItem={isEditProductItem}
                    updateIsEditProductItem={updateIsEditProductItem}
                  />
                )}
                {currStep === 5 && (
                  <PreviewForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    defaultValue={{ ...finalData }}
                    userData={auth?.user1}
                    productInfoList={productInfoList}
                    submitFinalData={submitFinalData}
                    updateProductInfoList={updateProductInfoList}
                    providerInfo={providerInfo}
                    updateSelectedProductItemData={setSelectedProductItemData}
                    isEditProductItem={isEditProductItem}
                    updateIsEditProductItem={updateIsEditProductItem}
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
