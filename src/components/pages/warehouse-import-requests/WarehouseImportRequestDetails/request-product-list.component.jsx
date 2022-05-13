import { getWarehouseImportRequestProducts } from '@/apis/warehouse-import-request.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfoV2 from '@/components/ui/empty-list-info/empty-list-info-v2.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import ProductItem from './request-product-item.component';

const RequestProductList = function ({
  requestInfo,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  handleViewProductImportDetailsModal,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(true);

  const [productList, setProductList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const handleLoadMore = function () {
    setCurrPage(currPage + 1);
  };

  useEffect(
    function () {
      if (objectIsNotEmpty(requestInfo)) {
        setComponentLoading(true);
        getWarehouseImportRequestProducts({
          accessToken,
          requestId: requestInfo?.id,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getWarehouseImportRequestProducts resData', resData);
            setProductList([...productList, ...resData?.data]);
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
    [requestInfo, currPage]
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
          <div className='flex items-center px-5'>
            <p className='text-dark font-semibold text-xl'>
              Danh sách sản phẩm
            </p>
            <div className='flex ml-auto'>
              <button
                type='button'
                className={
                  'flex items-center justify-center'
                    .concat(' rounded-full')
                    .concat(' bg-white')
                    .concat(' border border-zinc-200')
                    .concat(' px-6 py-1.5')
                    .concat(' hover:shadow-md')
                  // .concat(' xxs:w-full md:w-1/3')
                }
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  if (isFunction(handleViewProductImportDetailsModal)) {
                    handleViewProductImportDetailsModal({});
                  }
                }}
              >
                <p className='text-dark font-semibold text-sm'>
                  Xem chi tiết nhập kho
                </p>
              </button>
            </div>
          </div>
          <div className={'flex flex-col mt-3'}>
            {arrayIsNotEmpty(productList) ? (
              <React.Fragment>
                <div className='flex flex-col space-y-0 mb-5'>
                  {productList?.map(function (product, index) {
                    return (
                      <React.Fragment key={index}>
                        <ProductItem
                          productItemData={product}
                          isLast={index + 1 === productList?.length}
                          accessToken={accessToken}
                          setErrorMsg={setErrorMsg}
                          setViewErrorPopup={setViewErrorPopup}
                          viewErrorPopup={viewErrorPopup}
                        />
                      </React.Fragment>
                    );
                  })}
                </div>
                {productList?.length < totalDataCount &&
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
                  <EmptyListInfoV2 itemLabel={'sản phẩm'} />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RequestProductList;
