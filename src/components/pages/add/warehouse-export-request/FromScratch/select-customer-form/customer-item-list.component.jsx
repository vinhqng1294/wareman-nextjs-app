import { getCustomers } from '@/apis/customer.api';
import { getProviders } from '@/apis/provider.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import CustomerItem from './customer-item.component';

const CustomerItemList = function ({
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  customerItemOnClick,
  defaultSelectedCustomer,
  selectedCount,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const handleLoadMore = function () {
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
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getCustomers resData', resData);
            setCustomerList([...customerList, ...resData?.data]);
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
      {arrayIsNotEmpty(customerList) ? (
        <React.Fragment>
          <div
            className={'w-full'
              .concat(' grid grid-cols-1')
              .concat(' gap-x-2 gap-y-2.5')}
          >
            {customerList?.map(function (customer, index) {
              return (
                <React.Fragment key={index}>
                  <CustomerItem
                    customerItemData={customer}
                    customerItemOnClick={customerItemOnClick}
                    defaultSelected={defaultSelectedCustomer === customer?.id}
                    selectedCount={selectedCount}
                  />
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
              <div className='flex items-center justify-center mt-5'>
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
