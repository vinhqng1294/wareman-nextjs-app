import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const CreateSaleOrderMain = dynamic(
  () =>
    import(
      '@/components/pages/add/sale-order/CreateSaleOrder.component'
    ),
  {
    ssr: false,
  }
);

export default function CreateSaleOrder({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Tạo đơn bán hàng</title>
      </Head>
      <CreateSaleOrderMain />
    </React.Fragment>
  );
}
