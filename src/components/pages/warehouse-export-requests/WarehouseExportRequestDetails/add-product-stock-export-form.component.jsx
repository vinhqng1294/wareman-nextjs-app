import { addProductStockExport } from '@/apis/product-stock-export.api';
import CounterInput from '@/components/ui/counter-input/counter-input.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';

const AddProductStockExportForm = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  productStockInfo,
  requestInfo,
  handleExpandRequestProductItem,
  ...props
}) {
  const [quantity, setQuantity] = useState(0);
  const inputFields = {
    quantity: {
      label: 'Xuất với số lượng bao nhiêu?',
      placeholder: '',
      errorText: 'Vui lòng nhập số lượng',
    },
  };
  const [inputValidation, setInputValidation] = useState({
    quantity: true,
  });
  const quantityOnChange = function ({ value }) {
    setQuantity(parseFloat(value));

    if (value > 0) {
      setInputValidation({ ...inputValidation, quantity: true });
    } else {
      setInputValidation({ ...inputValidation, quantity: false });
    }
  };

  const submitFinalData = function ({}) {
    const submitData = {
      productStockId: stringIsNotEmpty(productStockInfo?.id)
        ? productStockInfo?.id
        : '',
      exportId: stringIsNotEmpty(requestInfo?.id) ? requestInfo?.id : '',
      originalRackId: stringIsNotEmpty(productStockInfo?.rackId)
        ? productStockInfo?.rackId
        : '00000000-0000-0000-0000-000000000000',
      quantity: quantity,
    };
    console.info('submitData', submitData);

    addProductStockExport({
      accessToken: accessToken,
      exportId: stringIsNotEmpty(requestInfo?.id) ? requestInfo?.id : '',
      productStockId: stringIsNotEmpty(productStockInfo?.id)
        ? productStockInfo?.id
        : '',
      reqData: { ...submitData },
    })
      .then(function ({ data: resData }) {
        console.info('addProductStockExport resData', resData);
        if (isFunction(handleExpandRequestProductItem)) {
          handleExpandRequestProductItem();
        }
      })
      .catch(function (err) {
        console.error('err', err);
        console.error('err', err?.response);
        setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      });
  };

  return (
    <React.Fragment>
      <div
        className={'flex w-full'
          .concat(' items-center justify-center')
          .concat(' px-4 pt-1 pb-3')
          .concat(' space-x-10')}
      >
        <div className='flex flex-col'>
          <label className={'mb-1 font-semibold text-sm text-dark'}>
            {inputFields?.quantity?.label}
          </label>
          <div className='flex flex-none items-center space-x-3'>
            <CounterInput
              min={0}
              max={parseFloat(productStockInfo?.quantity)}
              defaultValue={quantity}
              isFloat={productStockInfo?.productUomIsFloat}
              fractionDigits={3}
              inputWidth={'w-56'}
              valueOnChange={quantityOnChange}
            />
            <p className='text-sm text-dark font-medium'>
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
                <p className='text-red-500 text-sm'>
                  {inputFields?.quantity?.errorText}
                </p>
              </div>
            )}
        </div>
        <div className='flex flex-none items-center'>
          <button
            type='button'
            className={'flex items-center justify-center'
              .concat(' rounded-full')
              .concat(' bg-green-500')
              .concat(' px-8 py-1.5')
              .concat(' hover:shadow-md')
              .concat(' space-x-3')
              // .concat(' xxs:w-full md:w-2/3')
              .concat(
                inputValidation?.quantity && quantity > 0
                  ? ' cursor-pointer'
                  : ' cursor-not-allowed opacity-50'
              )}
            disabled={!(inputValidation?.quantity && quantity > 0)}
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              submitFinalData({});
            }}
          >
            <p className='text-white font-semibold text-sm'>Đồng ý</p>
            {/* <ReactSVG
              src={SvgIcon['arrow-right']}
              className={'fill-white'.concat(' w-3.5')}
            /> */}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddProductStockExportForm;
