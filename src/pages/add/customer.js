import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const AddCustomerMain = dynamic(
  () => import('@/components/pages/add/customer/AddCustomer.component'),
  {
    ssr: false,
  }
);

export default function AddCustomer({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Thêm khách hàng</title>
      </Head>
      <AddCustomerMain />
    </React.Fragment>
  );
}
