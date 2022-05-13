import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const PurchaseOrdersMain = dynamic(
  () =>
    import(
      '@/components/pages/purchase-orders/PurchaseOrders/PurchaseOrders.component'
    ),
  {
    ssr: false,
  }
);

export default function PurchaseOrders({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Xem tất cả đơn đặt hàng</title>
      </Head>
      <PurchaseOrdersMain />
    </React.Fragment>
  );
}
