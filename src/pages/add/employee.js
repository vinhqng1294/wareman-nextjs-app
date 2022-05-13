import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const AddEmployeeMain = dynamic(
  () => import('@/components/pages/add/employee/AddEmployee.component'),
  {
    ssr: false,
  }
);

export default function AddEmployee({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Thêm nhân viên</title>
      </Head>
      <AddEmployeeMain />
    </React.Fragment>
  );
}
