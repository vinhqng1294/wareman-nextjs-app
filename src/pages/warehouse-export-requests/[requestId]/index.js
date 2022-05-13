import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const WarehouseExportRequestDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/warehouse-export-requests/WarehouseExportRequestDetails/WarehouseExportRequestDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function WarehouseExportRequestDetails({ ...props }) {
  const [requestName, setRequestName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(requestName)
            ? `Yêu cầu xuất kho - ${requestName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <WarehouseExportRequestDetailsMain setRequestName={setRequestName} />
    </React.Fragment>
  );
}
