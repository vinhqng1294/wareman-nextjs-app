import ContentContainer from '@/components/ui/container/content-container.component';
import { SearchBarType1 } from '@/components/ui/input/search.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import UomInfoView from './uom-info-viewer/uom-info-viewer.component';
import {
  objectIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { useRouter } from 'next/router';
import { getUomInfoById } from '@/apis/uom.api';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const UomDetailsMain = function ({ setUomName, ...props }) {
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

  const [uomId, setUomId] = useState(null);
  const [uomInfo, setUomInfo] = useState(null);

  useEffect(function () {
    if (!stringIsNotEmpty(auth?.accessToken)) {
      redirectTo('/login');
    }
  }, [auth?.accessToken]);

  useEffect(
    function () {
      if (objectIsNotEmpty(router?.query)) {
        setUomId(router?.query?.uomId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(uomId)) {
        getUomInfoById({ accessToken: auth?.accessToken, uomId: uomId })
          .then(function ({ data: resData }) {
            setUomInfo({ ...resData?.data });
          })
          .catch(function (err) {
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [uomId]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(uomInfo) && objectIsNotNull(setUomName)) {
        setUomName(`${uomInfo?.firstName} ${uomInfo?.lastName}`);
      }
    },
    [uomInfo]
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
          <div
            className={'flex flex-col'.concat(' items-center').concat(' py-10')}
          >
            {objectIsNotNull(uomInfo) ? (
              <UomInfoView
                uomInfo={uomInfo}
                setErrorMsg={setErrorMsg}
                setViewErrorPopup={setViewErrorPopup}
                viewErrorPopup={viewErrorPopup}
                accessToken={auth?.accessToken}
              />
            ) : ''}
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default UomDetailsMain;
