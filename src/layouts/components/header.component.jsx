import ContentContainer from '@/components/ui/container/content-container.component';
import { makeFullName } from '@/utils/commons/makeFullName.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import {
  stringIsNotEmpty,
  objectIsNotEmpty,
  arrayIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import dynamic from 'next/dynamic';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { Action_Auth } from '@/redux/auth/auth.action';
import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { useRouter } from 'next/router';
import { NotificationBtn } from '@/layouts/components/notification.component';
import { Action_Warehouse } from '@/redux/warehouse/warehouse.action';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const Logo = function ({ ...props }) {
  return (
    <React.Fragment>
      <button
        type='button'
        className={'flex items-center justify-center'
          .concat(' rounded-full bg-amber-700')
          .concat(' w-12 h-11')}
        onClick={function (evt) {
          evt?.preventDefault();
          evt?.stopPropagation();
          redirectTo('/');
        }}
      >
        <ReactSVG src={SvgIcon.warehouse} className='w-10 h-10' />
      </button>
      {/* <button
        type='button'
        className={'flex items-center justify-center'
          .concat(' rounded-full bg-amber-700')
          .concat(' xxs:px-3 xxs:py-0.5')
          .concat(' md:px-4 md:py-1')}
        onClick={function (evt) {
          evt?.preventDefault();
          evt?.stopPropagation();
          redirectTo('/');
        }}
      >
        <p
          className={'font-bold text-zinc-50'
            .concat(' xxs:text-2xl md:text-3xl')
            .concat(' text-center')}
        >
          WMS
        </p>
      </button> */}
    </React.Fragment>
  );
};

const UserBtn = function ({
  userData,
  handleLogout,
  handleViewUserProfile,
  ...props
}) {
  const UserText = function ({ ...props }) {
    return (
      <React.Fragment>
        <span className='xxs:sr-only md:not-sr-only font-normal text-zinc-500'>{`Xin chào, `}</span>
        <span>
          {makeFullName({
            firstName: userData?.firstName,
            lastName: userData?.lastName,
          })}
        </span>
      </React.Fragment>
    );
  };

  const dropdownBtnId = 'userDropdownButton';
  const dropdownPopupId = 'userDropdownPopup';

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
        >
          <ReactSVG src={SvgIcon['user']} className={'fill-zinc-500 w-5 h-5'} />
        </div>
        {/* <div className='flex xxs:max-w-[120px] md:max-w-[224px]'>
          <TextEllipsis
            content={<UserText />}
            textFormat={`whitespace-pre-wrap`
              .concat(` text-dark break-all`)
              .concat(' text-base font-semibold')}
            customTextStyles={{
              WebkitLineClamp: 1,
              display: `-webkit-box`,
              WebkitBoxOrient: `vertical`,
            }}
          />
        </div> */}
      </button>

      <div
        id={dropdownPopupId}
        className={'hidden z-10 list-none'
          .concat(' xxs:w-52 md:w-80')
          .concat(' bg-white rounded-md')
          .concat(' border border-zinc-200')
          .concat(' shadow-md')}
      >
        <div
          className={'flex flex-col'.concat(' py-1')}
          aria-labelledby={dropdownBtnId}
        >
          <div className='flex w-full px-2.5 py-1.5'>
            <TextEllipsis
              content={<UserText />}
              textFormat={`whitespace-pre-wrap`
                .concat(` text-dark break-all`)
                .concat(' text-base font-semibold')}
              customTextStyles={{
                WebkitLineClamp: 1,
                display: `-webkit-box`,
                WebkitBoxOrient: `vertical`,
              }}
            />
          </div>
          <div className='flex border-b border-zinc-200'></div>
          {/* <button
            type='button'
            className={'flex items-center justify-start'
              .concat(' hover:bg-zinc-500 hover:bg-opacity-5')
              .concat(' xxs:px-4 xxs:py-1.5')
              .concat(' md:px-5 md:py-2')}
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              if (isFunction(handleViewUserProfile)) {
                handleViewUserProfile();
              }
            }}
          >
            <p className='text-base text-dark'>Hồ sơ cá nhân</p>
          </button> */}
          <div className='flex border-b border-zinc-200'></div>
          <button
            type='button'
            className={'flex items-center justify-start'
              .concat(' hover:bg-zinc-500 hover:bg-opacity-5')
              .concat(' xxs:px-4 xxs:py-1.5')
              .concat(' md:px-5 md:py-2')}
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              if (isFunction(handleLogout)) {
                handleLogout();
              }
            }}
          >
            <p className='text-base text-red-500 font-semibold'>Đăng xuất</p>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

const WarehouseBtn = function ({
  handleSwitchWarehouse,
  warehouseInfo,
  ...props
}) {
  const dropdownBtnId = 'warehouseDropdownButton';
  const dropdownPopupId = 'warehouseDropdownPopup';

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
        >
          <ReactSVG src={SvgIcon.garage} className={'fill-zinc-500 w-5 h-5'} />
        </div>
        {/* <div className='flex xxs:max-w-[120px] md:max-w-[224px]'>
          <TextEllipsis
            content={<UserText />}
            textFormat={`whitespace-pre-wrap`
              .concat(` text-dark break-all`)
              .concat(' text-base font-semibold')}
            customTextStyles={{
              WebkitLineClamp: 1,
              display: `-webkit-box`,
              WebkitBoxOrient: `vertical`,
            }}
          />
        </div> */}
      </button>

      <div
        id={dropdownPopupId}
        className={'hidden z-10 list-none'
          .concat(' xxs:w-52 md:w-80')
          .concat(' bg-white rounded-md')
          .concat(' border border-zinc-200')
          .concat(' shadow-md')}
      >
        <div
          className={'flex flex-col'.concat(' py-1')}
          aria-labelledby={dropdownBtnId}
        >
          <div className='flex w-full px-2.5 py-1.5'>
            <TextEllipsis
              content={`<Tên nhà kho>`}
              textFormat={`whitespace-pre-wrap`
                .concat(` text-dark break-all`)
                .concat(' text-base font-semibold')}
              customTextStyles={{
                WebkitLineClamp: 1,
                display: `-webkit-box`,
                WebkitBoxOrient: `vertical`,
              }}
            />
          </div>
          <div className='flex border-b border-zinc-200'></div>
          <button
            type='button'
            className={'flex items-center justify-start'
              .concat(' hover:bg-zinc-500 hover:bg-opacity-5')
              .concat(' xxs:px-4 xxs:py-1.5')
              .concat(' md:px-5 md:py-2')}
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              if (isFunction(handleSwitchWarehouse)) {
                handleSwitchWarehouse();
              }
            }}
          >
            <p className='text-base text-blue-500 font-semibold'>Đổi nhà kho</p>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

const LoginBtn = function ({ handleLogin, ...props }) {
  return (
    <React.Fragment>
      <button
        type='button'
        className={'flex items-center justify-center'
          .concat(' rounded-full')
          .concat(' xxs:px-3.5 xxs:py-1.5 md:px-5 md:py-2')
          .concat(' bg-white')
          .concat(' border-2 border-zinc-200')
          .concat(
            false
              ? ' bg-opacity-50 cursor-not-allowed'
              : ' hover:shadow-md hover:bg-opacity-90'
          )}
        onClick={function (evt) {
          evt?.preventDefault();
          evt?.stopPropagation();
          if (isFunction(handleLogin)) {
            handleLogin();
          }
        }}
      >
        <p className='text-base text-dark font-semibold'>Đăng nhập</p>
      </button>
    </React.Fragment>
  );
};

const quickAccessBtnData = {
  id: 'quickAccessDropdownButton',
  name: 'Truy cập nhanh',
  toggleId: 'quickAccessDropdownPopup',
  items: [
    { name: 'Quản lý đơn vị đo', href: '/manage/uom' },
    { name: 'Quản lý phân khu', href: '/manage/lot' },
    { name: 'Quản lý sản phẩm', href: '/manage/product' },
    { name: 'Quản lý nhà cung cấp', href: '/manage/provider' },
    { name: 'Quản lý khách hàng', href: '/manage/customer' },
    { name: 'Quản lý yêu cầu mua hàng', href: '/manage/buying-request' },
    { name: 'Quản lý đơn đặt hàng', href: '/manage/purchase-order' },
    { name: 'Quản lý đơn bán hàng', href: '/manage/sale-order' },
    {
      name: 'Quản lý yêu cầu nhập kho',
      href: '/manage/warehouse-import-request',
    },
    {
      name: 'Quản lý yêu cầu xuất kho',
      href: '/manage/warehouse-export-request',
    },
    { name: 'Quản lý nhân sự', href: '/manage/employee' },
    { name: 'Quản lý chức vụ', href: '/manage/role' },
  ],
};

const toolsBtnData = {
  id: 'toolsDropdownButton',
  name: 'Công cụ',
  toggleId: 'toolsDropdownPopup',
  items: [
    { name: 'Thêm sản phẩm', href: '/add/product' },
    { name: 'Thêm phân khu', href: '/add/lot' },
    { name: 'Tạo đơn mua hàng', href: '/add/buying-request' },
    { name: 'Thêm đơn vị đo', href: '/add/uom' },
    { name: 'Thêm nhân sự', href: '/add/employee' },
    { name: 'Thêm nhà cung cấp', href: '/add/provider' },
    { name: 'Thêm khách hàng', href: '/add/customer' },
    { name: 'Thêm đơn đặt hàng', href: '/add/purchase-order' },
    { name: 'Thêm đơn bán hàng', href: '/add/sale-order' },
    { name: 'Thêm chức vụ', href: '/add/role' },
  ],
};

const helpBtnData = {
  id: 'helpDropdownButton',
  name: 'Giúp đỡ',
  toggleId: 'helpDropdownPopup',
  items: [],
};

const DropDownBtn = function ({ data, ...props }) {
  return (
    <React.Fragment>
      <button
        id={data?.id}
        type='button'
        data-dropdown-toggle={data?.toggleId}
        // data-dropdown-placement='bottom-end'
        className={'flex items-center justify-center'
          .concat(' border-b-2 border-transparent')
          .concat(' md:visible xxs:invisible')
          .concat(' hover:border-sky-400')}
      >
        <p className='text-base font-medium hover:text-sky-500 py-1'>
          {data?.name}
        </p>
      </button>
      <div
        id={data?.toggleId}
        className={'hidden z-10 list-none'
          .concat(' xxs:w-52 md:w-60')
          .concat(' bg-white rounded-md')
          .concat(' border border-zinc-200')
          .concat(' shadow-md')}
      >
        <div
          className={'flex flex-col'.concat(' py-1')}
          aria-labelledby={data?.id}
        >
          {[...data?.items]?.map(function (item, index) {
            return (
              <React.Fragment key={index}>
                <button
                  type='button'
                  className={'flex items-center justify-start'
                    .concat(' hover:bg-zinc-500 hover:bg-opacity-5')
                    .concat(' xxs:px-4 xxs:py-1.5')
                    .concat(' md:px-5 md:py-2')}
                >
                  <a className='text-base text-dark w-full' href={item?.href}>
                    {item?.name}
                  </a>
                </button>
                {[...data?.items]?.length !== index + 1 && (
                  <React.Fragment>
                    <div className='flex border-b border-zinc-200'></div>
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

const Header = function ({ bgColor, notification, ...props }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { auth, warehouse } = useSelector(
    (state) => ({ auth: state?.auth, warehouse: state?.warehouse }),
    shallowEqual
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [path, setPath] = useState('/');

  const handleLogin = function () {
    redirectTo('/login');
  };

  const handleLogout = function () {
    dispatch(Action_Auth.Logout());
    dispatch(Action_Warehouse.ClearSelectedWarehouseInfo({}));
    redirectTo('/login');
  };

  const handleViewUserProfile = function () {
    setTimeout(() => {
      redirectTo('/user-profile');
    }, 200);
  };

  const handleSwitchWarehouse = function () {
    setTimeout(() => {
      redirectTo('/switch/warehouse');
    }, 200);
  };

  useEffect(
    function () {
      if (stringIsNotEmpty(auth?.accessToken)) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    },
    [auth]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(router?.pathname)) {
        setPath(router?.pathname);
      }
    },
    [router?.pathname]
  );

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <div
        className={'flex flex-col flex-none'
          .concat(' items-center')
          .concat(stringIsNotEmpty(bgColor) ? ` ${bgColor}` : ' bg-white')}
      >
        <ContentContainer>
          <div
            className={'flex item-center'
              .concat(' xxs:px-4 xxs:py-3')
              .concat(' md:px-5 md:py-3.5')}
          >
            <Logo />
            {isLoggedIn && path !== '/' && (
              <React.Fragment>
                <div
                  className={'flex ml-8'
                    .concat(' items-center')
                    .concat(' space-x-6')}
                >
                  {/* {arrayIsNotEmpty(quickAccessBtnData?.items) && (
                    <DropDownBtn data={quickAccessBtnData} />
                  )} */}
                  {/* {arrayIsNotEmpty(toolsBtnData?.items) && (
                    <DropDownBtn data={toolsBtnData} />
                  )} */}
                  {/* {arrayIsNotEmpty(helpBtnData?.items) && (
                    <DropDownBtn data={helpBtnData} />
                  )} */}
                </div>
              </React.Fragment>
            )}

            <div className='flex items-center space-x-3 ml-auto'>
              {isLoggedIn ? (
                <>
                  <NotificationBtn config={notification}/>
                  <UserBtn
                    userData={auth?.user1}
                    handleLogout={handleLogout}
                    handleViewUserProfile={handleViewUserProfile}
                  />
                  {/* <WarehouseBtn
                    handleSwitchWarehouse={handleSwitchWarehouse}
                    warehouseInfo={warehouse?.selectedWarehouseInfo}
                  /> */}
                </>
              ) : (
                <LoginBtn handleLogin={handleLogin} />
              )}
            </div>
          </div>
        </ContentContainer>
      </div>
    </React.Fragment>
  );
};

export default Header;
