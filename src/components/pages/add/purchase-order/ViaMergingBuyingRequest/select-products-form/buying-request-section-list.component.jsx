import { getProducts } from '@/apis/product.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import ProductItemList from './product-item-list.component';
import ProductItem from './product-item.component';

const BuyingRequestSectionList = function ({
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  productItemOnClick,
  defaultSelectedList,
  defaultBuyingRequestInfoList,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(false);
  const [buyingRequestList, setBuyingRequestList] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [currPage, setCurrPage] = useState(-1);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const handleLoadMore = function () {
    setCurrPage(currPage + 1);
  };

  console.info('buyingRequestList', buyingRequestList);

  useEffect(
    function () {
      if (arrayIsNotEmpty(defaultBuyingRequestInfoList)) {
        setCurrPage(0);
        setBuyingRequestList([]);
        setTotalDataCount([...defaultBuyingRequestInfoList]?.length);
      }
    },
    [defaultBuyingRequestInfoList]
  );

  useEffect(
    function () {
      if (currPage >= 0 && pageSize > 0) {
        let updatedBuyingRequestList = [...buyingRequestList];
        for (
          let i = currPage, j = 0;
          j < pageSize && i < [...defaultBuyingRequestInfoList]?.length;
          i++, j++
        ) {
          updatedBuyingRequestList.push(defaultBuyingRequestInfoList[i]);
        }
        setBuyingRequestList([...updatedBuyingRequestList]);
      }
    },
    [currPage]
  );

  return (
    <React.Fragment>
      {arrayIsNotEmpty(buyingRequestList) ? (
        <React.Fragment>
          <div className={'flex flex-col space-y-5 mb-5'}>
            {buyingRequestList?.map(function (buyingRequestInfo, index) {
              return (
                <React.Fragment key={index}>
                  <div
                    className={'flex flex-col'
                      .concat(' w-full rounded-md shadow-md')
                      .concat(' border border-gray-200')
                      .concat(' overflow-hidden')}
                    title={
                      stringIsNotEmpty(buyingRequestInfo?.name)
                        ? buyingRequestInfo?.name
                        : `<Tên yêu cầu mua hàng>`
                    }
                  >
                    <div className='flex border-b-2 border-gray-200'>
                      <TextEllipsis
                        content={
                          stringIsNotEmpty(buyingRequestInfo?.name)
                            ? buyingRequestInfo?.name
                            : `<Tên yêu cầu mua hàng>`
                        }
                        textFormat={`whitespace-pre-wrap`
                          .concat(` text-base text-dark font-semibold`)
                          .concat(' px-3 py-2')}
                        customTextStyles={{
                          WebkitLineClamp: 1,
                          display: `-webkit-box`,
                          WebkitBoxOrient: `vertical`,
                        }}
                      />
                    </div>
                    <ProductItemList
                      accessToken={accessToken}
                      setErrorMsg={setErrorMsg}
                      setViewErrorPopup={setViewErrorPopup}
                      viewErrorPopup={viewErrorPopup}
                      productItemOnClick={productItemOnClick}
                      defaultSelectedList={defaultSelectedList}
                      buyingRequestData={buyingRequestInfo}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {buyingRequestList?.length < totalDataCount &&
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
            <EmptyListInfo itemLabel={'yêu cầu mua hàng'} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BuyingRequestSectionList;
