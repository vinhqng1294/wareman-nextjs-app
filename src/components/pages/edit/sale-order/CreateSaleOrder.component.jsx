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
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import {
  addSaleOrder,
  getSaleOrderInfoById,
  getSaleOrderProducts,
  updateSaleOrderInfoById,
} from '@/apis/sale-order.api';
import SelectCustomerForm from './select-customer-form/select-customer-form.component';
import ProductItemForm from './product-item-form/product-item-form.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { getCurrentUserPermission } from '@/apis/authentication.api';
import { checkPermission } from '@/utils/commons/checkPermission.utils';
import { PermissionList } from '@/utils/permission-list.enum';
import { useRouter } from 'next/router';
import { getCustomerInfoById } from '@/apis/customer.api';
import { getProductInfoById } from '@/apis/product.api';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const CreateSaleRequestMain = function ({ updateOrderName, ...props }) {
  const dispatch = useDispatch();
  const router = useRouter();

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
      title: 'Chọn khách hàng',
      subTitle: 'Vui lòng chọn 1 khách hàng',
    },
    3: {
      title: 'Chọn sản phẩm',
      subTitle: 'Vui lòng chọn các sản phẩm cho đơn bán hàng này',
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

  const [requestId, setRequestId] = useState(null);
  const [orderInfo, setOrderInfo] = useState({});

  const [finalData, setFinalData] = useState({
    name: '',
    description: '',
    notes: '',
    customerId: '',
    products: [],
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
  console.info('customerInfo', customerInfo);
  console.info('selectedCustomerCount', selectedCustomerCount);

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
    await updateSaleOrderInfoById({
      accessToken: auth?.accessToken,
      saleOrderId: requestId,
      reqData: { ...finalData },
    })
      .then(function ({ data: resData }) {
        // console.info('add product resData', resData);
        redirectTo('/sale-orders/'.concat(resData?.data?.id));
      })
      .catch(function (err) {
        console.error('err', err);
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
          permissionKey: PermissionList.CREATE_SO.key,
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
      if (objectIsNotEmpty(router?.query)) {
        setRequestId(router?.query?.orderId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (isPermitted && stringIsNotEmpty(requestId)) {
        // setPageLoading(true);
        getSaleOrderInfoById({
          accessToken: auth?.accessToken,
          saleOrderId: requestId,
        })
          .then(function ({ data: resData }) {
            console.info('getSaleOrderInfoById resData', resData);
            setOrderInfo({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            // setPageLoading(false);
          });
      }
    },
    [isPermitted, requestId]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(orderInfo)) {
        setTimeout(async function () {
          if (stringIsNotEmpty(orderInfo?.customerId)) {
            await getCustomerInfoById({
              accessToken: auth?.accessToken,
              customerId: orderInfo?.customerId,
            })
              .then(function ({ data: resData }) {
                console.info('getCustomerInfoById resData', resData);
                setCustomerInfo({ ...resData?.data });
                setSelectedCustomerCount(1);
              })
              .catch(function (err) {
                console.error('err', err);
                console.error('err', err.response);
                setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
                setViewErrorPopup(!viewErrorPopup);
              });
          }
          await getSaleOrderProducts({
            accessToken: auth?.accessToken,
            saleOrderId: orderInfo?.id,
            reqData: {
              // page: currPage,
              // size: pageSize,
              // keyword: `""`,
            },
          })
            .then(async function ({ data: resData }) {
              console.info('getSaleOrderProducts resData', resData);
              const rawProductList = resData?.data;
              let updatedProductList = [];
              let updatedProductInfoList = [];
              if (arrayIsNotEmpty(rawProductList)) {
                for (let i = 0; i < rawProductList.length; i++) {
                  const rawProductData = rawProductList[i];
                  updatedProductList.push({
                    productId: rawProductData?.productId ?? '',
                    uomId: rawProductData?.uomId ?? '',
                    quantity: rawProductData?.quantity ?? 0,
                    priceBeforeTax: rawProductData?.priceBeforeTax ?? 0,
                    taxPercentage: rawProductData?.taxPercentage ?? 0,
                  });

                  await getProductInfoById({
                    accessToken: auth?.accessToken,
                    productId: rawProductData?.productId ?? '',
                  })
                    .then(function ({ data: resData }) {
                      console.info('getProductInfoById resData', resData);
                      updatedProductInfoList.push({ ...resData?.data });
                    })
                    .catch(function (err) {
                      console.error('err', err);
                      console.error('err', err.response);
                      setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
                      setViewErrorPopup(!viewErrorPopup);
                    });
                }
              }
              setSelectedProductCount(updatedProductList?.length);
              setFinalData({
                name: orderInfo?.name,
                notes: orderInfo?.notes,
                description: orderInfo?.description,
                customerId: orderInfo?.customerId,
                products: [...updatedProductList],
              });
              setProductInfoList([...updatedProductInfoList]);
              updateOrderName(orderInfo?.name);
              // console.info('updatedProductList', updatedProductList);
              // console.info('updatedProductInfoList', updatedProductInfoList);
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
        }, 0);
      }
    },
    [orderInfo]
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
                        sourceUomId: '',
                        sourceQuantity: 0,
                        destQuantity: 0,
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

export default CreateSaleRequestMain;
