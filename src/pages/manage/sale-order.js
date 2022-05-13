import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const SaleOrderManagementMain = dynamic(
  () =>
    import(
      '@/components/pages/manage/sale-order/SaleOrderManagement.component'
    ),
  {
    ssr: false,
  }
);

export default function SaleOrderManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý đơn bán hàng</title>
      </Head>
      <SaleOrderManagementMain />
    </React.Fragment>
  );
}
