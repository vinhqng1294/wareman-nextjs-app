import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const WarehouseImportRequestsMain = dynamic(
  () =>
    import(
      '@/components/pages/warehouse-import-requests/WarehouseImportRequests/WarehouseImportRequests.component'
    ),
  {
    ssr: false,
  }
);

export default function WarehouseImportRequests({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Xem tất cả yêu cầu nhập kho</title>
      </Head>
      <WarehouseImportRequestsMain />
    </React.Fragment>
  );
}
