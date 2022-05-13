import { getProducts } from '@/apis/product.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import SimpleBarReact from 'simplebar-react';
import FormHeader from '../form-header.component';
import BuyingRequestItemList from './buying-request-item-list.component';

const SelectBuyingRequestsForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  defaultBuyingRequestInfoList,
  updateBuyingRequestInfoList,
  defaultSelectedCount,
  updateDefaultSelectedCount,
  ...props
}) {
  const [buyingRequestInfoList, setBuyingRequestInfoList] = useState([
    ...defaultBuyingRequestInfoList,
  ]);
  const [selectedCount, setSelectedCount] = useState(defaultSelectedCount ?? 0);
  const buyingRequestItemOnClick = function ({
    selected,
    buyingRequestItemData,
  }) {
    console.info(selected);
    console.info(buyingRequestItemData);

    if (selected) {
      buyingRequestInfoList.push(buyingRequestItemData);
      setSelectedCount(selectedCount + 1);
    } else {
      const foundIndex = [...buyingRequestInfoList].findIndex(function (item) {
        if (item?.id === buyingRequestItemData?.id) {
          return item;
        }
      });
      buyingRequestInfoList.splice(foundIndex, 1);
      setSelectedCount(selectedCount - 1);
    }
  };

  const continueBtnOnClick = function () {
    if (
      isFunction(handleNextStep) &&
      isFunction(updateBuyingRequestInfoList) &&
      isFunction(updateDefaultSelectedCount)
    ) {
      updateBuyingRequestInfoList({ data: [...buyingRequestInfoList] });
      updateDefaultSelectedCount(selectedCount);
      handleNextStep({});
    }
  };
  const backBtnOnClick = function () {
    if (
      isFunction(handleNextStep) &&
      isFunction(updateBuyingRequestInfoList) &&
      isFunction(updateDefaultSelectedCount)
    ) {
      updateBuyingRequestInfoList({ data: [...buyingRequestInfoList] });
      updateDefaultSelectedCount(selectedCount);
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
              <BuyingRequestItemList
                accessToken={accessToken}
                setErrorMsg={setErrorMsg}
                setViewErrorPopup={setViewErrorPopup}
                viewErrorPopup={viewErrorPopup}
                buyingRequestItemOnClick={buyingRequestItemOnClick}
                defaultSelectedList={buyingRequestInfoList}
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

export default SelectBuyingRequestsForm;
