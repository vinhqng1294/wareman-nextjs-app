import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const UpdateProductStockMain = dynamic(
  () =>
    import(
      '@/components/pages/update/product-stock/UpdateProductStock.component'
    ),
  {
    ssr: false,
  }
);

export default function MoveProduct({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Di chuyển sản phẩm trong kho</title>
      </Head>
      <UpdateProductStockMain />
    </React.Fragment>
  );
}
