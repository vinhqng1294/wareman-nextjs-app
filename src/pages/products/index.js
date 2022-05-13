import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const ProductsMain = dynamic(
  () => import('@/components/pages/products/Products/Products.component'),
  {
    ssr: false,
  }
);

export default function Products({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Danh sách sản phẩm</title>
      </Head>
      <ProductsMain />
    </React.Fragment>
  );
}
