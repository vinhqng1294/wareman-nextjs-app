import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const AddUomMain = dynamic(
  () => import('@/components/pages/add/uom/AddUom.component'),
  {
    ssr: false,
  }
);

export default function AddUom({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Thêm đơn vị đo</title>
      </Head>
      <AddUomMain />
    </React.Fragment>
  );
}
