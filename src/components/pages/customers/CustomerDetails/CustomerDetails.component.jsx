import ContentContainer from '@/components/ui/container/content-container.component';
import { SearchBarType1 } from '@/components/ui/input/search.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import CustomerInfoView from './customer-info-viewer/customer-info-viewer.component';
import {
  objectIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { useRouter } from 'next/router';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import CustomerTabViewer from './customer-tab-viewer/customer-tab-viewer.component';
import { getCustomerInfoById } from '@/apis/customer.api';
import SimpleBreadcrumb from '@/components/ui/breadcrumb/breadcrumb.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const CustomerDetailsMain = function ({ updateCustomerName, ...props }) {
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

  const [customerId, setCustomerId] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({});

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
        setCustomerId(router?.query?.customerId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(customerId)) {
        getCustomerInfoById({
          accessToken: auth?.accessToken,
          customerId: customerId,
        })
          .then(function ({ data: resData }) {
            console.info('getCustomerInfoById resData', resData);
            setCustomerInfo({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [customerId]
  );

  useEffect(
    function () {
      if (
        objectIsNotEmpty(customerInfo) &&
        objectIsNotNull(updateCustomerName)
      ) {
        updateCustomerName(customerInfo?.name);
      }
    },
    [customerInfo]
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
            breadcrumbInfo={{ url: '/customers', name: 'Trở về' }}
          />

          <div
            className={'flex flex-col'.concat(' items-center').concat(' pb-10')}
          >
            <CustomerInfoView
              customerInfo={customerInfo}
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={auth?.accessToken}
            />
            <CustomerTabViewer
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={auth?.accessToken}
              customerInfo={customerInfo}
            />
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default CustomerDetailsMain;
