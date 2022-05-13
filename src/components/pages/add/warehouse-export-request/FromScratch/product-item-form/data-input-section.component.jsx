import { getUoms } from '@/apis/uom.api';
import CounterInput from '@/components/ui/counter-input/counter-input.component';
import { InputState } from '@/components/ui/input/input.enum';
import InputSelect from '@/components/ui/input/simple-input-select.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

const DataInputSection = function ({
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  productInfoData,
  defaultValue,
  updateFinalInputData,
  inputValidation,
  updateInputValidation,
  ...props
}) {
  const [inputData, setInputData] = useState({
    quantity: defaultValue?.quantity,
    priceBeforeTax: defaultValue?.priceBeforeTax,
    taxPercentage: defaultValue?.taxPercentage,
  });
  const inputFields = {
    quantity: {
      label: 'Xuất kho với số lượng là bao nhiêu?',
      placeholder: '',
      errorText: 'Vui lòng nhập số lượng',
    },
    priceBeforeTax: {
      label: 'Giá thành sản phẩm trước thuế là bao nhiêu?',
      placeholder: '',
      errorText: 'Vui lòng nhập giá trước thuế',
    },
    taxPercentage: {
      label: 'Sản phẩm chịu bao nhiêu phần trăm thuế?',
      placeholder: '',
      errorText: 'Vui lòng nhập thuế',
    },
  };

  const quantityOnChange = function ({ value }) {
    setInputData({ ...inputData, quantity: value });
    if (isFunction(updateFinalInputData)) {
      updateFinalInputData({ ...inputData, quantity: parseFloat(value) });
    }
    if (value > 0) {
      updateInputValidation({ ...inputValidation, quantity: true });
    } else {
      updateInputValidation({ ...inputValidation, quantity: false });
    }
  };
  const priceBeforeTaxOnChange = function ({ value }) {
    setInputData({ ...inputData, priceBeforeTax: value });
    if (isFunction(updateFinalInputData)) {
      updateFinalInputData({ ...inputData, priceBeforeTax: parseFloat(value) });
    }
  };
  const taxPercentageOnChange = function ({ value }) {
    setInputData({ ...inputData, taxPercentage: value });
    if (isFunction(updateFinalInputData)) {
      updateFinalInputData({ ...inputData, taxPercentage: parseFloat(value) });
    }
  };

  console.info('inputData', inputData);

  console.info('productInfoData', productInfoData);

  return (
    <React.Fragment>
      <div className='flex flex-col'>
        <div className='flex flex-col space-y-4 pr-2.5 pb-3'>
          <div className='flex flex-col'>
            <label className={'mb-1 font-semibold text-base text-dark'}>
              {inputFields?.quantity?.label}
            </label>
            <div className='flex flex-none items-center space-x-3'>
              <CounterInput
                min={0}
                // max={1000}
                defaultValue={inputData?.quantity}
                isFloat={productInfoData?.data?.uomIsFloat}
                fractionDigits={3}
                inputWidth={'w-56'}
                valueOnChange={quantityOnChange}
              />
              <p className='text-base text-dark font-medium'>
                {productInfoData?.data?.uomName}
              </p>
            </div>
            {!inputValidation?.quantity &&
              stringIsNotEmpty(inputFields?.quantity?.errorText) && (
                <div className='flex space-x-2 items-center mt-1.5'>
                  <ReactSVG
                    src={SvgIcon['exclamation-sr']}
                    className='w-5 h-5 fill-red-500 flex-none'
                  />
                  <p className='text-red-500 text-base'>
                    {inputFields?.quantity?.errorText}
                  </p>
                </div>
              )}
          </div>
          <div className='flex flex-col'>
            <label className={'mb-1 font-semibold text-base text-dark'}>
              {inputFields?.priceBeforeTax?.label}
            </label>
            <div className='flex flex-none items-center space-x-3'>
              <CounterInput
                min={0}
                // max={1000}
                defaultValue={inputData?.priceBeforeTax}
                inputWidth={'w-56'}
                valueOnChange={priceBeforeTaxOnChange}
              />
              <p className='text-base text-dark font-medium'>₫</p>
            </div>
            {!inputValidation?.priceBeforeTax &&
              stringIsNotEmpty(inputFields?.priceBeforeTax?.errorText) && (
                <div className='flex space-x-2 items-center mt-1.5'>
                  <ReactSVG
                    src={SvgIcon['exclamation-sr']}
                    className='w-5 h-5 fill-red-500 flex-none'
                  />
                  <p className='text-red-500 text-base'>
                    {inputFields?.priceBeforeTax?.errorText}
                  </p>
                </div>
              )}
          </div>
          <div className='flex flex-col'>
            <label className={'mb-1 font-semibold text-base text-dark'}>
              {inputFields?.taxPercentage?.label}
            </label>
            <div className='flex flex-none items-center space-x-3'>
              <CounterInput
                min={0}
                // max={1000}
                defaultValue={inputData?.taxPercentage}
                inputWidth={'w-24'}
                isFloat
                // fractionDigits={1}
                valueOnChange={taxPercentageOnChange}
              />
              <p className='text-base text-dark font-medium'>%</p>
            </div>
            {!inputValidation?.taxPercentage &&
              stringIsNotEmpty(inputFields?.taxPercentage?.errorText) && (
                <div className='flex space-x-2 items-center mt-1.5'>
                  <ReactSVG
                    src={SvgIcon['exclamation-sr']}
                    className='w-5 h-5 fill-red-500 flex-none'
                  />
                  <p className='text-red-500 text-base'>
                    {inputFields?.taxPercentage?.errorText}
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DataInputSection;
