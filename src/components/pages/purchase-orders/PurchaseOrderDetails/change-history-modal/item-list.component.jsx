import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import TabEmptyInfo from '../tab-empty-info.component';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import { ButtonType } from '@/components/ui/button/button.enum';
import { useDispatch } from 'react-redux';
import Item from './item.component';
import { getProductStockExportByExportId } from '@/apis/product-stock-export.api';
import { getPurchaseOrderStatusLogs } from '@/apis/purchase-order.api';

const ItemList = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  requestId,
  ...props
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [itemList, setItemList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const handleLoadMore = function () {
    setLoading(!loading);
    setCurrPage(currPage + 1);
  };

  // console.info('productInfo', productInfo);

  useEffect(
    function () {
      if (stringIsNotEmpty(requestId)) {
        setLoading(true);
        getPurchaseOrderStatusLogs({
          accessToken: accessToken,
          purchaseOrderId: requestId,
        })
          .then(function ({ data: resData }) {
            console.info('getPurchaseOrderStatusLogs resData', resData);
            setItemList([...itemList, ...resData?.data]);
            // setTotalDataCount(resData?.paginationData?.totalResultsCount ?? 0);
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setLoading(false);
          });
      }
    },
    [currPage, requestId]
  );

  return (
    <React.Fragment>
      <React.Fragment>
        <div className='flex flex-col'>
          {arrayIsNotEmpty(itemList) ? (
            <React.Fragment>
              <div
                className={'flex flex-col'
                  .concat(' border border-gray-200')
                  // .concat(' rounded-md bg-white')
                  .concat(' overflow-hidden')}
              >
                <TableHeader />
                {[...itemList].map(function (itemInfo, index) {
                  return (
                    <React.Fragment key={index}>
                      <Item
                        setErrorMsg={setErrorMsg}
                        setViewErrorPopup={setViewErrorPopup}
                        viewErrorPopup={viewErrorPopup}
                        accessToken={accessToken}
                        itemInfo={itemInfo}
                        index={index}
                        isLast={index + 1 === itemList?.length}
                      />
                    </React.Fragment>
                  );
                })}
              </div>

              {itemList?.length < totalDataCount && (
                <React.Fragment>
                  {loading ? (
                    <React.Fragment>
                      <div className='flex flex-col items-center py-10 px-3 mx-auto'>
                        <DotLoader loading={loading} />
                      </div>
                    </React.Fragment>
                  ) : (
                    <div className='flex items-center justify-center mt-5 mb-1'>
                      <RoundedButton
                        roundedFull
                        btnType={ButtonType.default}
                        text={'Tải thêm'}
                        onClick={handleLoadMore}
                      />
                    </div>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {loading ? (
                <React.Fragment>
                  <div className='flex flex-col items-center py-10 px-3 mx-auto'>
                    <DotLoader loading={loading} />
                  </div>
                </React.Fragment>
              ) : (
                <TabEmptyInfo />
              )}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default ItemList;

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
          <p className='text-base text-dark font-semibold'>
            Tên người cập nhật
          </p>
        </div>
        <div
          className={'flex w-full'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Trạng thái</p>
        </div>
        <div
          className={'flex w-60 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Cập nhật ngày</p>
        </div>
      </div>
    </React.Fragment>
  );
};
