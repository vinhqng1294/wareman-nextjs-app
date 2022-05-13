import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const UomManagementMain = dynamic(
  () => import('@/components/pages/manage/uom/UomManagement.component'),
  {
    ssr: false,
  }
);

export default function UomManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý đơn vị đo</title>
      </Head>
      <UomManagementMain />
    </React.Fragment>
  );
}
