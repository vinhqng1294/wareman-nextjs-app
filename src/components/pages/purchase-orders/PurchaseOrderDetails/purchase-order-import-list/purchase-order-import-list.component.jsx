import { getWarehouseImportRequestsFromPurchaseOrder } from '@/apis/warehouse-import-request.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfoV2 from '@/components/ui/empty-list-info/empty-list-info-v2.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import ImportItem from './purchase-order-import-item.component';

const PurchaseOrderImportList = function ({
  purchaseOrderInfo,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(true);

  const [importRequestList, setImportRequestList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const handleLoadMore = function () {
    setCurrPage(currPage + 1);
  };

  useEffect(
    function () {
      if (objectIsNotEmpty(purchaseOrderInfo)) {
        setComponentLoading(true);
        getWarehouseImportRequestsFromPurchaseOrder({
          accessToken,
          purchaseOrderId: purchaseOrderInfo?.id,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info(
              'getWarehouseImportRequestsFromPurchaseOrder resData',
              resData
            );
            setImportRequestList([...importRequestList, ...resData?.data]);
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
    [purchaseOrderInfo, currPage]
  );

  // const [groupProductListByProvider, setGroupProductListByProvider] = useState(
  //   {}
  // );
  // useEffect(
  //   function () {
  //     if (isArray(productList)) {
  //       let temp = {};
  //       productList?.forEach(function (product, index) {
  //         isArray(temp[product?.provider?.id])
  //           ? temp[product?.provider?.id].push(product)
  //           : (temp[product?.provider?.id] = [product]);
  //       });
  //       setGroupProductListByProvider({
  //         ...groupProductListByProvider,
  //         ...temp,
  //       });
  //     }
  //   },
  //   [productList]
  // );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full max-w-4xl')
          .concat(' bg-white')
          .concat(' rounded-md shadow-md')}
      >
        <div className={'flex flex-col py-4'}>
          <div className='flex px-5'>
            <p className='text-dark font-semibold text-xl'>
              Danh sách yêu cầu nhập kho
            </p>
          </div>
          <div className={'flex flex-col mt-3'}>
            {arrayIsNotEmpty(importRequestList) ? (
              <React.Fragment>
                <div className='flex flex-col mb-5'>
                  <TableHeader />
                  {importRequestList?.map(function (importRequestData, index) {
                    return (
                      <React.Fragment key={index}>
                        <ImportItem
                          index={index}
                          importRequestItemData={importRequestData}
                          isLast={index + 1 === importRequestList?.length}
                          accessToken={accessToken}
                          setErrorMsg={setErrorMsg}
                          setViewErrorPopup={setViewErrorPopup}
                          viewErrorPopup={viewErrorPopup}
                        />
                      </React.Fragment>
                    );
                  })}
                </div>
                {importRequestList?.length < totalDataCount &&
                  (componentLoading ? (
                    <React.Fragment>
                      <div className='flex flex-col items-center py-5 px-3 mx-auto'>
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
                    <div className='flex flex-col items-center py-5 px-3 mx-auto'>
                      <DotLoader loading={componentLoading} />
                    </div>
                  </React.Fragment>
                ) : (
                  <EmptyListInfoV2 itemLabel={'yêu cầu nhập kho'} />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PurchaseOrderImportList;

const TableHeader = function () {
  return (
    <React.Fragment>
      <div
        className={
          'flex'.concat(' border-b border-t border-gray-200')
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
            {/* Tên yêu cầu nhập kho */}
            Tên người tạo
          </p>
        </div>
        <div
          className={'flex w-52 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Trạng thái</p>
        </div>
        <div
          className={'flex w-36 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Ngày tạo</p>
        </div>
        <div
          className={'flex w-36 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Ngày cập nhật</p>
        </div>
      </div>
    </React.Fragment>
  );
};
