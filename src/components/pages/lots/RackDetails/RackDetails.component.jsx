import ContentContainer from '@/components/ui/container/content-container.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import RackInfoView from './rack-info-viewer/rack-info-viewer.component';
import {
  objectIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { useRouter } from 'next/router';
import { getLotInfoById } from '@/apis/lot.api';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import RackTabViewer from './rack-tab-viewer/rack-tab-viewer.component';
import { getRackInfo } from '@/apis/rack.api';
import SimpleBreadcrumb from '@/components/ui/breadcrumb/breadcrumb.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const RackDetailsMain = function ({ updateRackName, ...props }) {
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

  const [rackId, setRackId] = useState(null);
  const [rackInfo, setRackInfo] = useState({});
  console.info('rackInfo', rackInfo);

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
        // console.info('router?.query', router?.query);
        setLotId(router?.query?.lotId);
        setRackId(router?.query?.rackId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(lotId) && stringIsNotEmpty(rackId)) {
        getLotInfoById({ accessToken: auth?.accessToken, lotId })
          .then(function ({ data: resData }) {
            console.info('getLotInfoById resData', resData);
            setLotInfo({ ...resData?.data });
            return { ...resData?.data };
          })
          .then(function (lotInfoData) {
            getRackInfo({
              accessToken: auth?.accessToken,
              lotId: lotInfoData?.id,
              rackId: rackId,
            })
              .then(function ({ data: resData }) {
                console.info('getRackInfo resData', resData);
                setRackInfo({ ...resData?.data });
              })
              .catch(function (err) {
                console.error('err', err);
                console.error('err', err.response);
                setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
                setViewErrorPopup(!viewErrorPopup);
              });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [lotId, rackId]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(rackInfo) && objectIsNotNull(updateRackName)) {
        updateRackName(rackInfo?.name);
      }
    },
    [rackInfo]
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
            breadcrumbInfo={{ url: `/lots/${lotId}`, name: 'Trở về' }}
          />

          <div
            className={'flex flex-col'.concat(' items-center').concat(' pb-10')}
          >
            <RackInfoView
              lotInfo={lotInfo}
              rackInfo={rackInfo}
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={auth?.accessToken}
            />
            <RackTabViewer
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={auth?.accessToken}
              lotInfo={lotInfo}
              rackInfo={rackInfo}
            />
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default RackDetailsMain;
