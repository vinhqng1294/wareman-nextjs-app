import ContentContainer from '@/components/ui/container/content-container.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import LotInfoView from './lot-info-viewer/lot-info-viewer.component';
import {
  objectIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { useRouter } from 'next/router';
import { getLotInfoById } from '@/apis/lot.api';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import LotTabViewer from './lot-tab-viewer/lot-tab-viewer.component';
import SimpleBreadcrumb from '@/components/ui/breadcrumb/breadcrumb.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const LotDetailsMain = function ({ updateLotName, ...props }) {
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

  const [lotId, setLotId] = useState(null);
  const [lotInfo, setLotInfo] = useState({});

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
        setLotId(router?.query?.lotId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(lotId)) {
        getLotInfoById({ accessToken: auth?.accessToken, lotId })
          .then(function ({ data: resData }) {
            console.info('getLotInfoById resData', resData);
            setLotInfo({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [lotId]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(lotInfo) && objectIsNotNull(updateLotName)) {
        updateLotName(lotInfo?.name);
      }
    },
    [lotInfo]
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
          <SimpleBreadcrumb breadcrumbInfo={{ url: '/lots', name: 'Trở về' }} />

          <div
            className={'flex flex-col'.concat(' items-center').concat(' pb-10')}
          >
            <LotInfoView
              lotInfo={lotInfo}
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={auth?.accessToken}
            />
            <LotTabViewer
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={auth?.accessToken}
              lotInfo={lotInfo}
            />
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default LotDetailsMain;
