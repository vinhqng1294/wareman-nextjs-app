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
import SelectCustomerForm from './select-customer-form/select-customer-form.component';
import ProductItemForm from './product-item-form/product-item-form.component';
import { PermissionList } from '@/utils/permission-list.enum';
import { checkPermission } from '@/utils/commons/checkPermission.utils';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { getCurrentUserPermission } from '@/apis/authentication.api';
import { addWarehouseExportRequest } from '@/apis/warehouse-export-request.api';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const CreateWarehouseExportRequestMain = function ({ ...props }) {
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
      title: 'Ch???n kh??ch h??ng',
      subTitle: 'Vui l??ng ch???n 1 kh??ch h??ng',
    },
    3: {
      title: 'Ch???n s???n ph???m',
      subTitle: 'Vui l??ng ch???n c??c s???n ph???m cho y??u c???u xu???t kho n??y',
    },
    4: {
      title: 'Nh???p th??ng tin s???n ph???m',
      subTitle: 'Vui l??ng ??i???n c??c th??ng tin c???n thi???t cho s???n ph???m n??y',
    },
    5: {
      // title: 'Ki???m tra l???i th??ng tin',
      subTitle: 'Vui l??ng ki???m tra l???i th??ng tin tr?????c khi g???i y??u c???u',
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
    customerId: '',
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

  const [customerInfo, setCustomerInfo] = useState({});
  const updateCustomerInfo = function ({ data, ...props }) {
    setCustomerInfo(data);
  };
  const [selectedCustomerCount, setSelectedCustomerCount] = useState(0);
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
    await addWarehouseExportRequest({
      accessToken: auth?.accessToken,
      reqData: { ...finalData },
    })
      .then(function ({ data: resData }) {
        // console.info('add product resData', resData);
        redirectTo('/warehouse-export-requests/'.concat(resData?.data?.id));
      })
      .catch(function (err) {
        console.error('err', err?.response);
        setErrorMsg('???? c?? l???i x???y ra. Vui l??ng th??? l???i!');
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
            setErrorMsg('???? c?? l???i x???y ra. Vui l??ng th??? l???i!');
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
                  <SelectCustomerForm
                    formHeader={addProductSteps[currStep]}
                    handleNextStep={handleNextStep}
                    updateFinalData={updateFinalData}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    defaultValue={{
                      customerId: finalData?.customerId,
                    }}
                    defaultCustomerInfo={customerInfo}
                    updateCustomerInfo={updateCustomerInfo}
                    defaultSelectedCount={selectedCustomerCount}
                    updateSelectedCount={setSelectedCustomerCount}
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
                    customerInfo={customerInfo}
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

export default CreateWarehouseExportRequestMain;
