import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const WarehouseImportRequestDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/warehouse-import-requests/WarehouseImportRequestDetails/WarehouseImportRequestDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function WarehouseImportRequestDetails({ ...props }) {
  const [requestName, setRequestName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(requestName)
            ? `Yêu cầu nhập kho - ${requestName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <WarehouseImportRequestDetailsMain setRequestName={setRequestName} />
    </React.Fragment>
  );
}
