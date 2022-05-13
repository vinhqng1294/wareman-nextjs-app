import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const PurchaseOrderManagementMain = dynamic(
  () =>
    import(
      '@/components/pages/manage/purchase-order/PurchaseOrderManagement.component'
    ),
  {
    ssr: false,
  }
);

export default function PurchaseOrderManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý đơn đặt hàng</title>
      </Head>
      <PurchaseOrderManagementMain />
    </React.Fragment>
  );
}
