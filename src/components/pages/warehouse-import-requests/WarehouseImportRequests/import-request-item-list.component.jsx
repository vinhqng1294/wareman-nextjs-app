import { getWarehouseImportRequests } from '@/apis/warehouse-import-request.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import ImportRequestItem from './import-request-item.component';

const ImportRequestItemList = function ({
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
      if (stringIsNotEmpty(accessToken)) {
        setComponentLoading(true);
        getWarehouseImportRequests({
          accessToken: accessToken,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getWarehouseImportRequests resData', resData);
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
    [accessToken, currPage]
  );

  return (
    <React.Fragment>
      {arrayIsNotEmpty(importRequestList) ? (
        <React.Fragment>
          <div
            className={'grid xxs:px-0 xs:px-6 md:px-2'
              .concat(' xxs:grid-cols-1 xl:grid-cols-2')
              .concat(' xxs:gap-x-3 xxs:gap-y-3')
              .concat(' xs:w-full xxs:py-5 lg:py-8')}
            // className={'flex flex-col'
            //   .concat(' items-center')
            //   .concat(' space-y-4')
            //   .concat(' py-4 w-full')}
          >
            {importRequestList?.map(function (importRequest, index) {
              return (
                <React.Fragment key={index}>
                  <ImportRequestItem
                    importRequestItemData={importRequest}
                    accessToken={accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                  />
                </React.Fragment>
              );
            })}{' '}
          </div>

          {importRequestList?.length < totalDataCount &&
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
            <EmptyListInfo itemLabel={'yêu cầu nhập kho'} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ImportRequestItemList;
