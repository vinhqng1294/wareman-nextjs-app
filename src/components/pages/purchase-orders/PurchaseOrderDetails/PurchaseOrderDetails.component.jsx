import ContentContainer from '@/components/ui/container/content-container.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import PurchaseOrderHeader from './purchase-order-header.component';
import PurchaseOrderStatus from './purchase-order-status.component';
import PurchaseOrderProductList from './purchase-order-product-list/purchase-order-product-list.component';
import { toInteger } from 'lodash';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import {
  objectIsNotEmpty,
  objectIsNotNull,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { useRouter } from 'next/router';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { DotLoader } from '@/components/ui/loader/loader.component';
import StatusActionPopup from './popup/status-action-popup.component';
import { PurchaseOrderStatusList } from '../purchase-order.enum';
import { getPurchaseOrderInfoById } from '@/apis/purchase-order.api';
import CreateImportRequestPopup from './popup/create-import-request-popup.component';
import SimpleBreadcrumb from '@/components/ui/breadcrumb/breadcrumb.component';
import ChangeHistoryModal from './change-history-modal/change-history-modal.component';
import PurchaseOrderImportList from './purchase-order-import-list/purchase-order-import-list.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const PurchaseOrderDetailsMain = function ({ setRequestName, ...props }) {
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
  const [purchaseOrderInfo, setPurchaseOrderInfo] = useState({});

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
        getPurchaseOrderInfoById({
          accessToken: auth?.accessToken,
          purchaseOrderId: requestId,
        })
          .then(function ({ data: resData }) {
            console.info('getPurchaseOrderInfoById resData', resData);
            setPurchaseOrderInfo({ ...resData?.data });
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
        objectIsNotEmpty(purchaseOrderInfo) &&
        objectIsNotNull(setRequestName)
      ) {
        setRequestName(purchaseOrderInfo?.name);
      }
    },
    [purchaseOrderInfo]
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
            breadcrumbInfo={{ url: '/purchase-orders', name: 'Trở về' }}
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
                {purchaseOrderInfo?.currentUserAllowUpdate === true &&
                  purchaseOrderInfo?.status !==
                    PurchaseOrderStatusList[4].key &&
                  purchaseOrderInfo?.status !==
                    PurchaseOrderStatusList[5].key && (
                    <StatusActionPopup
                      purchaseOrderInfo={purchaseOrderInfo}
                      accessToken={auth?.accessToken}
                      setErrorMsg={setErrorMsg}
                      setViewErrorPopup={setViewErrorPopup}
                      viewErrorPopup={viewErrorPopup}
                    />
                  )}
                {purchaseOrderInfo?.status === PurchaseOrderStatusList[3].key &&
                  purchaseOrderInfo?.poFullyImported === false && (
                    <CreateImportRequestPopup
                      purchaseOrderInfo={purchaseOrderInfo}
                      accessToken={auth?.accessToken}
                      setErrorMsg={setErrorMsg}
                      setViewErrorPopup={setViewErrorPopup}
                      viewErrorPopup={viewErrorPopup}
                    />
                  )}
                <PurchaseOrderHeader
                  purchaseOrderInfo={purchaseOrderInfo}
                  accessToken={auth?.accessToken}
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                />
                <PurchaseOrderStatus
                  activeItemKey={toInteger(
                    Object.keys(PurchaseOrderStatusList).find(function (
                      key,
                      index
                    ) {
                      if (
                        purchaseOrderInfo?.status ===
                        PurchaseOrderStatusList[key].key
                      ) {
                        return key;
                      }
                    })
                  )}
                  statusList={{
                    0: PurchaseOrderStatusList[0],
                    1: PurchaseOrderStatusList[1],
                    2: PurchaseOrderStatusList[2],
                    3: PurchaseOrderStatusList[3],
                    4: PurchaseOrderStatusList[4],
                  }}
                  handleViewChangeHistoryModal={handleViewChangeHistoryModal}
                />
                <PurchaseOrderProductList
                  purchaseOrderInfo={purchaseOrderInfo}
                  accessToken={auth?.accessToken}
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                />
                {(purchaseOrderInfo?.status ===
                  PurchaseOrderStatusList[3].key ||
                  purchaseOrderInfo?.status ===
                    PurchaseOrderStatusList[4].key) && (
                  <PurchaseOrderImportList
                    purchaseOrderInfo={purchaseOrderInfo}
                    accessToken={auth?.accessToken}
                    setErrorMsg={setErrorMsg}
                    setViewErrorPopup={setViewErrorPopup}
                    viewErrorPopup={viewErrorPopup}
                  />
                )}
              </React.Fragment>
            )}
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default PurchaseOrderDetailsMain;
