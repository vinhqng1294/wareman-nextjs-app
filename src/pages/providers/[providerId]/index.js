import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const ProviderDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/providers/ProviderDetails/ProviderDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function ProviderDetails({ ...props }) {
  const [providerName, setProviderName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(providerName)
            ? `Chi tiết nhà cung cấp - ${providerName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <ProviderDetailsMain updateProviderName={setProviderName} />
    </React.Fragment>
  );
}
