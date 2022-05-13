import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const BuyingRequestManagementMain = dynamic(
  () =>
    import(
      '@/components/pages/manage/buying-request/BuyingRequestManagement.component'
    ),
  {
    ssr: false,
  }
);

export default function BuyingRequestManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý yêu cầu mua hàng</title>
      </Head>
      <BuyingRequestManagementMain />
    </React.Fragment>
  );
}
