import { DotLoader } from '@/components/ui/loader/loader.component';
import { trimUUID } from '@/utils/commons/trimUUID.utils';
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
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { deleteRack, getRacksInLot } from '@/apis/rack.api';

const RackListTab = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  lotInfo,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  const [rackList, setRackList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const handleLoadMore = function () {
    setLoading(!loading);
    setCurrPage(currPage + 1);
  };

  const handleDelete = async function ({ rackInfo }) {
    await deleteRack({
      accessToken: accessToken,
      lotId: lotInfo?.id,
      rackId: rackInfo?.id,
    })
      .then(function ({ data: resData }) {
        console.info('deleteRack resData', resData);
        window?.location?.reload();
        // redirectTo(`/buying-requests/${resData?.data?.id}`);
      })
      .catch(function (err) {
        console.error('err', err?.response);
        setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      });
  };

  useEffect(
    function () {
      if (objectIsNotEmpty(lotInfo)) {
        setLoading(true);
        getRacksInLot({
          accessToken: accessToken,
          lotId: lotInfo?.id,
          reqData: {
            page: currPage,
            size: pageSize,
            // keyword: `""`,
          },
        })
          .then(function ({ data: resData }) {
            console.info('getRacksInLot resData', resData);
            setRackList([...rackList, ...resData?.data]);
            setTotalDataCount(resData?.paginationData?.totalResultsCount ?? 0);
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
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
          {lotInfo?.currentUserAllowUpdateRack && (
            <React.Fragment>
              <div
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
                    redirectTo('/add/'.concat(lotInfo?.id).concat('/rack'));
                  }}
                >
                  <ReactSVG
                    src={SvgIcon['add-sr']}
                    className={'fill-white'.concat(' w-5')}
                  />
                  <p className='text-white font-semibold text-base'>Thêm kệ</p>
                </button>
              </div>
            </React.Fragment>
          )}
          {arrayIsNotEmpty(rackList) ? (
            <React.Fragment>
              <div className='flex flex-col mb-5'>
                <TableHeader />
                {[...rackList].map(function (rackInfo, index) {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className={'flex'
                          .concat(' border-b border-gray-200')
                          .concat('')
                          .concat(
                            rackInfo?.isGlobalTemporary
                              ? ' bg-sky-100 hover:bg-opacity-50'
                              : ' hover:bg-zinc-50'
                          )}
                      >
                        <div
                          className='flex w-full cursor-pointer'
                          onClick={function (evt) {
                            evt?.preventDefault();
                            evt?.stopPropagation();
                            redirectTo(
                              `/lots/${lotInfo?.id}/rack/${rackInfo?.id}`
                            );
                          }}
                        >
                          <div
                            className={'flex w-16 flex-none'
                              .concat(' items-start justify-start')
                              .concat(' px-2 py-1.5')}
                          >
                            <p className='text-base text-dark'>{index + 1}</p>
                          </div>
                          <div
                            className={'flex w-28 flex-none'
                              .concat(' items-start justify-start')
                              .concat(' px-2 py-1.5')}
                          >
                            <p className='text-base text-zinc-500'>
                              {`${trimUUID(rackInfo?.id)}`.toUpperCase()}
                            </p>
                          </div>
                          <div
                            className={'flex w-full'
                              .concat(' items-start justify-start')
                              .concat(' px-2 py-1.5')}
                          >
                            <p className='text-base text-dark'>
                              {`${
                                stringIsNotEmpty(rackInfo?.name)
                                  ? `${rackInfo?.name}`
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
                                stringIsNotEmpty(rackInfo?.addedDate)
                                  ? moment(rackInfo?.addedDate).format(
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
                              stringIsNotEmpty(rackInfo?.updatedDate)
                                ? moment(rackInfo?.updatedDate).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                  )
                                : 'N/A'
                            }`}</p>
                          </div>
                        </div>

                        <div
                          className={'flex w-36 flex-none'
                            .concat(' items-center justify-end')
                            .concat(' px-2 py-1.5')
                            .concat(' space-x-3')}
                        >
                          {!rackInfo?.isGlobalTemporary &&
                            lotInfo?.currentUserAllowUpdateRack && (
                              <React.Fragment>
                                {/* <button
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
                                </button> */}
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
                                  onClick={function (evt) {
                                    evt?.preventDefault();
                                    evt?.stopPropagation();
                                    handleDelete({ rackInfo });
                                  }}
                                >
                                  <ReactSVG
                                    src={SvgIcon.trash}
                                    className={'fill-red-500 w-4 h-4'}
                                  />
                                </button>
                              </React.Fragment>
                            )}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {rackList?.length < totalDataCount && (
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

export default RackListTab;

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
          className={'flex w-28 flex-none'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>ID</p>
        </div>
        <div
          className={'flex w-full'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Tên kệ</p>
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
        <div
          className={'flex w-36 flex-none'
            .concat(' items-center justify-end')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'></p>
        </div>
      </div>
    </React.Fragment>
  );
};
