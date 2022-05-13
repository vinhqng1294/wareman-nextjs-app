import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

const ProductDetailsMain = dynamic(
  () =>
    import(
      '@/components/pages/products/ProductDetails/ProductDetails.component'
    ),
  {
    ssr: false,
  }
);

export default function ProductDetails({ ...props }) {
  const [productName, setProductName] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>
          {stringIsNotEmpty(productName)
            ? `Chi tiết sản phẩm - ${productName}`
            : `Đang tải ...`}
        </title>
      </Head>
      <ProductDetailsMain setProductName={setProductName} />
    </React.Fragment>
  );
}
