import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const CreatePurchaseOrderMain = dynamic(
  () =>
    import(
      '@/components/pages/add/purchase-order/NewPurchaseOrder/CreatePurchaseOrder.component'
    ),
  {
    ssr: false,
  }
);

export default function CreatePurchaseOrder({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Tạo đơn đặt hàng</title>
      </Head>
      <CreatePurchaseOrderMain />
    </React.Fragment>
  );
}
