import ContentContainer from '@/components/ui/container/content-container.component';
import { SearchBarType1 } from '@/components/ui/input/search.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import EmployeeInfoView from './employee-info-viewer/employee-info-viewer.component';
import {
  objectIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { useRouter } from 'next/router';
import { getUserInfoById } from '@/apis/user.api';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const EmployeeDetailsMain = function ({ setEmployeeName, ...props }) {
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

  const [employeeId, setEmployeeId] = useState(null);
  const [employeeInfo, setEmployeeInfo] = useState(null);

  useEffect(function () {
    if (!stringIsNotEmpty(auth?.accessToken)) {
      redirectTo('/login');
    }
  }, [auth?.accessToken]);

  useEffect(
    function () {
      if (objectIsNotEmpty(router?.query)) {
        setEmployeeId(router?.query?.employeeId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(employeeId)) {
        getUserInfoById({ accessToken: auth?.accessToken, userId: employeeId })
          .then(function ({ data: resData }) {
            setEmployeeInfo({ ...resData?.data });
          })
          .catch(function (err) {
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [employeeId]
  );

  useEffect(
    function () {
      if (objectIsNotEmpty(employeeInfo) && objectIsNotNull(setEmployeeName)) {
        setEmployeeName(`${employeeInfo?.firstName} ${employeeInfo?.lastName}`);
      }
    },
    [employeeInfo]
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
            {objectIsNotNull(employeeInfo) ? (
              <EmployeeInfoView
                employeeInfo={employeeInfo}
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

export default EmployeeDetailsMain;
