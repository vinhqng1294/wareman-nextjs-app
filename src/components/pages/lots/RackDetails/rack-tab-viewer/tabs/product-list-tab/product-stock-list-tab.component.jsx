import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import TabEmptyInfo from '../../tab-empty-info.component';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import { ButtonType } from '@/components/ui/button/button.enum';
import { useDispatch } from 'react-redux';
import ProductStockItem from './product-stock-item.component';
import { getProductStockByProductId } from '@/apis/product-stock.api';

const ProductStockListTab = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  lotInfo,
  productInfo,
  rackInfo,
  ...props
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [productStockList, setProductStockList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const handleLoadMore = function () {
    setLoading(!loading);
    setCurrPage(currPage + 1);
  };

  console.info('productInfo', productInfo);

  useEffect(
    function () {
      if (objectIsNotEmpty(productInfo)) {
        setLoading(true);
        getProductStockByProductId({
          accessToken: accessToken,
          productId: productInfo?.id,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getProductStockByProductId resData', resData);
            setProductStockList([...productStockList, ...resData?.data]);
            setTotalDataCount(resData?.paginationData?.totalResultsCount ?? 0);
          })
          .catch(function (err) {
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setLoading(false);
          });
      }
    },
    [currPage, productInfo]
  );

  return (
    <React.Fragment>
      <React.Fragment>
        <div className='flex flex-col'>
          {arrayIsNotEmpty(productStockList) ? (
            <React.Fragment>
              <div
                className={'flex flex-col'
                  .concat(' border border-gray-200')
                  .concat(' rounded-md bg-white')
                  .concat(' overflow-hidden')}
              >
                <TableHeader />
                {[...productStockList].map(function (productStockInfo, index) {
                  return (
                    <React.Fragment key={index}>
                      <ProductStockItem
                        setErrorMsg={setErrorMsg}
                        setViewErrorPopup={setViewErrorPopup}
                        viewErrorPopup={viewErrorPopup}
                        accessToken={accessToken}
                        productStockInfo={productStockInfo}
                        index={index}
                        isLast={index + 1 === productStockList?.length}
                        rackInfo={rackInfo}
                      />
                    </React.Fragment>
                  );
                })}
              </div>

              {productStockList?.length < totalDataCount && (
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

export default ProductStockListTab;

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
          className={'flex w-40 flex-none'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Mã đơn nhập hàng</p>
        </div>
        <div
          className={'flex w-full'
            .concat(' items-start justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Phân khu</p>
        </div>
        <div
          className={'flex w-full'
            .concat(' items-start justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Kệ</p>
        </div>
        {/* <div
          className={'flex w-44 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Vị trí</p>
        </div> */}
        <div
          className={'flex w-32 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Số lượng</p>
        </div>
        <div
          className={'flex w-24 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Đơn vị</p>
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
        <div
          className={'flex w-16 flex-none'
            .concat(' items-center justify-end')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'></p>
        </div>
      </div>
    </React.Fragment>
  );
};
