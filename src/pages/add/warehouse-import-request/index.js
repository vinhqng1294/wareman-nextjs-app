import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const WarehouseExportRequestMain = dynamic(
  () =>
    import(
      '@/components/pages/add/warehouse-import-request/FromScratch/CreateWarehouseImportRequest.component'
    ),
  {
    ssr: false,
  }
);

export default function CreateWarehouseExportRequest({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Tạo yêu cầu nhập kho</title>
      </Head>
      <WarehouseExportRequestMain />
    </React.Fragment>
  );
}
