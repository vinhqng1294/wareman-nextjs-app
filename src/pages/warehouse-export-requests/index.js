import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const WarehouseExportRequestsMain = dynamic(
  () =>
    import(
      '@/components/pages/warehouse-export-requests/WarehouseExportRequests/WarehouseExportRequests.component'
    ),
  {
    ssr: false,
  }
);

export default function WarehouseExportRequests({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Xem tất cả xuất kho</title>
      </Head>
      <WarehouseExportRequestsMain />
    </React.Fragment>
  );
}
