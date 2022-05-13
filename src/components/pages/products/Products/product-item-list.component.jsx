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
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(true);

  const [productList, setProductList] = useState([]);
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
        getProducts({
          accessToken: accessToken,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            setProductList([...productList, ...resData?.data]);
            setTotalDataCount(resData?.paginationData?.totalResultsCount ?? 0);
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
      {arrayIsNotEmpty(productList) ? (
        <React.Fragment>
          <div
            className={'grid xxs:px-0 xs:px-6 md:px-2'
              .concat(' xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4')
              .concat(' xxs:gap-x-3 xxs:gap-y-3')
              .concat(' xs:gap-x-4 xs:gap-y-4')
              .concat(' md:gap-x-5 md:gap-y-5')
              .concat(' xs:w-full xxs:py-5 lg:py-8')}
            // className={'flex flex-col'
            //   .concat(' items-center')
            //   .concat(' space-y-4')
            //   .concat(' py-4 w-full')}
          >
            {productList?.map(function (product, index) {
              return (
                <React.Fragment key={index}>
                  <ProductItem
                    productItemData={product}
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
