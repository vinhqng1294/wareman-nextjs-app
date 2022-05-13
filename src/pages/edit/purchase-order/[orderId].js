import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const EditPurchaseOrderMain = dynamic(
  () =>
    import(
      '@/components/pages/edit/purchase-order/CreatePurchaseOrder.component'
    ),
  {
    ssr: false,
  }
);

export default function EditPurchaseOrder({ ...props }) {
  const [orderName, setOrderName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(orderName)
            ? `Cập nhật đơn đặt hàng - ${orderName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <EditPurchaseOrderMain updateOrderName={setOrderName} />
    </React.Fragment>
  );
}
