import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { SvgIcon } from '@/utils/global.enums';
import React from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import AddroleHeader from '../add-role-header.component';
import AttributeInputFields from './attribute-input-fields.component';
import { useState } from 'react';

const roleSpecsForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  defaultValue,
  ...props
}) {
  const defaultAddressInfo = {
    address: '',
    addressIsFactory: false,
    addressIsHq: false,
    addressIsOffice: false,
  }

  const continueBtnOnClick = function () {
    if (isFunction(handleNextStep)) {
      handleNextStep({});
    }
  };
  const backBtnOnClick = function () {
    if (isFunction(handleNextStep)) {
      handleNextStep({ isPrev: true });
    }
  };

  return (
    <React.Fragment>
      <AddroleHeader
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
              {defaultValue?.addresses?.map((item, i) => {
                return (
                  <AttributeInputFields
                    key={i}
                    index={i}
                    updateFinalData={updateFinalData}
                    defaultValue={defaultValue}
                  />
              )})}
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
                  updateFinalData({...defaultValue, addresses: defaultValue?.addresses.push(defaultAddressInfo)});
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

export default roleSpecsForm;
