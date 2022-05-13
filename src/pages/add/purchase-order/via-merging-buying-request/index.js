import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const ViaMergingBuyingRequestMain = dynamic(
  () =>
    import(
      '@/components/pages/add/purchase-order/ViaMergingBuyingRequest/ViaMergingBuyingRequest.component'
    ),
  {
    ssr: false,
  }
);

export default function CreatePurchaseOrderViaMergingBuyingRequest({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Tạo đơn đặt hàng từ yêu cầu mua hàng</title>
      </Head>
      <ViaMergingBuyingRequestMain />
    </React.Fragment>
  );
}
