import Head from 'next/head';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { shallowEqual, useSelector } from 'react-redux';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';

const LoginMain = dynamic(
  () => import('@/components/pages/login/Login.component'),
  {
    ssr: false,
  }
);

const Login = function ({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <LoginMain />
    </React.Fragment>
  );
};

export default Login;
