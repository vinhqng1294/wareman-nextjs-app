import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const WarehouseImportExportReportMain = dynamic(
  () =>
    import(
      '@/components/pages/report/warehouse-import-export/WarehouseImportExportReport.component'
    ),
  {
    ssr: false,
  }
);

export default function Products({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Báo cáo xuất nhập tồn</title>
      </Head>
      <WarehouseImportExportReportMain />
    </React.Fragment>
  );
}
