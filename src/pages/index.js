import Head from 'next/head';
import dynamic from 'next/dynamic';
import React from 'react';

const HomeMain = dynamic(
  () => import('@/components/pages/home/Home.component'),
  {
    ssr: false,
  }
);

export default function Home({ ...props }) {
  return (
    <React.Fragment>
      <Head>
        <title>Trang chủ</title>
      </Head>
      <HomeMain />
    </React.Fragment>
  );
}
