import { DotLoader } from '@/components/ui/loader/loader.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import FormHeader from '../form-header.component';
import PreviewBasicInfo from './preview-basic-info.component';
import ProductItemList from './product-item-list.component';

const PreviewForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  defaultValue,
  productInfoList,
  submitFinalData,
  userData,
  customerInfo,
  saleOrderInfo,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(false);

  const [productList, setProductList] = useState(defaultValue?.products);
  const itemQuantityOnChange = function ({ newQuantity, index }) {
    // console.info(productInfoList[index]);
    productList[index].quantity = newQuantity;
    // console.info(productList);
    updateFinalData({ data: { products: productList } });
  };

  const submitBtnOnClick = async function () {
    // console.info('productList', productList);
    setComponentLoading(true);
    if (isFunction(submitFinalData)) {
      submitFinalData().finally(function () {
        setComponentLoading(false);
      });
    }
  };

  const backBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { products: productList } });
      handleNextStep({ isPrev: true });
    }
  };

  return (
    <React.Fragment>
      <FormHeader title={formHeader?.title} subTitle={formHeader?.subTitle} />
      <div
        className={'flex flex-col w-full'
          .concat(' overflow-hidden')
          .concat(' xxs:my-4 md:my-5')}
      >
        <SimpleBarReact className='h-full w-full'>
          <div className='flex flex-col space-y-6 px-2.5 pb-3'>
            <PreviewBasicInfo
              defaultValue={{
                name: defaultValue?.name,
                description: defaultValue?.description,
                notes: defaultValue?.notes,
              }}
              userData={userData}
              customerInfo={customerInfo}
            />
            <ProductItemList
              productList={productList}
              productInfoList={productInfoList}
              itemQuantityOnChange={itemQuantityOnChange}
            />
          </div>
        </SimpleBarReact>
      </div>
      <div
        className={'flex space-x-4'
          .concat(' justify-between items-center')
          .concat(' xxs:mt-auto md:mt-5')
          .concat(' py-1 px-2.5')}
      >
        <button
          type='button'
          className={
            'flex items-center justify-center'
              .concat(' rounded-full')
              .concat(' bg-white')
              .concat(' border border-zinc-200')
              .concat(' px-6 py-2')
              .concat(' hover:shadow-md')
              .concat(' space-x-3')
            // .concat(' xxs:w-full md:w-1/3')
          }
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            backBtnOnClick();
          }}
        >
          <ReactSVG
            src={SvgIcon['arrow-left']}
            className={'fill-dark'.concat(' w-4')}
          />
          <p className='text-dark font-semibold text-base'>Quay lại</p>
        </button>
        <div className={'flex flex-col'.concat(' xxs:w-full md:w-2/3')}>
          {componentLoading ? (
            <React.Fragment>
              <div className='flex items-center justify-center mx-auto'>
                <DotLoader loading={componentLoading} />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(' bg-green-500')
                  .concat(' px-5 py-2')
                  .concat(' hover:shadow-md')
                  .concat(' space-x-3')
                  .concat(' w-full')}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  submitBtnOnClick();
                }}
              >
                <p className='text-white font-semibold text-base'>Hoàn tất</p>
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PreviewForm;
