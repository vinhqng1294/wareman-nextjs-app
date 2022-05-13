import ContentContainer from '@/components/ui/container/content-container.component';
import { SearchBarType1 } from '@/components/ui/input/search.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import RequestHeader from './request-header.component';
import RequestStatus from './request-status.component';
import RequestProductList from './request-product-list.component';
import { v4 as UUIDv4 } from 'uuid';
import { random, toInteger } from 'lodash';
import { randomDate } from '@/utils/commons/datetime.utils';
import moment from 'moment';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import {
  objectIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { useRouter } from 'next/router';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { DotLoader } from '@/components/ui/loader/loader.component';
import StatusActionPopup from './status-action-popup.component';
import { ImportRequestStatusList } from '../import-request.enum';
import { getWarehouseImportRequestInfoById } from '@/apis/warehouse-import-request.api';
import SimpleBreadcrumb from '@/components/ui/breadcrumb/breadcrumb.component';
import ProductImportDetailsModal from './product-import-details-modal/product-import-details-modal.component';
import ChangeHistoryModal from './change-history-modal/change-history-modal.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const WarehouseImportRequestDetailsMain = function ({
  setRequestName,
  ...props
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const { permissions: permissionList } = auth?.user1;

  const [pageLoading, setPageLoading] = useState(true);

  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorPopupOnClose = function () {
    setViewErrorPopup(!viewErrorPopup);
    setErrorMsg('');
    setPageLoading(false);
  };

  const [requestId, setRequestId] = useState(null);
  const [importRequestInfo, setImportRequestInfo] = useState({});

  const [openProductImportDetailsModal, setOpenProductImportDetailsModal] =
    useState(false);
  const handleViewProductImportDetailsModal = function ({}) {
    setOpenProductImportDetailsModal(!openProductImportDetailsModal);
  };

  const [openChangeHistoryModal, setOpenChangeHistoryModal] = useState(false);
  const handleViewChangeHistoryModal = function ({}) {
    setOpenChangeHistoryModal(!openChangeHistoryModal);
  };

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
        setRequestId(router?.query?.requestId);
      }
    },
    [router?.query]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(requestId)) {
        setPageLoading(true);
        getWarehouseImportRequestInfoById({
          accessToken: auth?.accessToken,
          requestId: requestId,
        })
          .then(function ({ data: resData }) {
            console.info('getWarehouseImportRequestInfoById resData', resData);
            setImportRequestInfo({ ...resData?.data });
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setPageLoading(false);
          });
      }
    },
    [requestId]
  );

  useEffect(
    function () {
      if (
        objectIsNotEmpty(importRequestInfo) &&
        objectIsNotNull(setRequestName)
      ) {
        setRequestName(
          stringIsNotEmpty(importRequestInfo?.name)
            ? importRequestInfo?.name
            : 'N/A'
        );
      }
    },
    [importRequestInfo]
  );

  // const [buyingRequestData, setBuyingRequestData] = useState({
  //   id: UUIDv4(),
  //   name: `Yêu cầu mua hàng X`,
  //   createdBy: createdByList[Math.floor(Math.random() * createdByList.length)],
  //   createdDate: moment(
  //     randomDate(new Date(2022, 0, 1), new Date()).getTime()
  //   ).format('DD/MM/YYYY HH:mm:ss'),
  //   lastModified: moment(
  //     randomDate(new Date(2022, 0, 1), new Date()).getTime()
  //   ).format('DD/MM/YYYY HH:mm:ss'),
  //   status: random(0, 11),
  // });
  // const [productList, setProductList] = useState(null);

  // useEffect(function () {
  //   let newProductList = [];
  //   for (let i = 0; i < 20; i++) {
  //     newProductList.push({
  //       id: UUIDv4(),
  //       name: `Sản phẩm ${i}`,
  //       quantity: random(1, 1000),
  //       provider: providerList[Math.floor(Math.random() * providerList.length)],
  //     });
  //   }
  //   setProductList([...newProductList]);
  // }, []);

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <ErrorModal
        open={viewErrorPopup}
        errorMsg={errorMsg}
        onClose={errorPopupOnClose}
      />
      {openProductImportDetailsModal && (
        <ProductImportDetailsModal
          open={openProductImportDetailsModal}
          onClose={handleViewProductImportDetailsModal}
          requestId={requestId}
          accessToken={auth?.accessToken}
          setErrorMsg={setErrorMsg}
          setViewErrorPopup={setViewErrorPopup}
          viewErrorPopup={viewErrorPopup}
        />
      )}
      {openChangeHistoryModal && (
        <ChangeHistoryModal
          open={openChangeHistoryModal}
          onClose={handleViewChangeHistoryModal}
          requestId={requestId}
          accessToken={auth?.accessToken}
          setErrorMsg={setErrorMsg}
          setViewErrorPopup={setViewErrorPopup}
          viewErrorPopup={viewErrorPopup}
        />
      )}
      <DefaultLayout>
        <ContentContainer cssClassnames={'xxs:px-2 md:px-5'}>
          <SimpleBreadcrumb
            breadcrumbInfo={{
              url: '/warehouse-import-requests',
              name: 'Trở về',
            }}
          />

          <div
            className={'flex flex-col'
              .concat(' items-center')
              .concat(' pb-10')
              .concat(' space-y-4')}
          >
            {pageLoading ? (
              <React.Fragment>
                <div className='flex flex-col items-center py-10 mx-auto'>
                  <DotLoader loading={pageLoading} />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {importRequestInfo?.currentUserAllowUpdate === true &&
                  importRequestInfo?.status !==
                    ImportRequestStatusList[4].key &&
                  importRequestInfo?.status !==
                    ImportRequestStatusList[5].key && (
                    <StatusActionPopup
                      requestInfo={importRequestInfo}
                      accessToken={auth?.accessToken}
                      setErrorMsg={setErrorMsg}
                      setViewErrorPopup={setViewErrorPopup}
                      viewErrorPopup={viewErrorPopup}
                    />
                  )}
                <RequestHeader
                  requestInfo={importRequestInfo}
                  accessToken={auth?.accessToken}
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                />
                <RequestStatus
                  activeItemKey={toInteger(
                    Object.keys(ImportRequestStatusList).find(function (
                      key,
                      index
                    ) {
                      if (
                        importRequestInfo?.status ===
                        ImportRequestStatusList[key].key
                      ) {
                        return key;
                      }
                    })
                  )}
                  statusList={{
                    0: ImportRequestStatusList[0],
                    1: ImportRequestStatusList[1],
                    2: ImportRequestStatusList[2],
                    3: ImportRequestStatusList[3],
                    4: ImportRequestStatusList[4],
                  }}
                  handleViewChangeHistoryModal={handleViewChangeHistoryModal}
                />
                <RequestProductList
                  requestInfo={importRequestInfo}
                  accessToken={auth?.accessToken}
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                  handleViewProductImportDetailsModal={
                    handleViewProductImportDetailsModal
                  }
                />
              </React.Fragment>
            )}
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default WarehouseImportRequestDetailsMain;
