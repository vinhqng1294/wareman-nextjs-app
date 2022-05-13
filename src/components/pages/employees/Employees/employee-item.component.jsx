import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import moment from 'moment';
import Image from 'next/image';
import { makeFullName } from '@/utils/commons/makeFullName.utils';
import { deleteUserRole, getUserRoleById } from '@/apis/user.api';
import { DotLoader } from '@/components/ui/loader/loader.component';
import EmployeeEditForm from './employee-edit-form/employee-edit-form.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';

const EmployeeItem = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  index,
  employeeItemData,
  setWarningMsg,
  setViewWarningPopup,
  viewWarningPopup,
  setWarningPopupOnAccept,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(true);

  const [roleList, setRoleList] = useState([]);
  const [pageSize, setPageSize] = useState(2);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const handleLoadMore = function () {
    setComponentLoading(!componentLoading);
    setCurrPage(currPage + 1);
  };

  const [isEditing, setIsEditing] = useState(false);
  const handleEditBtnOnClick = function () {
    setIsEditing(!isEditing);
  };
  const [isEdited, setIsEdited] = useState(false);

  useEffect(
    function () {
      if (
        stringIsNotEmpty(accessToken) &&
        stringIsNotEmpty(employeeItemData?.userId)
      ) {
        setComponentLoading(true);
        getUserRoleById({
          accessToken: accessToken,
          userId: employeeItemData?.userId,
          reqData: {
            // page: currPage,
            // size: pageSize,
            // keyword: '',
          },
        })
          .then(function ({ data: resData }) {
            console.info('getUserRoleById resData', resData);
            setRoleList([...resData?.data]);
            // setRoleList([...roleList, ...resData?.data]);
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
    [accessToken, employeeItemData, isEdited]
  );

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' border-b border-gray-200')
          .concat(' hover:bg-zinc-50')}
      >
        <div className='flex'>
          <div
            className='flex w-full'
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              // redirectTo(
              //   `/lots/${lotInfo?.id}/rack/${uomInfo?.id}`,
              //   true
              // );
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
                {stringIsNotEmpty(employeeItemData?.defaultPhotoId) ? (
                  <React.Fragment>
                    <Image
                      // loader={function ({ src }) {
                      //   return src;
                      // }}
                      src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/photos/product/download/url?id=${employeeItemData?.defaultPhotoId}`}
                      alt={` `}
                      layout='fill'
                      objectFit='contain'
                      unoptimized
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <ReactSVG
                      src={
                        employeeItemData?.isFemale
                          ? SvgIcon['woman-head']
                          : SvgIcon['man-head']
                      }
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
                {`${makeFullName({
                  firstName: employeeItemData?.firstName,
                  lastName: employeeItemData?.lastName,
                })}`}
              </p>
            </div>
            <div
              className={'flex w-80 flex-none'
                .concat(' items-center justify-start')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark text-center break-all'>
                {`${
                  stringIsNotEmpty(employeeItemData?.email)
                    ? employeeItemData?.email
                    : 'N/A'
                }`}
              </p>
            </div>

            <div
              className={'flex w-52 flex-none flex-wrap'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')}
            >
              {componentLoading ? (
                <React.Fragment>
                  <div className='flex'>
                    <DotLoader loading={componentLoading} />
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {arrayIsNotEmpty(roleList) ? (
                    <React.Fragment>
                      {[...roleList]?.map(function (role, index) {
                        return (
                          <React.Fragment key={index}>
                            {stringIsNotEmpty(role?.roleName) && (
                              <React.Fragment>
                                <RoleChip
                                  roleData={role}
                                  setErrorMsg={setErrorMsg}
                                  setViewErrorPopup={setViewErrorPopup}
                                  viewErrorPopup={viewErrorPopup}
                                  accessToken={accessToken}
                                  userInfo={employeeItemData}
                                  updateIsEdited={setIsEdited}
                                  setWarningMsg={setWarningMsg}
                                  setViewWarningPopup={setViewWarningPopup}
                                  viewWarningPopup={viewWarningPopup}
                                  setWarningPopupOnAccept={
                                    setWarningPopupOnAccept
                                  }
                                />
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p className='text-base text-dark text-center break-all'>
                        N/A
                      </p>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>

            <div
              className={'flex w-36 flex-none'
                .concat(' items-start justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark text-center'>
                {`${
                  stringIsNotEmpty(employeeItemData?.addedDate)
                    ? moment(employeeItemData?.addedDate).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )
                    : 'N/A'
                }`}
              </p>
            </div>
          </div>

          <div
            className={'flex w-16 flex-none'
              .concat(' items-center justify-end')
              .concat(' px-2 py-1.5')
              .concat(' space-x-3')}
          >
            <button
              title='Thay đổi chức vụ'
              type='button'
              className={'flex items-center justify-center'
                .concat(' rounded-lg')
                .concat(' hover:bg-white')
                .concat(' w-6 h-6')
                .concat(' hover:shadow-md hover:border border-zinc-50')}
              onClick={function (evt) {
                evt?.stopPropagation();
                evt?.preventDefault();
                handleEditBtnOnClick();
              }}
            >
              <ReactSVG
                src={SvgIcon['head-side-thinking-sr']}
                className={'fill-blue-500 w-4 h-4'}
              />
            </button>
            <button
              title={
                employeeItemData?.isBlock
                  ? 'Mở khóa tài khoản'
                  : 'Khóa tài khoản'
              }
              type='button'
              className={'flex items-center justify-center'
                .concat(' rounded-lg')
                .concat(' hover:bg-white')
                .concat(' w-6 h-6')
                .concat(' hover:shadow-md hover:border border-zinc-50')}
            >
              <ReactSVG
                src={employeeItemData?.isBlock ? SvgIcon.unlock : SvgIcon.lock}
                className={'w-4 h-4'.concat(
                  employeeItemData?.isBlock
                    ? ' fill-stone-600'
                    : ' fill-red-500'
                )}
              />
            </button>
          </div>
        </div>

        {isEditing && (
          <React.Fragment>
            <div
              className={
                'flex flex-col'
                // .concat(isEditing ? ' not-sr-only' : ' sr-only')
              }
            >
              <EmployeeEditForm
                setErrorMsg={setErrorMsg}
                setViewErrorPopup={setViewErrorPopup}
                viewErrorPopup={viewErrorPopup}
                accessToken={accessToken}
                handleCloseForm={handleEditBtnOnClick}
                userInfo={employeeItemData}
                updateIsEdited={setIsEdited}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default EmployeeItem;

const RoleChip = function ({
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  userInfo,
  updateIsEdited,
  roleData,
  setWarningMsg,
  setViewWarningPopup,
  viewWarningPopup,
  setWarningPopupOnAccept,
  ...props
}) {
  const deleteOnClick = function () {
    setWarningMsg(
      <p className='text-base text-dark text-center'>
        <span>{`Bạn có muốn xoá chức vụ `}</span>
        <span className='font-semibold'>{roleData?.roleName}</span>
        <span>{` của nhân viên `}</span>
        <span className='font-semibold'>
          {makeFullName({
            firstName: userInfo?.firstName,
            lastName: userInfo?.lastName,
          })}
        </span>
        <span>{` không?`}</span>
      </p>
    );
    setWarningPopupOnAccept({
      function: handleDeleteRole,
      params: { roleData, userInfo },
    });
    setViewWarningPopup(true);
  };

  const handleDeleteRole = async function ({ roleData, userInfo, ...props }) {
    console.info('data', { roleData, userInfo });
    await deleteUserRole({
      accessToken: accessToken,
      userId: userInfo?.userId,
      roleId: roleData?.roleId,
    })
      .then(function ({ data: resData }) {
        console.info('deleteUserRole resData', resData);
        if (isFunction(updateIsEdited)) {
          updateIsEdited(true);
        }
      })
      .catch(function (err) {
        console.error('err', err);
        console.error('err', err?.response);
        setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      })
      .finally(function () {
        if (isFunction(updateIsEdited)) {
          updateIsEdited(false);
        }
      });
  };

  return (
    <React.Fragment>
      <div
        className={'flex'
          .concat(' items-center justify-center')
          .concat(' px-2 py-1')
          .concat(' rounded-full')
          .concat(' bg-zinc-200')
          .concat(' space-x-1.5')}
      >
        <p className='text-zinc-500 text-sm font-medium text-center'>{`${roleData?.roleName}`}</p>
        <button
          className='flex hover:shadow rounded-full'
          onClick={function (evt) {
            evt?.stopPropagation();
            evt?.preventDefault();
            deleteOnClick();
          }}
        >
          <ReactSVG src={SvgIcon.cross} className={'fill-red-500 w-2 h-2'} />
        </button>
      </div>
    </React.Fragment>
  );
};
