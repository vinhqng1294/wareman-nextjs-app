import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const ProviderManagementMain = dynamic(
  () => import('@/components/pages/manage/provider/ProviderManagement.component'),
  {
    ssr: false,
  }
);

export default function ProviderManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý nhà cung cấp</title>
      </Head>
      <ProviderManagementMain />
    </React.Fragment>
  );
}
