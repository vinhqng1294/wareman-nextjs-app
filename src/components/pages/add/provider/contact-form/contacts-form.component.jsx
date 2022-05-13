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
import ContactInputFields from './contact-input-fields.component';

const ContactsForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  defaultValue,
  ...props
}) {
  const [contactCompList, setContactCompList] = useState([]);
  const [compInputList, setCompInputList] = useState([]);

  // handle input fields
  const nameOnChange = function ({ compIndex, value }) {
    console.info(`name ${compIndex}`, value);
    compInputList[compIndex].name = value;
    console.info('compInputList', compInputList);
  };
  const titleOnChange = function ({ compIndex, value }) {
    console.info(`title ${compIndex}`, value);
    compInputList[compIndex].title = value;
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

  const onContactItemRemove = function ({ compIndex }) {
    contactCompList.splice(compIndex, 1);
    compInputList.splice(compIndex, 1);
    setContactCompList([...contactCompList]);
  };

  const addContactOnClick = function ({
    defaultValue = {
      name: '',
      title: '',
      primaryPhone: '',
      secondaryPhone: '',
      primaryEmail: '',
      secondaryEmail: '',
    },
  }) {
    contactCompList.push(
      <ContactInputFields
        index={contactCompList?.length ?? 0}
        defaultValue={defaultValue}
        nameOnChange={nameOnChange}
        titleOnChange={titleOnChange}
        primaryPhoneOnChange={primaryPhoneOnChange}
        secondaryPhoneOnChange={secondaryPhoneOnChange}
        primaryEmailOnChange={primaryEmailOnChange}
        secondaryEmailOnChange={secondaryEmailOnChange}
        onItemRemove={onContactItemRemove}
      />
    );
    setContactCompList([...contactCompList]);
    compInputList.push(defaultValue);
  };

  const processingData = function () {
    let providerContacts = [];
    compInputList.forEach(function (contactInput, index) {
      // console.info('specInput', specInput);
      if (
        stringIsNotEmpty(contactInput?.name) &&
        stringIsNotEmpty(contactInput?.title)
      ) {
        providerContacts.push(contactInput);
      }
    });
    // console.info('productSpecs', productSpecs);
    return [...providerContacts];
  };

  const continueBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { contacts: processingData() } });
      handleNextStep({});
    }
  };
  const backBtnOnClick = function () {
    if (isFunction(handleNextStep) && isFunction(updateFinalData)) {
      updateFinalData({ data: { contacts: processingData() } });
      handleNextStep({ isPrev: true });
    }
  };

  useEffect(
    function () {
      if (arrayIsNotEmpty(defaultValue?.contacts ?? [])) {
        [...defaultValue?.contacts].forEach(function (contactData, index) {
          console.info(`contactData ${index}`, contactData);
          addContactOnClick({ defaultValue: { ...contactData } });
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
              {contactCompList.map(function (AddressComp, index) {
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
                  addContactOnClick({});
                }}
              >
                <ReactSVG
                  src={SvgIcon['add-sr']}
                  className={'fill-zinc-500'.concat(' w-6')}
                />
                <p className='text-zinc-600 font-semibold text-base'>
                  Thêm thông tin liên hệ
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

export default ContactsForm;
