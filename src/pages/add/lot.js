import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const AddLotMain = dynamic(
  () => import('@/components/pages/add/lot/AddLot.component'),
  {
    ssr: false,
  }
);

export default function AddLot({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Thêm phân khu</title>
      </Head>
      <AddLotMain />
    </React.Fragment>
  );
}
