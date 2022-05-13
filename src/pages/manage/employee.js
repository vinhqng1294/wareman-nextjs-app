import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const EmployeeManagementMain = dynamic(
  () =>
    import('@/components/pages/manage/employee/EmployeeManagement.component'),
  {
    ssr: false,
  }
);

export default function EmployeeManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý nhân sự</title>
      </Head>
      <EmployeeManagementMain />
    </React.Fragment>
  );
}
