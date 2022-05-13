import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const EmployeesMain = dynamic(
  () => import('@/components/pages/employees/Employees/Employees.component'),
  {
    ssr: false,
  }
);

export default function Employees({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Danh sách nhân sự</title>
      </Head>
      <EmployeesMain />
    </React.Fragment>
  );
}
