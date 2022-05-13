import { getUoms } from '@/apis/uom.api';
import { InputState } from '@/components/ui/input/input.enum';
import InputSelect from '@/components/ui/input/simple-input-select.component';
import InputText from '@/components/ui/input/simple-input-text.component';
import InputTextArea from '@/components/ui/input/simple-input-textarea.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import AddProductHeader from './add-product-header.component';

const BasicProductInfoForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  defaultValue,
  ...props
}) {
  const [productBasicInfo, setProductBasicInfo] = useState({
    barcode: defaultValue?.barcode,
    sku: defaultValue?.sku,
    name: defaultValue?.name,
    shortDescription: defaultValue?.shortDescription,
    longDescription: defaultValue?.longDescription,
    uomId: defaultValue?.uomId,
  });
  const [inputValidation, setInputValidation] = useState({
    barcode: true,
    sku: true,
    name: true,
    shortDescription: true,
    longDescription: true,
    uomId: true,
  });
  const inputFields = {
    name: {
      label: 'Tên sản phẩm',
      placeholder: 'Sản phẩm A',
      errorText: 'Tên sản phẩm không được bỏ trống',
    },
    barcode: {
      label: 'Barcode',
      placeholder: '0123456789',
      errorText: 'Barcode phải có nhiều hơn 5 ký tự',
    },
    sku: {
      label: 'SKU',
      placeholder: '0123456789',
      errorText: 'SKU phải có nhiều hơn 5 ký tự',
    },
    shortDescription: {
      label: 'Mô tả ngắn gọn',
      placeholder: '',
      errorText: '',
    },
    longDescription: {
      label: 'Mô tả chi tiết',
      placeholder: '',
      errorText: '',
    },
    uom: {
      label: 'Đơn vị đo lường',
      placeholder: 'Vui lòng chọn 1 đơn vị',
      errorText: 'Sản phẩm bắt buộc phải có đơn vị đo lường',
    },
  };

  const continueBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { ...productBasicInfo } });
      handleNextStep({});
    }
  };

  const nameOnChange = function ({ value, evt }) {
    setProductBasicInfo({ ...productBasicInfo, name: value });
    if (stringIsNotEmpty(value)) {
      setInputValidation({ ...inputValidation, name: true });
    } else {
      setInputValidation({ ...inputValidation, name: false });
    }
  };
  const barcodeOnChange = function ({ value, evt }) {
    setProductBasicInfo({ ...productBasicInfo, barcode: value });
  };
  const skuOnChange = function ({ value, evt }) {
    setProductBasicInfo({ ...productBasicInfo, sku: value });
  };
  const shortDescriptionOnChange = function ({ value, evt }) {
    setProductBasicInfo({ ...productBasicInfo, shortDescription: value });
  };
  const longDescriptionOnChange = function ({ value, evt }) {
    setProductBasicInfo({ ...productBasicInfo, longDescription: value });
  };
  const uomOnChange = function ({ selected }) {
    console.info('selected', selected);
    setProductBasicInfo({ ...productBasicInfo, uomId: selected?.value });
    if (stringIsNotEmpty(selected?.value)) {
      setInputValidation({ ...inputValidation, uomId: true });
    } else {
      setInputValidation({ ...inputValidation, uomId: false });
    }
  };

  // console.info('productBasicInfo', productBasicInfo);

  const [uomOptions, setUomOptions] = useState([]);
  const mapUomData = (data) =>
    data?.map((x) => ({
      value: x.id,
      label: x.name,
    })) ?? [];

  const findSelectListViaLabel = function (list, label) {
    return list?.find((x) => x.label === label);
  };
  const findSelectListViaValue = function (list, value) {
    return list?.find((x) => x.value === value);
  };

  useEffect(function () {
    getUoms({
      accessToken,
      reqData: { page: 1, pageSize: 100, keyword: `""` },
    })
      .then(function ({ data: resData }) {
        // console.info('getUoms resData', resData);
        const uomList = resData?.data ?? [];
        setUomOptions(mapUomData(uomList));
      })
      .catch(function (err) {
        console.error('err', err.response);
        setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      });
  }, []);

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
          <div className='flex flex-col space-y-4 px-2.5 pb-3'>
            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.name?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.name
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.name?.placeholder}
                defaultText={productBasicInfo?.name}
                onChange={nameOnChange}
              />
              {!inputValidation?.name &&
                stringIsNotEmpty(inputFields?.name?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.name?.errorText}
                    </p>
                  </div>
                )}
            </div>

            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.uom?.label}
              </label>
              <InputSelect
                searchBoxId={'select-uom-search-box'}
                inputState={
                  !inputValidation?.uomId
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.uom?.placeholder}
                onChange={uomOnChange}
                options={uomOptions}
                defaultValue={findSelectListViaValue(
                  uomOptions,
                  productBasicInfo?.uomId
                )}
              />
              {!inputValidation?.uomId &&
                stringIsNotEmpty(inputFields?.uom?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.uom?.errorText}
                    </p>
                  </div>
                )}
            </div>

            {/* <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.barcode?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.barcode
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.barcode?.placeholder}
                defaultText={productBasicInfo?.barcode}
                onChange={barcodeOnChange}
              />
              {!inputValidation?.barcode &&
                stringIsNotEmpty(inputFields?.barcode?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.barcode?.errorText}
                    </p>
                  </div>
                )}
            </div>

            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.sku?.label}
              </label>
              <InputText
                inputState={
                  !inputValidation?.sku ? InputState.danger : InputState.default
                }
                placeholder={inputFields?.sku?.placeholder}
                defaultText={productBasicInfo?.sku}
                onChange={skuOnChange}
              />
              {!inputValidation?.sku &&
                stringIsNotEmpty(inputFields?.sku?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.sku?.errorText}
                    </p>
                  </div>
                )}
            </div> */}

            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.shortDescription?.label}
              </label>
              <InputTextArea
                inputState={
                  !inputValidation?.shortDescription
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.shortDescription?.placeholder}
                defaultText={productBasicInfo?.shortDescription}
                rows={5}
                onChange={shortDescriptionOnChange}
              />
              {!inputValidation?.shortDescription &&
                stringIsNotEmpty(inputFields?.shortDescription?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.shortDescription?.errorText}
                    </p>
                  </div>
                )}
            </div>

            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.longDescription?.label}
              </label>
              <InputTextArea
                inputState={
                  !inputValidation?.longDescription
                    ? InputState.danger
                    : InputState.default
                }
                placeholder={inputFields?.longDescription?.placeholder}
                defaultText={productBasicInfo?.longDescription}
                rows={5}
                onChange={longDescriptionOnChange}
              />
              {!inputValidation?.longDescription &&
                stringIsNotEmpty(inputFields?.longDescription?.errorText) && (
                  <div className='flex space-x-2 items-center mt-1.5'>
                    <ReactSVG
                      src={SvgIcon['exclamation-sr']}
                      className='w-5 h-5 fill-red-500 flex-none'
                    />
                    <p className='text-red-500 text-base'>
                      {inputFields?.longDescription?.errorText}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </SimpleBarReact>
      </div>
      <div
        className={'flex flex-col'
          .concat(' justify-between items-center')
          .concat(' xxs:mt-auto md:mt-5')
          .concat(' py-1 px-2.5')}
      >
        <button
          type='button'
          className={'flex items-center justify-center'
            .concat(' rounded-full')
            .concat(' bg-blue-500')
            .concat(' px-5 py-2')
            .concat(' hover:shadow-md')
            .concat(' space-x-3')
            .concat(' xxs:w-full md:w-2/3')
            .concat(
              inputValidation?.name &&
                inputValidation?.uomId &&
                stringIsNotEmpty(productBasicInfo?.name) &&
                stringIsNotEmpty(productBasicInfo?.uomId)
                ? ' cursor-pointer'
                : ' cursor-not-allowed opacity-50'
            )}
          disabled={
            !(
              inputValidation?.name &&
              inputValidation?.uomId &&
              stringIsNotEmpty(productBasicInfo?.name) &&
              stringIsNotEmpty(productBasicInfo?.uomId)
            )
          }
          onClick={function (evt) {
            evt?.preventDefault();
            evt?.stopPropagation();
            continueBtnOnClick();
          }}
        >
          <p className='text-white font-semibold text-base'>Tiếp tục</p>
          <ReactSVG
            src={SvgIcon['arrow-right']}
            className={'fill-white'.concat(' w-3.5')}
          />
        </button>
      </div>
    </React.Fragment>
  );
};

export default BasicProductInfoForm;
