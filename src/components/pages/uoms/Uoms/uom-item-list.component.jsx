import React, { useEffect, useState } from 'react';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import { ButtonType } from '@/components/ui/button/button.enum';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { getUoms } from '@/apis/uom.api';
import { DotLoader } from '@/components/ui/loader/loader.component';
import UomItem from './uom-item.component';

const UomItemList = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(true);

  const [uomList, setUomList] = useState([]);
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
        getUoms({
          accessToken: accessToken,
          reqData: {
            page: currPage,
            pageSize: pageSize,
            // keyword: '',
          },
        })
          .then(function ({ data: resData }) {
            console.info('getUoms resData', resData);
            setUomList([...uomList, ...resData?.data]);
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
      {arrayIsNotEmpty(uomList) ? (
        <React.Fragment>
          <div
            className={'flex flex-col'
              .concat(' w-full max-w-2xl')
              .concat(' py-8')}
          >
            <TableHeader />
            {[...uomList].map(function (uomInfo, index) {
              return (
                <React.Fragment key={index}>
                  <UomItem
                    index={index}
                    uomItemData={uomInfo}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                  />
                </React.Fragment>
              );
            })}
          </div>

          {uomList?.length < totalDataCount ? (
            componentLoading ? (
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
            )
          ) : (
            ''
          )}
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
            <EmptyListInfo itemLabel={'đơn vị đo'} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UomItemList;

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
            .concat(' px-1 py-1.5')}
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
          className={'flex w-full'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Tên đơn vị đo</p>
        </div>
        <div
          className={'flex w-28 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Số nguyên</p>
        </div>
        <div
          className={'flex w-40 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Ngày tạo</p>
        </div>
        {/* <div
          className={'flex w-40 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Cập nhật ngày</p>
        </div> */}
        <div
          className={'flex w-28 flex-none'
            .concat(' items-center justify-end')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'></p>
        </div>
      </div>
    </React.Fragment>
  );
};
