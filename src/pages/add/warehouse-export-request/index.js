import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const WarehouseExportRequestMain = dynamic(
  () =>
    import(
      '@/components/pages/add/warehouse-export-request/FromScratch/CreateWarehouseExportRequest.component'
    ),
  {
    ssr: false,
  }
);

export default function CreateWarehouseExportRequest({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Tạo yêu cầu xuất kho</title>
      </Head>
      <WarehouseExportRequestMain />
    </React.Fragment>
  );
}
