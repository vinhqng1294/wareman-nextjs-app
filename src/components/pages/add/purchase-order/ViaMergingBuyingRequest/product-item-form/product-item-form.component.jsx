import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import SimpleBarReact from 'simplebar-react';
import FormHeader from '../form-header.component';
import ProductInfo from './product-info.component';
import DataInputSection from './data-input-section.component';

const ProductItemForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  selectedProductItemData,
  defaultValue,
  defaultProductList,
  defaultProductInfoList,
  updateProductInfoList,
  isEditProductItem,
  updateIsEditProductItem,
  ...props
}) {
  console.info('ProductItemForm defaultValue', defaultValue);
  const [finalInputData, setFinalInputData] = useState({
    sourceUomId: defaultValue?.sourceUomId,
    sourceQuantity: defaultValue?.sourceQuantity,
    destQuantity: defaultValue?.destQuantity,
    priceBeforeTax: defaultValue?.priceBeforeTax,
    taxPercentage: defaultValue?.taxPercentage,
  });
  const [inputValidation, setInputValidation] = useState({
    sourceUomId: true,
    sourceQuantity: true,
    destQuantity: true,
    priceBeforeTax: true,
    taxPercentage: true,
  });

  const [productInfoList, setProductInfoList] = useState(
    defaultProductInfoList ?? []
  );
  const [productList, setProductList] = useState(defaultProductList ?? []);

  const submitBtnOnClick = function () {
    if (objectIsNotEmpty(selectedProductItemData)) {
      const currProductItemData = productList[selectedProductItemData?.index];
      const mergedData = { ...currProductItemData, ...finalInputData };
      mergedData.sourceQuantity = parseFloat(mergedData.sourceQuantity);
      mergedData.destQuantity = parseFloat(mergedData.destQuantity);
      mergedData.priceBeforeTax = parseFloat(mergedData.priceBeforeTax);
      mergedData.taxPercentage = parseFloat(mergedData.taxPercentage);
      // console.info('currProductItemData', currProductItemData);
      // console.info('finalInputData', finalInputData);
      // console.info('merged', { ...currProductItemData, ...finalInputData });
      // console.info('merged', mergedData);
      productList[selectedProductItemData?.index] = {
        ...mergedData,
      };
      updateFinalData({ data: { products: productList } });
      if (isEditProductItem) {
        updateIsEditProductItem();
        handleNextStep({ step: 2 });
      } else {
        handleNextStep({ isPrev: true });
      }
    }
    // console.info('productList', productList);
  };

  const onItemRemove = function ({ index }) {
    productList.splice(index, 1);
    if (isFunction(updateProductInfoList) && isFunction(updateFinalData)) {
      updateFinalData({ data: { products: productList } });
      let tempProductInfoList = [...productInfoList];
      tempProductInfoList.splice(index, 1);
      updateProductInfoList({
        data: [...tempProductInfoList],
      });
    }
  };
  const backBtnOnClick = function () {
    if (!isEditProductItem) {
      if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
        onItemRemove({ index: selectedProductItemData?.index });
        updateFinalData({ data: { products: productList } });
        handleNextStep({ isPrev: true });
      }
    } else {
      updateIsEditProductItem();
      handleNextStep({ step: 2 });
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
            <ProductInfo
              productInfoData={{
                ...selectedProductItemData?.data,
              }}
            />
            <DataInputSection
              accessToken={accessToken}
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              productInfoData={{
                ...selectedProductItemData,
              }}
              defaultValue={{ ...finalInputData }}
              updateFinalInputData={setFinalInputData}
              inputValidation={{ ...inputValidation }}
              updateInputValidation={setInputValidation}
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
          {/* <ReactSVG
            src={SvgIcon['arrow-left']}
            className={'fill-dark'.concat(' w-4')}
          /> */}
          <p
            className={'font-semibold text-base'.concat(
              isEditProductItem ? ' text-dark' : ' text-red-500'
            )}
          >
            {isEditProductItem ? `Tr??? v???` : `Hu???`}
          </p>
        </button>
        <button
          type='button'
          className={'flex items-center justify-center'
            .concat(' rounded-full')
            .concat(' bg-blue-500')
            .concat(' px-5 py-2')
            .concat(' hover:shadow-md')
            .concat(' space-x-3')
            .concat(' xxs:w-full md:w-1/3')
            .concat(
              stringIsNotEmpty(finalInputData?.sourceUomId) &&
                finalInputData?.sourceQuantity > 0 &&
                finalInputData?.destQuantity > 0 &&
                inputValidation?.sourceUomId === true &&
                inputValidation?.sourceQuantity === true &&
                inputValidation?.destQuantity === true
                ? ' cursor-pointer'
                : ' cursor-not-allowed opacity-50'
            )}
          disabled={
            !(
              stringIsNotEmpty(finalInputData?.sourceUomId) &&
              finalInputData?.sourceQuantity > 0 &&
              finalInputData?.destQuantity > 0 &&
              inputValidation?.sourceUomId === true &&
              inputValidation?.sourceQuantity === true &&
              inputValidation?.destQuantity === true
            )
          }
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            submitBtnOnClick();
          }}
        >
          <p className='text-white font-semibold text-base'>
            {isEditProductItem ? `S???a` : `Xong`}
          </p>
          {/* <ReactSVG
            src={SvgIcon['arrow-right']}
            className={'fill-white'.concat(' w-4')}
          /> */}
        </button>
      </div>
    </React.Fragment>
  );
};

export default ProductItemForm;
