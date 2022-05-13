import Head from 'next/head';
import dynamic from 'next/dynamic';
import { shallowEqual, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';

const LotsMain = dynamic(
  () => import('@/components/pages/lots/Lots/Lots.component'),
  {
    ssr: false,
  }
);

export default function Lots({ ...props }) {
  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  useEffect(function () {
    if (!stringIsNotEmpty(auth?.accessToken)) {
      redirectTo('/login');
    }
  }, [auth?.accessToken]);

  return (
    <React.Fragment>
      <Head>
        <title>Danh sách phân khu</title>
      </Head>
      <LotsMain />
    </React.Fragment>
  );
}
