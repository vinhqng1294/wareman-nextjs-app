import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import AddProviderHeader from '../add-provider-header.component';
import AddressInputFields from './address-input-fields.component';

const AddressesForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  defaultValue,
  ...props
}) {
  const [addressCompList, setAddressCompList] = useState([]);
  const [compInputList, setCompInputList] = useState([]);

  // handle input fields
  const addressOnChange = function ({ compIndex, value }) {
    console.info(`address ${compIndex}`, value);
    compInputList[compIndex].address = value;
    console.info('compInputList', compInputList);
  };
  const addressIsFactoryOnChange = function ({ compIndex, value }) {
    console.info(`addressIsFactory ${compIndex}`, value);
    compInputList[compIndex].addressIsFactory = value;
    console.info('compInputList', compInputList);
  };
  const addressIsHqOnChange = function ({ compIndex, value }) {
    console.info(`addressIsHq ${compIndex}`, value);
    compInputList[compIndex].addressIsHq = value;
    console.info('compInputList', compInputList);
  };
  const addressIsOfficeOnChange = function ({ compIndex, value }) {
    console.info(`addressIsOffice ${compIndex}`, value);
    compInputList[compIndex].addressIsOffice = value;
    console.info('compInputList', compInputList);
  };
  const primaryPhoneOnChange = function ({ compIndex, value }) {
    console.info(`primaryPhone ${compIndex}`, value);
    compInputList[compIndex].primaryPhone = value;
    console.info('compInputList', compInputList);
  };
  const secondaryPhoneOnChange = function ({ compIndex, value }) {
    console.info(`secondaryPhone ${compIndex}`, value);
    compInputList[compIndex].secondaryPhone = value;
    console.info('compInputList', compInputList);
  };
  const primaryEmailOnChange = function ({ compIndex, value }) {
    console.info(`primaryEmail ${compIndex}`, value);
    compInputList[compIndex].primaryEmail = value;
    console.info('compInputList', compInputList);
  };
  const secondaryEmailOnChange = function ({ compIndex, value }) {
    console.info(`secondaryEmail ${compIndex}`, value);
    compInputList[compIndex].secondaryEmail = value;
    console.info('compInputList', compInputList);
  };
  // end: handle input fields

  const onAddressItemRemove = function ({ compIndex }) {
    addressCompList.splice(compIndex, 1);
    compInputList.splice(compIndex, 1);
    setAddressCompList([...addressCompList]);
  };

  const addAddressOnClick = function ({
    defaultValue = {
      address: '',
      addressIsFactory: false,
      addressIsHq: false,
      addressIsOffice: false,
      primaryPhone: '',
      secondaryPhone: '',
      primaryEmail: '',
      secondaryEmail: '',
    },
  }) {
    addressCompList.push(
      <AddressInputFields
        index={addressCompList?.length ?? 0}
        defaultValue={defaultValue}
        addressOnChange={addressOnChange}
        addressIsFactoryOnChange={addressIsFactoryOnChange}
        addressIsHqOnChange={addressIsHqOnChange}
        addressIsOfficeOnChange={addressIsOfficeOnChange}
        primaryPhoneOnChange={primaryPhoneOnChange}
        secondaryPhoneOnChange={secondaryPhoneOnChange}
        primaryEmailOnChange={primaryEmailOnChange}
        secondaryEmailOnChange={secondaryEmailOnChange}
        onItemRemove={onAddressItemRemove}
      />
    );
    setAddressCompList([...addressCompList]);
    compInputList.push(defaultValue);
  };

  const processingData = function () {
    let providerAddresses = [];
    compInputList.forEach(function (addressInput, index) {
      // console.info('specInput', specInput);
      if (stringIsNotEmpty(addressInput?.address)) {
        providerAddresses.push(addressInput);
      }
    });
    // console.info('productSpecs', productSpecs);
    return [...providerAddresses];
  };

  const continueBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { addresses: processingData() } });
      handleNextStep({});
    }
  };
  const backBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { addresses: processingData() } });
      handleNextStep({ isPrev: true });
    }
  };

  useEffect(
    function () {
      if (arrayIsNotEmpty(defaultValue?.addresses ?? [])) {
        [...defaultValue?.addresses].forEach(function (addressData, index) {
          console.info(`addressData ${index}`, addressData);
          addAddressOnClick({ defaultValue: { ...addressData } });
        });
      }
    },
    [defaultValue]
  );

  return (
    <React.Fragment>
      <AddProviderHeader
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
              {addressCompList.map(function (AddressComp, index) {
                return (
                  <React.Fragment key={index}>{AddressComp}</React.Fragment>
                );
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
                  addAddressOnClick({});
                }}
              >
                <ReactSVG
                  src={SvgIcon['add-sr']}
                  className={'fill-zinc-500'.concat(' w-6')}
                />
                <p className='text-zinc-600 font-semibold text-base'>
                  Thêm địa chỉ
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

export default AddressesForm;
