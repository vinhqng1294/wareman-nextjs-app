import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const LotDetailsMain = dynamic(
  () => import('@/components/pages/lots/LotDetails/LotDetails.component'),
  {
    ssr: false,
  }
);

export default function LotDetails({ ...props }) {
  const [lotName, setLotName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(lotName)
            ? `Chi tiết phân khu - ${lotName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <LotDetailsMain updateLotName={setLotName} />
    </React.Fragment>
  );
}
