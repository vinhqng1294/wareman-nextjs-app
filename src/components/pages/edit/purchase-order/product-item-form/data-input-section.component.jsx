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
    sourceUomId: defaultValue?.sourceUomId,
    sourceQuantity: defaultValue?.sourceQuantity,
    destQuantity: defaultValue?.destQuantity,
    priceBeforeTax: defaultValue?.priceBeforeTax,
    taxPercentage: defaultValue?.taxPercentage,
  });
  const inputFields = {
    sourceUomId: {
      label: 'Nhập từ nhà cung cấp theo đơn vị gì?',
      placeholder: 'Vui lòng chọn 1 đơn vị đo',
      errorText: 'Vui lòng chọn 1 đơn vị đo',
    },
    sourceQuantity: {
      label: 'Nhập về từ nhà cung cấp với số lượng là bao nhiêu?',
      placeholder: '',
      errorText: 'Vui lòng nhập số lượng',
    },
    destQuantity: {
      label: 'Lưu kho với số lượng là bao nhiêu?',
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

  const [selectedSourceUomData, setSelectedSourceUomData] = useState({});
  const sourceUomOnChange = function ({ selected }) {
    console.info('selected', selected);
    const updatedValue = { ...inputData, sourceUomId: selected?.value?.id };
    setInputData({ ...updatedValue });
    if (isFunction(updateFinalInputData)) {
      updateFinalInputData({ ...updatedValue });
    }
    setSelectedSourceUomData({ ...selected?.value });
    if (stringIsNotEmpty(selected?.value?.id)) {
      updateInputValidation({ ...inputValidation, sourceUomId: true });
    } else {
      updateInputValidation({ ...inputValidation, sourceUomId: false });
    }
  };
  const sourceQuantityOnChange = function ({ value }) {
    setInputData({ ...inputData, sourceQuantity: value });
    if (isFunction(updateFinalInputData)) {
      updateFinalInputData({
        ...inputData,
        sourceQuantity: parseFloat(value),
      });
    }
    if (value > 0) {
      updateInputValidation({ ...inputValidation, sourceQuantity: true });
    } else {
      updateInputValidation({ ...inputValidation, sourceQuantity: false });
    }
  };
  const destQuantityOnChange = function ({ value }) {
    setInputData({ ...inputData, destQuantity: value });
    if (isFunction(updateFinalInputData)) {
      updateFinalInputData({ ...inputData, destQuantity: parseFloat(value) });
    }
    if (value > 0) {
      updateInputValidation({ ...inputValidation, destQuantity: true });
    } else {
      updateInputValidation({ ...inputValidation, destQuantity: false });
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

  const [uomOptions, setUomOptions] = useState([]);
  const mapUomData = (data) =>
    data?.map((x) => ({
      value: x,
      label: x.name,
    })) ?? [];

  const findSelectListViaLabel = function (list, label) {
    return list?.find((x) => x.label === label);
  };
  const findSelectListViaValue = function (list, value) {
    return list?.find((x) => {
      if (x?.value?.id === value) {
        return x;
      }
    });
  };

  useEffect(function () {
    getUoms({
      accessToken,
      reqData: { page: 1, pageSize: 100, keyword: `""` },
    })
      .then(function ({ data: resData }) {
        console.info('getUoms resData', resData);
        const uomList = resData?.data ?? [];
        setUomOptions(mapUomData(uomList));
        [...uomList]?.find(function (uomData, index) {
          if (uomData?.id === defaultValue?.sourceUomId) {
            setSelectedSourceUomData(uomData);
          }
        });
      })
      .catch(function (err) {
        console.error('err', err.response);
        setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      });
  }, []);

  console.info('productInfoData', productInfoData);

  return (
    <React.Fragment>
      <div className='flex flex-col'>
        <div className='flex flex-col space-y-4 pr-2.5 pb-3'>
          <div className='flex flex-col'>
            <label className={'mb-1 font-semibold text-base text-dark'}>
              {inputFields?.sourceUomId?.label}
            </label>
            <div className='flex w-72'>
              <InputSelect
                searchBoxId={'select-source-uom-search-box'}
                inputState={
                  !inputValidation?.sourceUomId
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.sourceUomId?.placeholder}
                onChange={sourceUomOnChange}
                options={uomOptions}
                defaultValue={findSelectListViaValue(
                  uomOptions,
                  inputData?.sourceUomId
                )}
              />
            </div>
            {!inputValidation?.sourceUomId &&
              stringIsNotEmpty(inputFields?.sourceUomId?.errorText) && (
                <div className='flex space-x-2 items-center mt-1.5'>
                  <ReactSVG
                    src={SvgIcon['exclamation-sr']}
                    className='w-5 h-5 fill-red-500 flex-none'
                  />
                  <p className='text-red-500 text-base'>
                    {inputFields?.sourceUomId?.errorText}
                  </p>
                </div>
              )}
          </div>
          {objectIsNotEmpty(selectedSourceUomData) && (
            <React.Fragment>
              <div className='flex flex-col'>
                <label className={'mb-1 font-semibold text-base text-dark'}>
                  {inputFields?.sourceQuantity?.label}
                </label>
                <div className='flex flex-none items-center space-x-3'>
                  <CounterInput
                    min={0}
                    // max={1000}
                    defaultValue={inputData?.sourceQuantity}
                    isFloat={selectedSourceUomData?.isFloat}
                    fractionDigits={3}
                    inputWidth={'w-56'}
                    valueOnChange={sourceQuantityOnChange}
                  />
                  <p className='text-base text-dark font-medium'>
                    {selectedSourceUomData?.name}
                  </p>
                </div>
                {!inputValidation?.sourceQuantity &&
                  stringIsNotEmpty(inputFields?.sourceQuantity?.errorText) && (
                    <div className='flex space-x-2 items-center mt-1.5'>
                      <ReactSVG
                        src={SvgIcon['exclamation-sr']}
                        className='w-5 h-5 fill-red-500 flex-none'
                      />
                      <p className='text-red-500 text-base'>
                        {inputFields?.sourceQuantity?.errorText}
                      </p>
                    </div>
                  )}
              </div>
              <div className='flex flex-col'>
                <label className={'mb-1 font-semibold text-base text-dark'}>
                  {inputFields?.destQuantity?.label}
                </label>
                <div className='flex flex-none items-center space-x-3'>
                  <CounterInput
                    min={0}
                    // max={1000}
                    defaultValue={inputData?.destQuantity}
                    isFloat={productInfoData?.data?.uomIsFloat}
                    fractionDigits={3}
                    inputWidth={'w-56'}
                    valueOnChange={destQuantityOnChange}
                  />
                  <p className='text-base text-dark font-medium'>
                    {productInfoData?.data?.uomName}
                  </p>
                </div>
                {!inputValidation?.destQuantity &&
                  stringIsNotEmpty(inputFields?.destQuantity?.errorText) && (
                    <div className='flex space-x-2 items-center mt-1.5'>
                      <ReactSVG
                        src={SvgIcon['exclamation-sr']}
                        className='w-5 h-5 fill-red-500 flex-none'
                      />
                      <p className='text-red-500 text-base'>
                        {inputFields?.destQuantity?.errorText}
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
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DataInputSection;
