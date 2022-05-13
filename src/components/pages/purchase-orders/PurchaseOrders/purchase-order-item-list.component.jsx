import { getPurchaseOrders } from '@/apis/purchase-order.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import PurchaseOrderItem from './purchase-order-item.component';

const PurchaseOrderItemList = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(true);

  const [purchaseOrderList, setPurchaseOrderList] = useState([]);
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
        getPurchaseOrders({
          accessToken: accessToken,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getPurchaseOrders resData', resData);
            setPurchaseOrderList([...purchaseOrderList, ...resData?.data]);
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
      {arrayIsNotEmpty(purchaseOrderList) ? (
        <React.Fragment>
          <div
            className={'grid xxs:px-0 xs:px-6 md:px-2'
              .concat(' xxs:grid-cols-1 xl:grid-cols-2')
              .concat(' xxs:gap-x-3 xxs:gap-y-3')
              .concat(' xs:w-full xxs:py-5 lg:py-8')}
            // className={'flex flex-col'
            //   .concat(' items-center')
            //   .concat(' space-y-4')
            //   .concat(' py-4 w-full')}
          >
            {purchaseOrderList?.map(function (purchaseOrder, index) {
              return (
                <React.Fragment key={index}>
                  <PurchaseOrderItem
                    purchaseOrderItemData={purchaseOrder}
                    accessToken={accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                  />
                </React.Fragment>
              );
            })}
          </div>

          {purchaseOrderList?.length < totalDataCount &&
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
            <EmptyListInfo itemLabel={'đơn đặt hàng'} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PurchaseOrderItemList;
