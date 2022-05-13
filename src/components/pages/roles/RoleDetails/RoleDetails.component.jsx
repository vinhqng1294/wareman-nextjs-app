import ContentContainer from '@/components/ui/container/content-container.component';
import { SearchBarType1 } from '@/components/ui/input/search.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import RoleInfoView from './role-info-viewer/role-info-viewer.component';
import {
  objectIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { useRouter } from 'next/router';
import { getRoleInfoById } from '@/apis/role.api';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const RoleDetailsMain = function ({ setRoleName, ...props }) {
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

  const [roleId, setRoleId] = useState(null);
  const [roleInfo, setRoleInfo] = useState(null);

  useEffect(function () {
    if (!stringIsNotEmpty(auth?.accessToken)) {
      redirectTo('/login');
    }
  }, [auth?.accessToken]);

  useEffect(
    function () {
      if (objectIsNotEmpty(router?.query)) {
        setRoleId(router?.query?.roleId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(roleId)) {
        getRoleInfoById({ accessToken: auth?.accessToken, roleId: roleId })
          .then(function ({ data: resData }) {
            setRoleInfo({ ...resData?.data });
          })
          .catch(function (err) {
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [roleId]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(roleInfo) && objectIsNotNull(setRoleName)) {
        setRoleName(`${roleInfo?.name} ${roleInfo?.name}`);
      }
    },
    [roleInfo]
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
            {objectIsNotNull(roleInfo) ? (
              <RoleInfoView
                roleInfo={roleInfo}
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

export default RoleDetailsMain;
