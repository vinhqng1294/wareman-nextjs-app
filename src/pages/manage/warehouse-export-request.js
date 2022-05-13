import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const WarehouseExportRequestManagementMain = dynamic(
  () =>
    import(
      '@/components/pages/manage/warehouse-export-request/WarehouseExportRequestManagement.component'
    ),
  {
    ssr: false,
  }
);

export default function WarehouseExportRequestManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý yêu cầu xuất kho</title>
      </Head>
      <WarehouseExportRequestManagementMain />
    </React.Fragment>
  );
}
