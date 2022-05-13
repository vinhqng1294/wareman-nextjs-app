import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import AddProductHeader from '../add-product-header.component';
import AttributeInputFields from './attribute-input-fields.component';

const ProductSpecsForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  defaultValue,
  ...props
}) {
  const [attributeCompList, setAttributeCompList] = useState([]);
  const [compInputList, setCompInputList] = useState([]);

  const attrNameOnChange = function ({ compIndex, value }) {
    console.info(`attrName ${compIndex}`, value);
    compInputList[compIndex].attributeName = value;
    console.info('compInputList', compInputList);
  };
  const attrValueOnChange = function ({ compIndex, value }) {
    console.info(`attrValue ${compIndex}`, value);
    compInputList[compIndex].attributeValue = value;
    console.info('compInputList', compInputList);
  };
  const onAttrItemRemove = function ({ compIndex }) {
    attributeCompList.splice(compIndex, 1);
    compInputList.splice(compIndex, 1);
    setAttributeCompList([...attributeCompList]);
  };

  const addAttributeOnClick = function ({
    defaultValue = { attributeName: '', attributeValue: '' },
  }) {
    attributeCompList.push(
      <AttributeInputFields
        index={attributeCompList?.length ?? 0}
        defaultValue={defaultValue}
        attrNameOnChange={attrNameOnChange}
        attrValueOnChange={attrValueOnChange}
        onItemRemove={onAttrItemRemove}
      />
    );
    setAttributeCompList([...attributeCompList]);
    compInputList.push(defaultValue);
  };

  const processingData = function () {
    let productSpecs = [];
    compInputList.forEach(function (specInput, index) {
      // console.info('specInput', specInput);
      if (stringIsNotEmpty(specInput?.attributeName)) {
        productSpecs.push(specInput);
      }
    });
    // console.info('productSpecs', productSpecs);
    return [...productSpecs];
  };

  const continueBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { specs: processingData() } });
      handleNextStep({});
    }
  };
  const backBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { specs: processingData() } });
      handleNextStep({ isPrev: true });
    }
  };

  useEffect(
    function () {
      if (arrayIsNotEmpty(defaultValue?.specs ?? [])) {
        [...defaultValue?.specs].forEach(function (specData, index) {
          console.info(`specData ${index}`, specData);
          addAttributeOnClick({ defaultValue: { ...specData } });
        });
      }
    },
    [defaultValue]
  );

  return (
    <React.Fragment>
      <AddProductHeader
        title={formHeader?.title}
        subTitle={formHeader?.subTitle}
      />
      <div
        className={'flex flex-col w-full'
          .concat(' overflow-hidden')
          .concat(' xxs:my-4 md:my-5')}
      >
        <SimpleBarReact className='h-full w-full'>
          <div className='flex flex-col space-y-6 px-2.5 pb-3'>
            <div className={'flex flex-col space-y-5'}>
              {attributeCompList.map(function (AttrComp, index) {
                return <React.Fragment key={index}>{AttrComp}</React.Fragment>;
              })}
              {/* <Temp /> */}
            </div>
            <div className={'flex flex-col items-center'}>
              <button
                type='button'
                className={
                  'flex items-center justify-center'
                    .concat(' rounded-full')
                    .concat(' bg-zinc-200')
                    // .concat(' border border-zinc-200')
                    .concat(' px-5 py-2')
                    .concat(' hover:shadow-md')
                    .concat(' space-x-2')
                  // .concat(' xxs:w-full md:w-1/3')
                }
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  addAttributeOnClick({});
                }}
              >
                <ReactSVG
                  src={SvgIcon['add-sr']}
                  className={'fill-zinc-500'.concat(' w-6')}
                />
                <p className='text-zinc-600 font-semibold text-base'>
                  Thêm thuộc tính
                </p>
              </button>
            </div>
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
        <button
          type='button'
          className={'flex items-center justify-center'
            .concat(' rounded-full')
            .concat(' bg-blue-500')
            .concat(' px-5 py-2')
            .concat(' hover:shadow-md')
            .concat(' space-x-3')
            .concat(' xxs:w-full md:w-2/3')}
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            continueBtnOnClick();
          }}
        >
          <p className='text-white font-semibold text-base'>Tiếp tục</p>
          <ReactSVG
            src={SvgIcon['arrow-right']}
            className={'fill-white'.concat(' w-4')}
          />
        </button>
      </div>
    </React.Fragment>
  );
};

export default ProductSpecsForm;
