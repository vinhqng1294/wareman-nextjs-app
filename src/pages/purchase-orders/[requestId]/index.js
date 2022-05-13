import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const PurchaseOrderDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/purchase-orders/PurchaseOrderDetails/PurchaseOrderDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function PurchaseOrderDetails({ ...props }) {
  const [requestName, setRequestName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(requestName)
            ? `Đơn đặt hàng - ${requestName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <PurchaseOrderDetailsMain setRequestName={setRequestName} />
    </React.Fragment>
  );
}
