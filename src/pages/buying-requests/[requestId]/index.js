import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const BuyingRequestDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/buying-requests/BuyingRequestDetails/BuyingRequestDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function BuyingRequestDetails({ ...props }) {
  const [requestName, setRequestName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(requestName)
            ? `Yêu cầu mua hàng - ${requestName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <BuyingRequestDetailsMain setRequestName={setRequestName} />
    </React.Fragment>
  );
}
