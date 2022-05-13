import CounterInput from '@/components/ui/counter-input/counter-input.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import { isNumber } from 'lodash';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import FormHeader from './form-header.component';

const BasicInfoForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  defaultValue,
  productStockInfo,
  ...props
}) {
  const [basicInfo, setBasicInfo] = useState({
    quantity: defaultValue?.quantity,
  });
  const [inputValidation, setInputValidation] = useState({
    quantity: true,
  });
  const inputFields = {
    quantity: {
      label: 'Số lượng sản phẩm muốn di chuyển',
      placeholder: '',
      errorText: 'Vui lòng nhập số lượng sản phẩm',
    },
  };

  const continueBtnOnClick = function () {
    console.info('basicInfo', basicInfo);
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { ...basicInfo } });
      handleNextStep({});
    }
  };

  const quantityOnChange = function ({ value }) {
    setBasicInfo({ ...basicInfo, quantity: parseFloat(value) });
    if (value > 0) {
      setInputValidation({ ...inputValidation, quantity: true });
    } else {
      setInputValidation({ ...inputValidation, quantity: false });
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
          <div className='flex flex-col space-y-4 px-2.5 pb-3'>
            <div className='flex flex-col'>
              <div className='flex space-x-2'>
                {/* <p
                className={'text-base text-dark font-semibold'
                  .concat(' flex-none')
                  .concat(' leading-7')}
              >
                Tên sản phẩm:
              </p> */}
                <p className={'text-2xl text-blue-500 font-semibold'}>
                  {stringIsNotEmpty(productStockInfo?.productName)
                    ? `${productStockInfo?.productName}`
                    : 'N/A'}
                </p>
              </div>
              <div className='flex space-x-2'>
                <p
                  className={'text-base text-dark'
                    .concat(' flex-none')
                    .concat('')}
                >
                  Mã đơn nhập hàng:
                </p>
                <p className={'text-base text-dark font-medium'}>
                  {stringIsNotEmpty(productStockInfo?.importId)
                    ? `${trimUUID(productStockInfo?.importId)}`.toUpperCase()
                    : 'N/A'}
                </p>
              </div>
              <div className='flex space-x-2'>
                <p
                  className={'text-base text-dark'
                    .concat(' flex-none')
                    .concat('')}
                >
                  Tên đơn nhập hàng:
                </p>
                <p className={'text-base text-dark font-medium'}>
                  {stringIsNotEmpty(productStockInfo?.importName)
                    ? `${productStockInfo?.importName}`
                    : 'N/A'}
                </p>
              </div>
              <div className='flex flex-col space-x-2'>
                <p
                  className={'text-base text-dark'
                    .concat(' flex-none')
                    .concat('')}
                >
                  Vị trí hiện tại
                </p>
                <div className='flex space-x-2 pl-10'>
                  <p className='text-base text-dark'>Phân khu:</p>
                  {stringIsNotEmpty(productStockInfo?.lotName) ? (
                    <p className='text-base text-dark font-medium'>
                      {`${productStockInfo?.lotName}`}
                    </p>
                  ) : (
                    <p className='text-base text-zinc-500 font-medium italic'>{`Chưa sắp xếp`}</p>
                  )}
                </div>
                <div className='flex space-x-2 pl-10'>
                  <p className='text-base text-dark'>Kệ:</p>
                  {stringIsNotEmpty(productStockInfo?.rackName) ? (
                    <p className='text-base text-dark font-medium'>
                      {`${productStockInfo?.rackName}`}
                    </p>
                  ) : (
                    <p className='text-base text-zinc-500 font-medium italic'>{`Chưa sắp xếp`}</p>
                  )}
                </div>
              </div>
              <div className='flex space-x-2'>
                <p
                  className={'text-base text-dark'
                    .concat(' flex-none')
                    .concat('')}
                >
                  Tổng số lượng:
                </p>
                <p className={'text-base text-dark font-medium'}>
                  {isNumber(productStockInfo?.quantity)
                    ? `${parseFloat(productStockInfo?.quantity)}`
                    : '0'}
                </p>
                <p
                  className={'text-base text-dark font-medium'}
                >{`${productStockInfo?.productUomName}`}</p>
              </div>
            </div>

            <div className='flex flex-col'>
              <label className={'mb-1 font-semibold text-base text-dark'}>
                {inputFields?.quantity?.label}
              </label>
              <div className='flex flex-none items-center space-x-3'>
                <CounterInput
                  min={0}
                  max={productStockInfo?.quantity}
                  defaultValue={basicInfo?.quantity}
                  isFloat={productStockInfo?.productUomIsFloat}
                  fractionDigits={3}
                  inputWidth={'w-56'}
                  valueOnChange={quantityOnChange}
                />
                <p className='text-base text-dark font-medium'>
                  {productStockInfo?.productUomName}
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
              inputValidation?.quantity && basicInfo?.quantity > 0
                ? ' cursor-pointer'
                : ' cursor-not-allowed opacity-50'
            )}
          disabled={!(inputValidation?.quantity && basicInfo?.quantity > 0)}
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

export default BasicInfoForm;
