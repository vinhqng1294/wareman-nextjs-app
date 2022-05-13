import ContentContainer from '@/components/ui/container/content-container.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import ProviderInfoView from './provider-info-viewer/provider-info-viewer.component';
import {
  objectIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { useRouter } from 'next/router';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import ProviderTabViewer from './provider-tab-viewer/provider-tab-viewer.component';
import { getProviderInfoById } from '@/apis/provider.api';
import SimpleBreadcrumb from '@/components/ui/breadcrumb/breadcrumb.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const ProviderDetailsMain = function ({ updateProviderName, ...props }) {
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

  const [providerId, setProviderId] = useState(null);
  const [providerInfo, setProviderInfo] = useState({});

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
        setProviderId(router?.query?.providerId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(providerId)) {
        getProviderInfoById({
          accessToken: auth?.accessToken,
          providerId: providerId,
        })
          .then(function ({ data: resData }) {
            console.info('getProviderInfoById resData', resData);
            setProviderInfo({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [providerId]
  );

  useEffect(
    function () {
      if (
        objectIsNotEmpty(providerInfo) &&
        objectIsNotNull(updateProviderName)
      ) {
        updateProviderName(providerInfo?.name);
      }
    },
    [providerInfo]
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
            breadcrumbInfo={{ url: '/providers', name: 'Trở về' }}
          />
          <div
            className={'flex flex-col'.concat(' items-center').concat(' pb-10')}
          >
            <ProviderInfoView
              providerInfo={providerInfo}
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={auth?.accessToken}
            />
            <ProviderTabViewer
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={auth?.accessToken}
              providerInfo={providerInfo}
            />
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default ProviderDetailsMain;
