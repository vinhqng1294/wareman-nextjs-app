import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const ProvidersMain = dynamic(
  () => import('@/components/pages/providers/Providers/Providers.component'),
  {
    ssr: false,
  }
);

export default function Providers({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Danh sách nhà cung cấp</title>
      </Head>
      <ProvidersMain />
    </React.Fragment>
  );
}
