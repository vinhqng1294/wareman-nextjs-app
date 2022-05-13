import { getLots } from '@/apis/lot.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
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
import LotItemList from './lot-item-list.component';

const SelectLotForm = function ({
  formHeader,
  handleNextStep,
  updateFinalData,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  defaultValue,
  defaultLotInfo,
  updateLotInfo,
  defaultSelectedCount,
  updateSelectedCount,
  ...props
}) {
  const [selectedLot, setSelectedLot] = useState(defaultValue?.lotId);
  const [lotInfo, setLotInfo] = useState(defaultLotInfo);
  const [selectedCount, setSelectedCount] = useState(defaultSelectedCount ?? 0);
  const lotItemOnClick = function ({ selected, lotItemData }) {
    // console.info(selected);
    // console.info(providerItemData);

    if (selected) {
      setSelectedLot(lotItemData?.id);
      setLotInfo({ ...lotItemData });
      if (objectIsNotNull(setSelectedCount) && isInteger(selectedCount)) {
        setSelectedCount(selectedCount + 1);
      }
    } else {
      setSelectedLot('');
      setLotInfo({});
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
      isFunction(updateLotInfo) &&
      isFunction(updateSelectedCount)
    ) {
      updateLotInfo({ data: { ...lotInfo } });
      updateSelectedCount(selectedCount);
      handleNextStep({});
    }
  };
  const backBtnOnClick = function () {
    if (
      isFunction(handleNextStep) &&
      isFunction(updateFinalData) &&
      isFunction(updateLotInfo) &&
      isFunction(updateSelectedCount)
    ) {
      updateLotInfo({ data: { ...lotInfo } });
      updateSelectedCount(selectedCount);
      handleNextStep({ isPrev: true });
    }
  };

  const [componentLoading, setComponentLoading] = useState(true);
  const [lotList, setLotList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const handleLoadMore = function () {
    setCurrPage(currPage + 1);
  };

  useEffect(
    function () {
      if (stringIsNotEmpty(accessToken)) {
        setComponentLoading(true);
        getLots({
          accessToken: accessToken,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getLots resData', resData);
            setLotList([...lotList, ...resData?.data]);
            setTotalDataCount(resData?.paginationData?.totalResultsCount ?? 0);
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setComponentLoading(false);
          });
      }
    },
    [accessToken, currPage]
  );

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
              {arrayIsNotEmpty(lotList) ? (
                <React.Fragment>
                  <LotItemList
                    lotList={lotList}
                    lotItemOnClick={lotItemOnClick}
                    defaultSelectedLot={selectedLot}
                    selectedCount={selectedCount}
                  />
                  {lotList?.length < totalDataCount &&
                    (componentLoading ? (
                      <React.Fragment>
                        <div className='flex flex-col items-center py-10 px-3'>
                          <DotLoader loading={componentLoading} />
                        </div>
                      </React.Fragment>
                    ) : (
                      <div className='flex items-center justify-center mt-4'>
                        <RoundedButton
                          roundedFull
                          btnType={ButtonType.default}
                          text={'Tải thêm'}
                          onClick={handleLoadMore}
                        />
                      </div>
                    ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {componentLoading ? (
                    <React.Fragment>
                      <div className='flex flex-col items-center py-10 px-3'>
                        <DotLoader loading={componentLoading} />
                      </div>
                    </React.Fragment>
                  ) : (
                    <EmptyListInfo itemLabel={'phân khu'} />
                  )}
                </React.Fragment>
              )}
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

export default SelectLotForm;
