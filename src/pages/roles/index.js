import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const RolesMain = dynamic(
  () => import('@/components/pages/roles/Roles/Roles.component'),
  {
    ssr: false,
  }
);

export default function Roles({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý chức vụ</title>
      </Head>
      <RolesMain />
    </React.Fragment>
  );
}
