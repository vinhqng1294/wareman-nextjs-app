import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import {
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';

const RoleDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/roles/RoleDetails/RoleDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function RoleDetails({ ...props }) {
  const [roleName, setRoleName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(roleName)
            ? `Thông tin chức vụ - ${roleName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <RoleDetailsMain setRoleName={setRoleName} />
    </React.Fragment>
  );
}
