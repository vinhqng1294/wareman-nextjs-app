import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const SaleOrdersMain = dynamic(
  () =>
    import(
      '@/components/pages/sale-orders/SaleOrders/SaleOrders.component'
    ),
  {
    ssr: false,
  }
);

export default function SaleOrders({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Xem tất cả đơn bán hàng</title>
      </Head>
      <SaleOrdersMain />
    </React.Fragment>
  );
}
