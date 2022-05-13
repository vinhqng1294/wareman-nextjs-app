import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const AddProductMain = dynamic(
  () => import('@/components/pages/add/product/AddProduct.component'),
  {
    ssr: false,
  }
);

export default function AddProduct({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Thêm sản phẩm</title>
      </Head>
      <AddProductMain />
    </React.Fragment>
  );
}
