import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const WarehouseImportRequestMain = dynamic(
  () =>
    import(
      '@/components/pages/add/warehouse-import-request/FromPurchaseOrder/CreateWarehouseImportRequest.component'
    ),
  {
    ssr: false,
  }
);

export default function CreateWarehouseImportRequest({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Tạo yêu cầu nhập kho từ đơn đặt hàng</title>
      </Head>
      <WarehouseImportRequestMain />
    </React.Fragment>
  );
}
