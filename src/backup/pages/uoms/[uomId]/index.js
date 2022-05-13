import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import {
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';

const UomDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/uoms/UomDetails/UomDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function UomDetails({ ...props }) {
  const [uomName, setUomName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(uomName)
            ? `Thông tin đơn vị đo - ${uomName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <UomDetailsMain setUomName={setUomName} />
    </React.Fragment>
  );
}
