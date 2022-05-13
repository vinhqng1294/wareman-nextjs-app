import ContentContainer from '@/components/ui/container/content-container.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ReportItemList from './report-item-list.component';
import dynamic from 'next/dynamic';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import { ButtonType } from '@/components/ui/button/button.enum';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import TabEmptyInfo from './tab-empty-info.component';
import { getWarehouseImportExportReportData } from '@/apis/report.api';
import MonthYearSelector from './month-year-selector.component';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { isNumber } from 'lodash';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const WarehouseImportExportReportMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [pageLoading, setPageLoading] = useState(false);

  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorPopupOnClose = function () {
    setViewErrorPopup(!viewErrorPopup);
    setErrorMsg('');
    setPageLoading(false);
  };

  const [rowList, setRowList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const [reportPeriod, setReportPeriod] = useState({
    month: undefined,
    year: undefined,
  });

  const handleLoadMore = function () {
    setPageLoading(!pageLoading);
    setCurrPage(currPage + 1);
  };

  const handleGetWarehouseImportExportReportData = function ({
    month,
    year,
    isLoadMore = false,
  }) {
    if (stringIsNotEmpty(auth?.accessToken)) {
      setPageLoading(true);
      if (!isLoadMore) {
        setRowList([]);
      }
      setReportPeriod({ month, year });
      getWarehouseImportExportReportData({
        accessToken: auth?.accessToken,
        year: year,
        month: month,
        reqData: {
          page: currPage,
          size: pageSize,
          // keyword: `""`,
        },
      })
        .then(function ({ data: resData }) {
          console.info('getWarehouseImportExportReportData resData', resData);
          if (isLoadMore) {
            setRowList([...rowList, ...resData?.data]);
          } else {
            setRowList([...resData?.data]);
          }
          setTotalDataCount(resData?.paginationData?.totalResultsCount ?? 0);
        })
        .catch(function (err) {
          console.error('err', err);
          console.error('err', err.response);
          setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
          setViewErrorPopup(!viewErrorPopup);
        })
        .finally(function () {
          setPageLoading(false);
        });
    }
  };

  // useEffect(function () {
  //   let newProductList = [];
  //   for (let i = 0; i < 20; i++) {
  //     newProductList.push({
  //       id: UUIDv4(),
  //       name: `Sản phẩm ${i}`,
  //       description: `Mô tả của sản phẩm ${i}`,
  //     });
  //   }
  //   setProductList([...newProductList]);
  // }, []);

  useEffect(
    function () {
      if (!stringIsNotEmpty(auth?.accessToken)) {
        redirectTo('/login');
      }
    },
    [auth]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(auth?.accessToken) && currPage > 1) {
        handleGetWarehouseImportExportReportData({
          month: reportPeriod?.month,
          year: reportPeriod?.year,
          isLoadMore: true,
        });
      }
    },
    [auth?.accessToken, currPage]
  );

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <ErrorModal
        open={viewErrorPopup}
        errorMsg={errorMsg}
        onClose={errorPopupOnClose}
      />
      <DefaultLayout>
        <ContentContainer cssClassnames={'xxs:px-2 md:px-5 lg:max-w-full'}>
          <div
            className={'flex flex-col'
              .concat(' items-center')
              .concat('')
              .concat(' py-6')}
          >
            <div
              className={'flex flex-col'
                .concat(' items-center')
                .concat(' w-11/12')}
            >
              <div
                className={'flex flex-col'
                  .concat(' items-center')
                  .concat(' w-full max-w-2xl')}
              >
                {/* <SearchBarType1 /> */}
                {/* <ReportFilter /> */}
                <MonthYearSelector
                  defaultValue={reportPeriod}
                  getReportData={handleGetWarehouseImportExportReportData}
                />
              </div>

              {arrayIsNotEmpty(rowList) ? (
                <React.Fragment>
                  <div
                    className={'flex w-full'
                      .concat(' px-5 py-3')
                      .concat(' items-center justify-end')}
                  >
                    <button
                      type='button'
                      className={
                        'flex items-center justify-center'
                          .concat(' rounded-full')
                          .concat(' bg-stone-600')
                          .concat(' border border-transparent')
                          .concat(' px-3 py-1.5')
                          .concat(' hover:shadow-md hover:bg-opacity-70')
                          .concat(' space-x-2 flex-none')
                        // .concat(' xxs:w-full md:w-1/3')
                      }
                      onClick={function (evt) {
                        evt?.preventDefault();
                        evt?.stopPropagation();
                        window.location.assign(
                          `${process.env.NEXT_PUBLIC_API_DOMAIN}`
                            .concat('/reports/general-io/year/')
                            .concat(`${reportPeriod?.year}`)
                            .concat(
                              isNumber(reportPeriod?.month)
                                ? `/month/`.concat(`${reportPeriod?.month}`)
                                : ''
                            )
                            .concat('?redirectFileUrl=true')
                        );
                      }}
                    >
                      <ReactSVG
                        src={SvgIcon['download']}
                        className={'fill-white'.concat(' w-4')}
                      />
                      <p className='text-white font-semibold text-sm'>
                        {`Tải báo cáo`}
                      </p>
                    </button>
                  </div>

                  <ReportItemList
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    accessToken={auth?.accessToken}
                    rowList={rowList}
                  />
                  {rowList?.length < totalDataCount &&
                    (pageLoading ? (
                      <React.Fragment>
                        <div className='flex flex-col items-center py-10 px-3'>
                          <DotLoader loading={pageLoading} />
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
                  {pageLoading ? (
                    <React.Fragment>
                      <div className='flex flex-col items-center py-10 px-3'>
                        <DotLoader loading={pageLoading} />
                      </div>
                    </React.Fragment>
                  ) : (
                    <TabEmptyInfo msg='Không có dữ liệu' />
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default WarehouseImportExportReportMain;
