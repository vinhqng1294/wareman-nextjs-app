import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const AddRackMain = dynamic(
  () => import('@/components/pages/add/rack/AddRack.component'),
  {
    ssr: false,
  }
);

export default function AddLot({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Thêm kệ</title>
      </Head>
      <AddRackMain />
    </React.Fragment>
  );
}
