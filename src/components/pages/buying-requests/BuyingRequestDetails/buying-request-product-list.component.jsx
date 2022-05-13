import { getBuyingRequestProducts } from '@/apis/buying-request.api';
import {
  ButtonType,
} from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfoV2 from '@/components/ui/empty-list-info/empty-list-info-v2.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import ProductItem from './buying-request-product-item.component';

const BuyingRequestProductList = function ({
  buyingRequestInfo,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(false);

  const [productList, setProductList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const handleLoadMore = function () {
    setCurrPage(currPage + 1);
  };

  useEffect(
    function () {
      if (objectIsNotEmpty(buyingRequestInfo)) {
        setComponentLoading(true);
        getBuyingRequestProducts({
          accessToken,
          buyingRequestId: buyingRequestInfo?.id,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getBuyingRequestProducts resData', resData);
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
    [buyingRequestInfo, currPage]
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
              Danh sách sản phẩm
            </p>
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

export default BuyingRequestProductList;
