import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const ProductManagementMain = dynamic(
  () => import('@/components/pages/manage/product/ProductManagement.component'),
  {
    ssr: false,
  }
);

export default function ProductManagement({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Quản lý sản phẩm</title>
      </Head>
      <ProductManagementMain />
    </React.Fragment>
  );
}
