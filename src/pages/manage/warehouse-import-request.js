import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const WarehouseImportRequestManagementMain = dynamic(
  () =>
    import(
      '@/components/pages/manage/warehouse-import-request/WarehouseImportRequestManagement.component'
    ),
  {
    ssr: false,
  }
);

export default function WarehouseImportRequestManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý yêu cầu nhập kho</title>
      </Head>
      <WarehouseImportRequestManagementMain />
    </React.Fragment>
  );
}
