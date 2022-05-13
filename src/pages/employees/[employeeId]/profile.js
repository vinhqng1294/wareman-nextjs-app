import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import {
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';

const EmployeeDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/employees/EmployeeDetails/EmployeeDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function EmployeeDetails({ ...props }) {
  const [employeeName, setEmployeeName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(employeeName)
            ? `Thông tin nhân viên - ${employeeName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <EmployeeDetailsMain setEmployeeName={setEmployeeName} />
    </React.Fragment>
  );
}
