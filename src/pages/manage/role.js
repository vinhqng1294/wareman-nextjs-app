import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const RoleManagementMain = dynamic(
  () =>
    import('@/components/pages/manage/role/RoleManagement.component'),
  {
    ssr: false,
  }
);

export default function RoleManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý chức vụ</title>
      </Head>
      <RoleManagementMain />
    </React.Fragment>
  );
}
