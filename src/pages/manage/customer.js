import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const CustomerManagementMain = dynamic(
  () => import('@/components/pages/manage/customer/CustomerManagement.component'),
  {
    ssr: false,
  }
);

export default function CustomerManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý khách hàng</title>
      </Head>
      <CustomerManagementMain />
    </React.Fragment>
  );
}
