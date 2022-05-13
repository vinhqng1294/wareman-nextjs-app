import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const AddProviderMain = dynamic(
  () => import('@/components/pages/add/provider/AddProvider.component'),
  {
    ssr: false,
  }
);

export default function AddProvider({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Thêm nhà cung cấp</title>
      </Head>
      <AddProviderMain />
    </React.Fragment>
  );
}
