import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const CustomerDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/customers/CustomerDetails/CustomerDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function CustomerDetails({ ...props }) {
  const [customerName, setCustomerName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(customerName)
            ? `Chi tiết khách hàng - ${customerName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <CustomerDetailsMain updateCustomerName={setCustomerName} />
    </React.Fragment>
  );
}
