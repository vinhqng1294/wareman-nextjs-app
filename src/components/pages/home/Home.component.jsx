import ContentContainer from '@/components/ui/container/content-container.component';
import DefaultLayout from '@/layouts/Default.layout';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import UnauthorizedView from './unauthorized-view.component';
import AuthorizedView from './authorized-view.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const HomeMain = function ({ ...props }) {
  const dispatch = useDispatch();

  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <DefaultLayout bodyVerticalCenter layoutBgColor={'bg-white'}>
        <ContentContainer cssClassnames={'xxs:px-2 md:px-5 py-4'}>
          <div className={'flex flex-col'.concat(' items-center').concat('')}>
            <p
              className={'text-dark text-center font-bold'
                .concat(' xxs:text-2xl')
                .concat(' md:text-4xl')
                .concat(' px-6')}
            >
              Chào mừng bạn đến với hệ thống quản lý kho
            </p>
            {!isLoggedIn ? (
              <React.Fragment>
                <UnauthorizedView />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <AuthorizedView permissionList={auth?.user1?.permissions} />
              </React.Fragment>
            )}
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default HomeMain;
