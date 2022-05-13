import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import TabEmptyInfo from '../tab-empty-info.component';
import moment from 'moment';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import { ButtonType } from '@/components/ui/button/button.enum';
import Image from 'next/image';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { getLotProducts } from '@/apis/lot.api';

const ProductListTab = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  lotInfo,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  const [productList, setProductList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const handleLoadMore = function () {
    setLoading(!loading);
    setCurrPage(currPage + 1);
  };

  useEffect(
    function () {
      if (objectIsNotEmpty(lotInfo)) {
        setLoading(true);
        getLotProducts({
          accessToken: accessToken,
          lotId: lotInfo?.id,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getLotProducts resData', resData);
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
    [lotInfo, currPage]
  );

  return (
    <React.Fragment>
      <React.Fragment>
        <div className='flex flex-col py-3 px-6'>
          {arrayIsNotEmpty(productList) ? (
            <React.Fragment>
              <div className='flex flex-col mb-5'>
                <TableHeader />
                {[...productList].map(function (productInfo, index) {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className={'flex'
                          .concat(' border-b border-gray-200')
                          .concat(' hover:bg-zinc-50')}
                      >
                        <div
                          className='flex w-full cursor-pointer'
                          onClick={function (evt) {
                            evt?.preventDefault();
                            evt?.stopPropagation();
                            redirectTo(`/products/${productInfo?.id}`, true);
                          }}
                        >
                          <div
                            className={'flex w-16 flex-none'
                              .concat(' items-center justify-start')
                              .concat(' px-2 py-1.5')}
                          >
                            <p className='text-base text-dark'>{index + 1}</p>
                          </div>
                          <div
                            className={'flex w-16 flex-none'
                              .concat(' items-center justify-start')
                              .concat(' py-1.5')}
                          >
                            <div
                              className={'flex flex-col'
                                .concat(' xxs:w-12 xxs:h-12')
                                .concat(' md:w-14 md:h-14')
                                .concat(' relative overflow-hidden')
                                .concat(' rounded-md')
                                .concat(` border border-zinc-200`)
                                .concat(' bg-zinc-100')}
                            >
                              {stringIsNotEmpty(productInfo?.logoId) ? (
                                <React.Fragment>
                                  <Image
                                    // loader={function ({ src }) {
                                    //   return src;
                                    // }}
                                    src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/photos/product/download/url?id=${productInfo?.logoId}`}
                                    alt={` `}
                                    layout='fill'
                                    objectFit='contain'
                                    unoptimized
                                  />
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <ReactSVG
                                    src={SvgIcon['cube-sr']}
                                    className={'fill-zinc-500'
                                      .concat(' w-full h-full')
                                      .concat(' p-2')}
                                  />
                                </React.Fragment>
                              )}
                            </div>
                          </div>
                          <div
                            className={'flex w-full'
                              .concat(' items-center justify-start')
                              .concat(' px-2 py-1.5')}
                          >
                            <p className='text-base text-dark'>
                              {`${
                                stringIsNotEmpty(productInfo?.name)
                                  ? `${productInfo?.name}`
                                  : 'N/A'
                              }`}
                            </p>
                          </div>
                          <div
                            className={'flex w-40 flex-none'
                              .concat(' items-start justify-center')
                              .concat(' px-2 py-1.5')}
                          >
                            <p className='text-base text-dark text-center'>
                              {`${
                                stringIsNotEmpty(productInfo?.addedDate)
                                  ? moment(productInfo?.addedDate).format(
                                      'DD/MM/YYYY HH:mm:ss'
                                    )
                                  : 'N/A'
                              }`}
                            </p>
                          </div>
                          <div
                            className={'flex w-40 flex-none'
                              .concat(' items-start justify-center')
                              .concat(' px-2 py-1.5')}
                          >
                            <p className='text-base text-dark text-center'>{`${
                              stringIsNotEmpty(productInfo?.updatedDate)
                                ? moment(productInfo?.updatedDate).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                  )
                                : 'N/A'
                            }`}</p>
                          </div>
                        </div>

                        {/* <div
                          className={'flex w-40 flex-none'
                            .concat(' items-center justify-end')
                            .concat(' px-2 py-1.5')
                            .concat(' space-x-3')}
                        >
                          <button
                            title='Sửa'
                            type='button'
                            className={'flex items-center justify-center'
                              .concat(' rounded-lg')
                              .concat(' hover:bg-white')
                              .concat(' w-6 h-6')
                              .concat(
                                ' hover:shadow-md hover:border border-zinc-50'
                              )}
                          >
                            <ReactSVG
                              src={SvgIcon.pencil}
                              className={'fill-blue-500 w-4 h-4'}
                            />
                          </button>
                          <button
                            title='Xoá'
                            type='button'
                            className={'flex items-center justify-center'
                              .concat(' rounded-lg')
                              .concat(' hover:bg-white')
                              .concat(' w-6 h-6')
                              .concat(
                                ' hover:shadow-md hover:border border-zinc-50'
                              )}
                          >
                            <ReactSVG
                              src={SvgIcon.trash}
                              className={'fill-red-500 w-4 h-4'}
                            />
                          </button>
                        </div> */}
                      </div>
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
