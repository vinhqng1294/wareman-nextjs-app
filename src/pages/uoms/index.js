import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const UomsMain = dynamic(
  () => import('@/components/pages/uoms/Uoms/Uoms.component'),
  {
    ssr: false,
  }
);

export default function Uoms({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Danh sách đơn vị đo</title>
      </Head>
      <UomsMain />
    </React.Fragment>
  );
}
