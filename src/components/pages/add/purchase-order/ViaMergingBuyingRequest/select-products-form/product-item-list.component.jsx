import { getBuyingRequestProducts } from '@/apis/buying-request.api';
import { getProducts } from '@/apis/product.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import ProductItem from './product-item.component';

const ProductItemList = function ({
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  productItemOnClick,
  defaultSelectedList,
  buyingRequestData,
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
      if (stringIsNotEmpty(accessToken)) {
        setComponentLoading(true);
        getBuyingRequestProducts({
          accessToken: accessToken,
          buyingRequestId: buyingRequestData?.id,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getProducts resData', resData);
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
    [accessToken, currPage]
  );

  return (
    <React.Fragment>
      {arrayIsNotEmpty(productList) ? (
        <React.Fragment>
          <div className={'flex flex-col'}>
            {productList?.map(function (product, index) {
              return (
                <React.Fragment key={index}>
                  <ProductItem
                    productItemData={product}
                    productItemOnClick={productItemOnClick}
                    defaultSelected={
                      [...defaultSelectedList].findIndex(function (item) {
                        if (
                          item?.productId === product?.productId &&
                          item?.buyingRequestId === product?.buyingRequestId
                        ) {
                          return item;
                        }
                      }) !== -1
                    }
                    isLast={index + 1 === productList?.length}
                  />
                </React.Fragment>
              );
            })}
          </div>

          {productList?.length < totalDataCount &&
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
            <EmptyListInfo itemLabel={'sản phẩm'} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductItemList;
