import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const BuyingRequestMain = dynamic(
  () =>
    import(
      '@/components/pages/buying-requests/BuyingRequests/BuyingRequests.component'
    ),
  {
    ssr: false,
  }
);

export default function BuyingRequest({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Xem yêu cầu mua hàng</title>
      </Head>
      <BuyingRequestMain />
    </React.Fragment>
  );
}
