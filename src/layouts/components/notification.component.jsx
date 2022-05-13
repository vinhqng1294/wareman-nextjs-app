import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {
  getNotifications,
} from '@/libs/apis/notification.api';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';
import EmptyListInfo, {
  ErrorListInfo,
} from '@/components/ui/empty-list-info/empty-list-info.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { DotLoader } from '@/components/ui/loader/loader.component';
import moment from 'moment';
import Image from 'next/image';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';

const NotificationItem = function ({ notification, hideisRead = true, ...props }) {
  return (
    <React.Fragment>
      <a href={`/${notification?.scope?.toLowerCase()}s/${notification?.options?.data?.id}`} className='bg-white'>
        <div className='flex items-center space-x-4'>
          <div className='flex w-8 h-8 relative'>
            <Image
              src={`/warehouse-32x32.png`}
              alt={` `}
              layout='fill'
              objectFit='contain'
              unoptimized
            />
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-gray-900 dark:text-white'>
              {notification?.options?.title}
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {notification?.options?.body}
            </p>
            <p
              className={'text-sm truncate'.concat(
                !notification?.isRead ? ' text-sky-500' : ' text-gray-400'
              )}
            >
              {`${
                stringIsNotEmpty(notification?.addedDate)
                  ? moment(notification?.addedDate).format(
                      'DD/MM/YYYY HH:mm:ss'
                    )
                  : 'N/A'
              }`}
            </p>
          </div>
          {hideisRead
            ? ''
            : <div
                className={'inline-flex items-center text-base font-semibold'.concat(
                  ' text-gray-900 dark:text-white'
                )}
              >
                <ReactSVG
                  src={SvgIcon['notification-is-read']}
                  className={'w-2 h-2'.concat(
                    !notification?.isRead ? ' fill-sky-500' : ' fill-gray-400'
                  )}
                />
              </div>
          }

        </div>
      </a>
    </React.Fragment>
  );
};

const NotificationPopup = ({
  popupNotification,
  isPopupClosed,
  setIsPopupClosed,
  isPopupRemoved,
  setIsPopupRemoved,
  visibleDuration = 5000,
  ...props
}) => {
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    // setIsClosed(true);
    try {
      // console.log('Clear timeout id:', timeoutId);
      clearTimeout(timeoutId);
      const id = setTimeout(() => {
        setIsPopupRemoved(true);
      }, visibleDuration);

      // console.log('Set timeout id:', id);
      setTimeoutId(id);
    } catch (e) {
      console.log('Set timeout to remove notification popup failed');
    }
  }, [popupNotification]);

  const durationClasses = {
    75: 'duration-75',
    100: 'duration-100',
    150: 'duration-150',
    200: 'duration-200',
    300: 'duration-300',
    500: 'duration-500',
    700: 'duration-700',
    1000: 'duration-1000',
    3000: 'duration-[3000ms]',
    5000: 'duration-[5000ms]',
    10000: 'duration-[10000ms]',
  };

  const handleOnClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const url = `/${popupNotification?.scope?.toLowerCase()}s/${popupNotification?.options?.data?.id}`;
    redirectTo(url);
  }

  return (
    <>
      { !isPopupRemoved && (
        <div
          id='toast-notification'
          className={'fixed bottom-5 right-5'
            .concat(' w-full max-w-xs p-4 text-gray-900')
            .concat(' bg-gray-50 rounded-lg shadow')
            .concat(' dark:bg-gray-800 dark:text-gray-300 hover:cursor-pointer ')
            // .concat(durationClasses[visibleDuration])
            .concat(' divide-y-4')}
            // .concat(isClosed ? ' opacity-0 ease-out' : '')
            // .concat(isRemoved ? ' hidden' : '')}
          role='alert'
          onClick={handleOnClick}
        >
          <div className="flex items-center mb-3 space-x-2">
            <div className='flex relative'>
              <ReactSVG
                src={SvgIcon['notification']}
                className={'fill-sky-500 w-5 h-5 animate-bounce'}
              />
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Thông báo mới</span>
          </div>
          <NotificationItem notification={popupNotification}/>
        </div>
      )}
    </>
  );
};

export const NotificationBtn = ({ config, hideViewAll = false }) => {
  const dropdownBtnId = 'notificationDropdownButton';
  const dropdownPopupId = 'notificationDropdownPopup';

  const [showNotification, setShowNotification] = useState(false);

  const handleOnClick = (event) => {
    // event?.preventDefault();
    // event?.stopPropagation();
    setShowNotification(!showNotification);
  };

  return (
    <React.Fragment>
      <button
        id={dropdownBtnId}
        type='button'
        data-dropdown-toggle={dropdownPopupId}
        // data-dropdown-placement='bottom-end'
        className={'flex items-center justify-center'
          .concat(' rounded-full')
          .concat(' space-x-2')
          .concat(' bg-transparent')
          .concat(' border-0 border-transparent')}
      >
        <div
          className={'flex items-center justify-center'
            .concat(' bg-zinc-100')
            .concat(' w-10 h-10')
            .concat(' rounded-full')
            .concat(' flex-none')}
          onClick={handleOnClick}
        >
          <ReactSVG src={SvgIcon.bell} className={'fill-zinc-500 w-5 h-5'} />
        </div>
      </button>
      {
        <NotificationMain
          config={config}
          hideViewAll={hideViewAll}
          dropdownBtnId={dropdownBtnId}
          dropdownPopupId={dropdownPopupId}
        />
      }
    </React.Fragment>
  );
};

export const NotificationMain = function ({
  config,
  hideViewAll = false,
  dropdownBtnId,
  dropdownPopupId,
}) {
  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [isPopupClosed, setIsPopupClosed] = useState(false);
  const [isPopupRemoved, setIsPopupRemoved] = useState(true);
  const [popupNotification, setPopupNotification] = useState(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [currPage, setCurrPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const handleLoadMore = function (event) {
    const scrollTopMax =
      event?.target?.scrollHeight -
      event?.target?.clientTop * 2 -
      event?.target?.clientHeight;
    if (
      event?.target?.scrollTop >= scrollTopMax
      && notifications?.length < totalDataCount
      && Math.round(notifications?.length/pageSize) === currPage
    ) {
      // console.log(Math.round(notifications?.length/pageSize));
      // console.log(event?.target?.scrollTop, scrollTopMax);
      // console.log(notifications?.length);
      setPageLoading(true);
      setCurrPage(currPage + 1);
    }
  };

  const handleNotificationMessage = (message) => {
    console.log('Receive notification: ', JSON.parse(message));
    setPopupNotification(JSON.parse(message));
    setIsPopupRemoved(false);
    setNotifications([JSON.parse(message), ...notifications]);
    setTotalDataCount(totalDataCount + 1);
  };

  config?.provider?.connection?.off('Notification');
  config?.provider?.connection?.on('Notification', handleNotificationMessage);

  useEffect(
    function () {
      if (stringIsNotEmpty(auth?.accessToken)) {
        getNotifications({
          accessToken: auth?.accessToken,
          reqData: {
            page: currPage,
            size: pageSize,
          },
        })
          .then(function ({ data: resData }) {
            setNotifications([...notifications, ...resData?.data]);
            setTotalDataCount(resData?.paginationData?.totalResultsCount ?? 0);
            setPageLoading(false);
            setErrorMsg('');
          })
          .catch(function (e) {
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
          });
      }
    },
    [currPage]
  );

  const data = notifications;
  return (
    <React.Fragment>
      <div
        id={dropdownPopupId}
        className={'hidden z-10 list-none'
          .concat(' xxs:w-full md:w-96 overflow-auto')
          .concat(' xxs:max-h-full md:max-h-[32rem]')
          .concat(' bg-white rounded-md')
          .concat(' border border-zinc-200')
          .concat(' shadow-md')}
        onScroll={handleLoadMore}
      >
        <div
          className={'flex flex-col'.concat(' py-1')}
          aria-labelledby={dropdownBtnId}
        >
          <div className={'p-4 max-w-md'}>
            <div className='flex justify-between items-center mb-4'>
              <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
                Thông báo
              </h5>
              {!hideViewAll && (
                <a
                  href='#'
                  className={'text-sm font-medium text-blue-600'
                    .concat(' hover:text-sky-500 border-b-2 border-transparent')
                    .concat(' hover:border-sky-400 dark:text-blue-500')}
                >
                  Xem tất cả
                </a>
              )}
            </div>
            <div className='flow-root'>
              {stringIsNotEmpty(errorMsg) ? (
                <ErrorListInfo message={errorMsg} />
              ) : arrayIsNotEmpty(data) ? (
                <>
                  <ul
                    role='list'
                    className='divide-y divide-gray-200 dark:divide-gray-700'
                  >
                    {data?.map((item, index) => (
                      <li className='py-3 sm:py-4' key={index} >
                        <NotificationItem notification={item} />
                      </li>
                    ))}
                  </ul>
                  {pageLoading ? (
                    <React.Fragment>
                      <div className='flex flex-col items-center py-10 px-3'>
                        <DotLoader loading={pageLoading} />
                      </div>
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                <React.Fragment>
                  {pageLoading ? (
                    <React.Fragment>
                      <div className='flex flex-col items-center py-10 px-3'>
                        <DotLoader loading={pageLoading} />
                      </div>
                    </React.Fragment>
                  ) : (
                    <EmptyListInfo itemLabel={'thông báo'} />
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* TODO: list NotificationPopup */}
      <NotificationPopup
        popupNotification={popupNotification}
        isPopupClosed={isPopupClosed}
        setIsPopupClosed={setIsPopupClosed}
        isPopupRemoved={isPopupRemoved}
        setIsPopupRemoved={setIsPopupRemoved}
      />
    </React.Fragment>
  );
};
