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
import ProductItem from './product-item.component';
import { getRackProducts } from '@/apis/rack.api';

const ProductListTab = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  lotInfo,
  rackInfo,
  ...props
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [productList, setProductList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const handleLoadMore = function () {
    setLoading(!loading);
    setCurrPage(currPage + 1);
  };

  // console.info('rackId', rackInfo?.id);

  useEffect(
    function () {
      if (objectIsNotEmpty(rackInfo)) {
        setLoading(true);
        getRackProducts({
          accessToken: accessToken,
          rackId: rackInfo?.id,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getRackProducts resData', resData);
            setProductList([...productList, ...resData?.data]);
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
    [currPage, rackInfo]
  );

  return (
    <React.Fragment>
      <React.Fragment>
        <div className='flex flex-col py-3 px-6'>
          {/* <div
            className={'flex'
              .concat(' items-center justify-end')
              .concat(' px-2 py-1 mb-4')
              .concat(' space-x-3')}
          >
            <button
              type='button'
              className={'flex items-center justify-center'
                .concat(' rounded-full')
                .concat(' bg-blue-500')
                .concat(' px-5 py-2')
                .concat(' hover:shadow-md')
                .concat(' space-x-3')}
              onClick={function (evt) {
                evt?.preventDefault();
                evt?.stopPropagation();
                // redirectTo('/add/'.concat(lotInfo?.id).concat('/rack'));
              }}
            >
              <ReactSVG
                src={SvgIcon['add-sr']}
                className={'fill-white'.concat(' w-5')}
              />
              <p className='text-white font-semibold text-base'>
                Thêm sản phẩm vào kệ
              </p>
            </button>
          </div> */}
          {arrayIsNotEmpty(productList) ? (
            <React.Fragment>
              <div className='flex flex-col mb-5'>
                <TableHeader />
                {[...productList].map(function (productInfo, index) {
                  return (
                    <React.Fragment key={index}>
                      <ProductItem
                        setErrorMsg={setErrorMsg}
                        setViewErrorPopup={setViewErrorPopup}
                        viewErrorPopup={viewErrorPopup}
                        accessToken={accessToken}
                        productInfo={productInfo}
                        index={index}
                        lotInfo={lotInfo}
                        rackInfo={rackInfo}
                      />
                    </React.Fragment>
                  );
                })}
              </div>

              {productList?.length < totalDataCount && (
                <React.Fragment>
                  {loading ? (
                    <React.Fragment>
                      <div className='flex flex-col items-center py-10 px-3 mx-auto'>
                        <DotLoader loading={loading} />
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

export default ProductListTab;

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
          className={'flex w-8 flex-none'
            .concat(' items-center justify-start')
            .concat(' px-0.5 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'></p>
        </div>
        <div
          className={'flex w-16 flex-none'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>#</p>
        </div>
        <div
          className={'flex w-16 flex-none'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          {/* <p className='text-base text-dark font-semibold'>ID</p> */}
        </div>
        <div
          className={'flex w-full'
            .concat(' items-start justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Tên sản phẩm</p>
        </div>
        <div
          className={'flex w-40 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Ngày tạo</p>
        </div>
        <div
          className={'flex w-40 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Cập nhật ngày</p>
        </div>
        {/* <div
          className={'flex w-40 flex-none'
            .concat(' items-center justify-end')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'></p>
        </div> */}
      </div>
    </React.Fragment>
  );
};
