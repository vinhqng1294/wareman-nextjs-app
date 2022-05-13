import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const LotManagementMain = dynamic(
  () => import('@/components/pages/manage/lot/LotManagement.component'),
  {
    ssr: false,
  }
);

export default function LotManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý phân khu</title>
      </Head>
      <LotManagementMain />
    </React.Fragment>
  );
}
