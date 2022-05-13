import { getCustomers } from '@/apis/customer.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { isFunction, isInteger } from '@/utils/commons/checkVariableType.utils';
import {
  arrayIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import FormHeader from '../form-header.component';
import CustomerItemList from './customer-item-list.component';

const SelectCustomerForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  defaultValue,
  defaultCustomerInfo,
  updateCustomerInfo,
  defaultSelectedCount,
  updateSelectedCount,
  ...props
}) {
  const [selectedCustomer, setSelectedCustomer] = useState(
    defaultValue?.customerId
  );
  const [customerInfo, setCustomerInfo] = useState(defaultCustomerInfo);
  const [selectedCount, setSelectedCount] = useState(defaultSelectedCount ?? 0);
  const customerItemOnClick = function ({ selected, customerItemData }) {
    // console.info(selected);
    // console.info(customerItemData);

    if (selected) {
      setSelectedCustomer(customerItemData?.id);
      setCustomerInfo({ ...customerItemData });
      if (objectIsNotNull(setSelectedCount) && isInteger(selectedCount)) {
        setSelectedCount(selectedCount + 1);
      }
    } else {
      setSelectedCustomer('');
      setCustomerInfo({});
      if (objectIsNotNull(setSelectedCount) && isInteger(selectedCount)) {
        setSelectedCount(selectedCount - 1);
      }
    }
  };
  // console.info(selectedCount);

  const continueBtnOnClick = function () {
    if (
      isFunction(handleNextStep) &&
      isFunction(updateFinalData) &&
      isFunction(updateCustomerInfo) &&
      isFunction(updateSelectedCount)
    ) {
      updateFinalData({ data: { customerId: selectedCustomer } });
      updateCustomerInfo({ data: { ...customerInfo } });
      updateSelectedCount(selectedCount);
      handleNextStep({});
    }
  };
  const backBtnOnClick = function () {
    if (
      isFunction(handleNextStep) &&
      isFunction(updateFinalData) &&
      isFunction(updateCustomerInfo) &&
      isFunction(updateSelectedCount)
    ) {
      updateFinalData({ data: { customerId: selectedCustomer } });
      updateCustomerInfo({ data: { ...customerInfo } });
      updateSelectedCount(selectedCount);
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
          <div className='flex flex-col space-y-6 px-2.5 pt-1.5 pb-3'>
            <div className={'flex flex-col w-full'}>
              <CustomerItemList
                accessToken={accessToken}
                setErrorMsg={setErrorMsg}
                setViewErrorPopup={setViewErrorPopup}
                viewErrorPopup={viewErrorPopup}
                customerItemOnClick={customerItemOnClick}
                defaultSelectedCustomer={selectedCustomer}
                selectedCount={selectedCount}
              />
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
            .concat(' xxs:w-full md:w-2/3')
            .concat(
              selectedCount > 0
                ? ' cursor-pointer'
                : ' cursor-not-allowed opacity-50'
            )}
          disabled={selectedCount === 0}
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

export default SelectCustomerForm;
