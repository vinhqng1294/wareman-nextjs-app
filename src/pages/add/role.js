import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const AddRoleMain = dynamic(
  () => import('@/components/pages/add/role/AddRole.component'),
  {
    ssr: false,
  }
);

export default function AddRole({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Thêm chức vụ</title>
      </Head>
      <AddRoleMain />
    </React.Fragment>
  );
}
