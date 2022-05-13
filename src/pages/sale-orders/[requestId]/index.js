import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const SaleOrderDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/sale-orders/SaleOrderDetails/SaleOrderDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function SaleOrderDetails({ ...props }) {
  const [requestName, setRequestName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(requestName)
            ? `Đơn bán hàng - ${requestName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <SaleOrderDetailsMain setRequestName={setRequestName} />
    </React.Fragment>
  );
}
