import ContentContainer from '@/components/ui/container/content-container.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import ProductInfoView from './product-info-viewer/product-info-viewer.component';
import {
  objectIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { useRouter } from 'next/router';
import { getProductInfoById } from '@/apis/product.api';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import ProductTabViewer from './product-tab-viewer/product-tab-viewer.component';
import SimpleBreadcrumb from '@/components/ui/breadcrumb/breadcrumb.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const ProductDetailsMain = function ({ setProductName, ...props }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [pageLoading, setPageLoading] = useState(false);

  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorPopupOnClose = function () {
    setViewErrorPopup(!viewErrorPopup);
    setErrorMsg('');
    setPageLoading(false);
  };

  const [productId, setProductId] = useState('');
  const [productInfo, setProductInfo] = useState({});

  useEffect(
    function () {
      if (!stringIsNotEmpty(auth?.accessToken)) {
        redirectTo('/login');
      }
    },
    [auth?.accessToken]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(router?.query)) {
        setProductId(router?.query?.productId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(productId)) {
        getProductInfoById({ accessToken: auth?.accessToken, productId })
          .then(function ({ data: resData }) {
            console.info('getProductInfoById resData', resData);
            setProductInfo({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [productId]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(productInfo) && objectIsNotNull(setProductName)) {
        setProductName(productInfo?.name);
      }
    },
    [productInfo]
  );

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <ErrorModal
        open={viewErrorPopup}
        errorMsg={errorMsg}
        onClose={errorPopupOnClose}
      />
      <DefaultLayout layoutBgColor={'bg-white'}>
        <ContentContainer cssClassnames={'xxs:px-2 md:px-5'}>
          <SimpleBreadcrumb
            breadcrumbInfo={{ url: '/products', name: 'Trở về' }}
          />

          <div
            className={'flex flex-col'.concat(' items-center').concat(' pb-10')}
          >
            <ProductInfoView
              productInfo={productInfo}
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={auth?.accessToken}
            />
            <ProductTabViewer
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={auth?.accessToken}
              productInfo={productInfo}
            />
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default ProductDetailsMain;
