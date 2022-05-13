import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import EmployeeItem from './employee-item.component';
import { useEffect, useState } from 'react';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import { ButtonType } from '@/components/ui/button/button.enum';
import EmptyListInfo from '@/components/ui/empty-list-info/empty-list-info.component';
import { getUsers } from '@/apis/user.api';
import { DotLoader } from '@/components/ui/loader/loader.component';

const EmployeeItemList = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  setWarningMsg,
  setViewWarningPopup,
  viewWarningPopup,
  setWarningPopupOnAccept,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(true);

  const [employeeList, setEmployeeList] = useState([]);
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
        getUsers({
          accessToken: accessToken,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: '',
          },
        })
          .then(function ({ data: resData }) {
            console.info('getUsers resData', resData);
            setEmployeeList([...employeeList, ...resData?.data]);
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
      {arrayIsNotEmpty(employeeList) ? (
        <React.Fragment>
          <div
            className={'flex flex-col'.concat(' w-full px-2').concat(' py-8')}
          >
            <TableHeader />
            {[...employeeList].map(function (employeeInfo, index) {
              return (
                <React.Fragment key={index}>
                  <EmployeeItem
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                    accessToken={accessToken}
                    index={index}
                    employeeItemData={employeeInfo}
                    setWarningMsg={setWarningMsg}
                    setViewWarningPopup={setViewWarningPopup}
                    viewWarningPopup={viewWarningPopup}
                    setWarningPopupOnAccept={setWarningPopupOnAccept}
                  />
                </React.Fragment>
              );
            })}
          </div>

          {employeeList?.length < totalDataCount &&
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
            <EmptyListInfo itemLabel={'nhân viên'} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EmployeeItemList;

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
        ></div>
        <div
          className={'flex w-full'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Họ và tên</p>
        </div>
        <div
          className={'flex w-80 flex-none'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Email</p>
        </div>
        <div
          className={'flex w-52 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Chức vụ</p>
        </div>
        <div
          className={'flex w-36 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Ngày tạo</p>
        </div>
        <div
          className={'flex w-16 flex-none'
            .concat(' items-center justify-end')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'></p>
        </div>
      </div>
    </React.Fragment>
  );
};
