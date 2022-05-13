import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const CreateBuyingRequestMain = dynamic(
  () =>
    import(
      '@/components/pages/add/buying-request/CreateBuyingRequest.component'
    ),
  {
    ssr: false,
  }
);

export default function CreateBuyingRequest({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Tạo yêu cầu mua hàng</title>
      </Head>
      <CreateBuyingRequestMain />
    </React.Fragment>
  );
}
