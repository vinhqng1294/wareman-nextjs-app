import { getLots } from '@/apis/lot.api';
import { ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import LotItem from './lot-item.component';

const LotItemList = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(true);

  const [lotList, setLotList] = useState([]);
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
        getLots({
          accessToken: accessToken,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getLots resData', resData);
            setLotList([...lotList, ...resData?.data]);
            setTotalDataCount(resData?.paginationData?.totalResultsCount ?? 0);
          })
          .catch(function (err) {
            console.info('err', err);
            console.info('err', err?.response);
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
      {arrayIsNotEmpty(lotList) ? (
        <React.Fragment>
          <div
            className={'grid xxs:px-0 xs:px-6 md:px-2'
              .concat(' xxs:grid-cols-2')
              .concat(' xxs:gap-x-3 xxs:gap-y-3')
              .concat(' xs:w-full xxs:py-5 lg:py-8')}
            // className={'flex flex-col'
            //   .concat(' items-center')
            //   .concat(' space-y-4')
            //   .concat(' py-4 w-full')}
          >
            {lotList?.map(function (lot, index) {
              return (
                <React.Fragment key={index}>
                  <LotItem
                    lotItemData={lot}
                    accessToken={accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                  />
                </React.Fragment>
              );
            })}
          </div>
          {lotList?.length < totalDataCount &&
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
            <EmptyListInfo itemLabel={'phân khu'} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LotItemList;
