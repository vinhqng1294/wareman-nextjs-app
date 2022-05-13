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
import { ExportRequestStatusList } from '../export-request.enum';
import { getWarehouseExportRequestInfoById } from '@/apis/warehouse-export-request.api';
import ProductExportDetailsModal from './product-export-details-modal/product-export-details-modal.component';
import SimpleBreadcrumb from '@/components/ui/breadcrumb/breadcrumb.component';
import ChangeHistoryModal from './change-history-modal/change-history-modal.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const WarehouseExportRequestDetailsMain = function ({
  setRequestName,
  ...props
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [pageLoading, setPageLoading] = useState(true);

  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorPopupOnClose = function () {
    setViewErrorPopup(!viewErrorPopup);
    setErrorMsg('');
    setPageLoading(false);
  };

  const [requestId, setRequestId] = useState(null);
  const [exportRequestInfo, setExportRequestInfo] = useState({});

  const [openProductExportDetailsModal, setOpenProductExportDetailsModal] =
    useState(false);
  const handleViewProductExportDetailsModal = function ({}) {
    setOpenProductExportDetailsModal(!openProductExportDetailsModal);
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
        getWarehouseExportRequestInfoById({
          accessToken: auth?.accessToken,
          requestId: requestId,
        })
          .then(function ({ data: resData }) {
            console.info('getWarehouseExportRequestInfoById resData', resData);
            setExportRequestInfo({ ...resData?.data });
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
        objectIsNotEmpty(exportRequestInfo) &&
        objectIsNotNull(setRequestName)
      ) {
        setRequestName(
          stringIsNotEmpty(exportRequestInfo?.name)
            ? exportRequestInfo?.name
            : 'N/A'
        );
      }
    },
    [exportRequestInfo]
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
      {openProductExportDetailsModal && (
        <ProductExportDetailsModal
          open={openProductExportDetailsModal}
          onClose={handleViewProductExportDetailsModal}
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
              url: '/warehouse-export-requests',
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
                {exportRequestInfo?.currentUserAllowUpdate === true &&
                  exportRequestInfo?.status !==
                    ExportRequestStatusList[4].key &&
                  exportRequestInfo?.status !==
                    ExportRequestStatusList[5].key && (
                    <StatusActionPopup
                      requestInfo={exportRequestInfo}
                      accessToken={auth?.accessToken}
                      setErrorMsg={setErrorMsg}
                      setViewErrorPopup={setViewErrorPopup}
                      viewErrorPopup={viewErrorPopup}
                    />
                  )}
                <RequestHeader
                  requestInfo={exportRequestInfo}
                  accessToken={auth?.accessToken}
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                />
                <RequestStatus
                  activeItemKey={toInteger(
                    Object.keys(ExportRequestStatusList).find(function (
                      key,
                      index
                    ) {
                      if (
                        exportRequestInfo?.status ===
                        ExportRequestStatusList[key].key
                      ) {
                        return key;
                      }
                    })
                  )}
                  statusList={{
                    0: ExportRequestStatusList[0],
                    1: ExportRequestStatusList[1],
                    2: ExportRequestStatusList[2],
                    3: ExportRequestStatusList[3],
                    4: ExportRequestStatusList[4],
                  }}
                  handleViewChangeHistoryModal={handleViewChangeHistoryModal}
                />
                <RequestProductList
                  requestInfo={exportRequestInfo}
                  accessToken={auth?.accessToken}
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                  handleViewProductExportDetailsModal={
                    handleViewProductExportDetailsModal
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

export default WarehouseExportRequestDetailsMain;
