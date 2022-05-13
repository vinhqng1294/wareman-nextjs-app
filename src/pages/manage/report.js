import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const ReportManagementMain = dynamic(
  () =>
    import(
      '@/components/pages/manage/report/ReportManagement.component'
    ),
  {
    ssr: false,
  }
);

export default function PurchaseOrderManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý báo cáo</title>
      </Head>
      <ReportManagementMain />
    </React.Fragment>
  );
}
