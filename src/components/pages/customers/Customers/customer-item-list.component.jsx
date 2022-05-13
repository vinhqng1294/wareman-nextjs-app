import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import CustomerItem from './customer-item.component';
import { useEffect, useState } from 'react';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import { ButtonType } from '@/components/ui/button/button.enum';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { getCustomers } from '@/apis/customer.api';

const CustomerItemList = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(true);

  const [customerList, setCustomerList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const handleLoadMore = function () {
    setComponentLoading(!componentLoading);
    setCurrPage(currPage + 1);
  };

  useEffect(
    function () {
      if (stringIsNotEmpty(accessToken)) {
        setComponentLoading(true);
        getCustomers({
          accessToken: accessToken,
          reqData: {
            page: currPage,
            size: pageSize,
          },
        })
          .then(function ({ data: resData }) {
            setCustomerList([...customerList, ...resData?.data]);
            setTotalDataCount(resData?.paginationData?.totalResultsCount ?? 0);
            setComponentLoading(!componentLoading);
          })
          .catch(function (err) {
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
      {arrayIsNotEmpty(customerList) ? (
        <React.Fragment>
          <div
            className={'flex flex-col'
              .concat(' w-full max-w-4xl')
              .concat(' py-8')}
          >
            <TableHeader />
            {[...customerList].map(function (customerInfo, index) {
              return (
                <React.Fragment key={index}>
                  <CustomerItem index={index} customerItemData={customerInfo} />
                </React.Fragment>
              );
            })}
          </div>
          {customerList?.length < totalDataCount &&
            (componentLoading ? (
              <React.Fragment>
                <div className='flex flex-col items-center py-10 px-3'>
                  <DotLoader loading={componentLoading} />
                </div>
              </React.Fragment>
            ) : (
              <div className='flex items-center justify-center'>
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
            <EmptyListInfo itemLabel={'khách hàng'} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CustomerItemList;

const TableHeader = function () {
  return (
    <React.Fragment>
      <div
        className={
          'flex'.concat(' border-b border-gray-200')
          // .concat(' hover:bg-zinc-50')
        }
      >
        <div
          className={'flex w-16 flex-none'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>#</p>
        </div>
        <div
          className={'flex w-full'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Tên khách hàng</p>
        </div>
        <div
          className={'flex w-40 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Ngày tạo</p>
        </div>
        {/* <div
          className={'flex w-40 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Cập nhật ngày</p>
        </div> */}
        {/* <div
          className={'flex w-40 flex-none'
            .concat(' items-center justify-end')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'></p>
        </div> */}
      </div>
    </React.Fragment>
  );
};
