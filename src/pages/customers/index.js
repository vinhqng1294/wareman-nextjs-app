import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const CustomersMain = dynamic(
  () => import('@/components/pages/customers/Customers/Customers.component'),
  {
    ssr: false,
  }
);

export default function Customers({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Danh sách khách hàng</title>
      </Head>
      <CustomersMain />
    </React.Fragment>
  );
}
