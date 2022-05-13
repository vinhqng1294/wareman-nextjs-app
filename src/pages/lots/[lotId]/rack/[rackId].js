import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const RackDetailsMain = dynamic(
  () => import('@/components/pages/lots/RackDetails/RackDetails.component'),
  {
    ssr: false,
  }
);

export default function RackDetails({ ...props }) {
  const [rackName, setRackName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(rackName)
            ? `Chi tiết kệ - ${rackName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <RackDetailsMain updateRackName={setRackName} />
    </React.Fragment>
  );
}
