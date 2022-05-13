import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import TabEmptyInfo from '../tab-empty-info.component';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import { ButtonType } from '@/components/ui/button/button.enum';
import { getCustomerContactsById } from '@/apis/customer.api';

const ContactListTab = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  customerInfo,
  ...props
}) {
  const [loading, setLoading] = useState(false);

  const [contactList, setContactList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const handleLoadMore = function () {
    setLoading(!loading);
    setCurrPage(currPage + 1);
  };

  useEffect(
    function () {
      if (objectIsNotEmpty(customerInfo)) {
        // setLoading(true);
        setContactList([...customerInfo?.contacts]);
      }
    },
    [customerInfo]
  );
  // useEffect(
  //   function () {
  //     if (objectIsNotEmpty(customerInfo)) {
  //       setLoading(true);
  //       getCustomerContactsById({
  //         accessToken: accessToken,
  //         customerId: customerInfo?.id,
  //         reqData: {
  //           page: currPage,
  //           size: pageSize,
  //           // keyword: `""`,
  //         },
  //       })
  //         .then(function ({ data: resData }) {
  //           console.info('getCustomerContactsById resData', resData);
  //           setContactList([...contactList, ...resData?.data]);
  //           setTotalDataCount(resData?.paginationData?.totalResultsCount ?? 0);
  //         })
  //         .catch(function (err) {
  //           console.error('err', err);
  //           console.error('err', err.response);
  //           setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
  //           setViewErrorPopup(!viewErrorPopup);
  //         })
  //         .finally(function () {
  //           setLoading(false);
  //         });
  //     }
  //   },
  //   [customerInfo, currPage]
  // );

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
                redirectTo('/add/'.concat(providerInfo?.id).concat('/rack'));
              }}
            >
              <ReactSVG
                src={SvgIcon['add-sr']}
                className={'fill-white'.concat(' w-5')}
              />
              <p className='text-white font-semibold text-base'>Thêm kệ</p>
            </button>
          </div> */}
          {arrayIsNotEmpty(contactList) ? (
            <React.Fragment>
              <div className='flex flex-col mb-5'>
                <TableHeader />
                {[...contactList].map(function (contactInfo, index) {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className={'flex'
                          .concat(' border-b border-gray-200')
                          .concat(' hover:bg-zinc-50')}
                      >
                        <div
                          className='flex w-full cursor-pointer'
                          // onClick={function (evt) {
                          //   evt?.preventDefault();
                          //   evt?.stopPropagation();
                          //   redirectTo(
                          //     `/lots/${providerInfo?.id}/rack/${rackInfo?.id}`,
                          //     true
                          //   );
                          // }}
                        >
                          <div
                            className={'flex w-16 flex-none'
                              .concat(' items-start justify-start')
                              .concat(' px-2 py-1.5')}
                          >
                            <p className='text-base text-dark'>{index + 1}</p>
                          </div>
                          <div
                            className={'flex w-full'
                              .concat(' items-start justify-start')
                              .concat(' px-2 py-1.5')}
                          >
                            <p className='text-base text-dark'>
                              {`${
                                stringIsNotEmpty(contactInfo?.name)
                                  ? `${contactInfo?.name}`
                                  : 'N/A'
                              }`}
                            </p>
                          </div>
                          <div
                            className={'flex w-64 flex-none'
                              .concat(' items-start justify-center')
                              .concat(' px-2 py-1.5')}
                          >
                            <p className='text-base text-dark text-center'>
                              {`${
                                stringIsNotEmpty(contactInfo?.title)
                                  ? `${contactInfo?.title}`
                                  : 'N/A'
                              }`}
                            </p>
                          </div>
                          <div
                            className={'flex flex-col w-64 flex-none'
                              .concat(' items-center justify-start')
                              .concat(' px-2 py-1.5')}
                          >
                            {stringIsNotEmpty(contactInfo?.primaryEmail) ||
                            stringIsNotEmpty(contactInfo?.secondaryEmail) ? (
                              <React.Fragment>
                                {stringIsNotEmpty(
                                  contactInfo?.primaryEmail
                                ) && (
                                  <React.Fragment>
                                    <p className='text-base text-dark text-center break-all'>
                                      {`${contactInfo?.primaryEmail}`}
                                    </p>
                                  </React.Fragment>
                                )}
                                {stringIsNotEmpty(
                                  contactInfo?.secondaryEmail
                                ) && (
                                  <React.Fragment>
                                    <p className='text-base text-dark text-center break-all'>
                                      {`${contactInfo?.secondaryEmail}`}
                                    </p>
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            ) : (
                              <p className='text-base text-dark text-center'>
                                {`N/A`}
                              </p>
                            )}
                          </div>
                          <div
                            className={'flex flex-col w-40 flex-none'
                              .concat(' items-center justify-start')
                              .concat(' px-2 py-1.5')}
                          >
                            {stringIsNotEmpty(contactInfo?.primaryPhone) ||
                            stringIsNotEmpty(contactInfo?.secondaryPhone) ? (
                              <React.Fragment>
                                {stringIsNotEmpty(
                                  contactInfo?.primaryPhone
                                ) && (
                                  <React.Fragment>
                                    <p className='text-base text-dark text-center break-all'>
                                      {`${contactInfo?.primaryPhone}`}
                                    </p>
                                  </React.Fragment>
                                )}
                                {stringIsNotEmpty(
                                  contactInfo?.secondaryPhone
                                ) && (
                                  <React.Fragment>
                                    <p className='text-base text-dark text-center break-all'>
                                      {`${contactInfo?.secondaryPhone}`}
                                    </p>
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            ) : (
                              <p className='text-base text-dark text-center'>
                                {`N/A`}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {contactList?.length < totalDataCount && (
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

export default ContactListTab;

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
          className={'flex w-full'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Tên</p>
        </div>
        <div
          className={'flex w-64 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Chức vụ</p>
        </div>
        <div
          className={'flex w-64 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Email</p>
        </div>
        <div
          className={'flex w-40 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-base text-dark font-semibold'>Số điện thoại</p>
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
