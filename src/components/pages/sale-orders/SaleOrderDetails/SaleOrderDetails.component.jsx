import ContentContainer from '@/components/ui/container/content-container.component';
import { SearchBarType1 } from '@/components/ui/input/search.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import SaleOrderHeader from './sale-order-header.component';
import SaleOrderStatus from './sale-order-status.component';
import SaleOrderProductList from './sale-order-product-list/sale-order-product-list.component';
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
import StatusActionPopup from './popup/status-action-popup.component';
import { SaleOrderStatusList } from '../sale-order.enum';
import { getSaleOrderInfoById } from '@/apis/sale-order.api';
import CreateExportRequestPopup from './popup/create-export-request-popup.component';
import SimpleBreadcrumb from '@/components/ui/breadcrumb/breadcrumb.component';
import ChangeHistoryModal from './change-history-modal/change-history-modal.component';
import SaleOrderExportList from './sale-order-export-list/sale-order-export-list.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const SaleOrderDetailsMain = function ({ setRequestName, ...props }) {
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
  const [saleOrderInfo, setSaleOrderInfo] = useState({});

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
        getSaleOrderInfoById({
          accessToken: auth?.accessToken,
          saleOrderId: requestId,
        })
          .then(function ({ data: resData }) {
            console.info('getSaleOrderInfoById resData', resData);
            setSaleOrderInfo({ ...resData?.data });
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
      if (objectIsNotEmpty(saleOrderInfo) && objectIsNotNull(setRequestName)) {
        setRequestName(saleOrderInfo?.name);
      }
    },
    [saleOrderInfo]
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
  //       customer: customerList[Math.floor(Math.random() * customerList.length)],
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
            breadcrumbInfo={{ url: '/sale-orders', name: 'Trở về' }}
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
                {saleOrderInfo?.currentUserAllowUpdate === true &&
                  saleOrderInfo?.status !== SaleOrderStatusList[4].key &&
                  saleOrderInfo?.status !== SaleOrderStatusList[5].key && (
                    <StatusActionPopup
                      saleOrderInfo={saleOrderInfo}
                      accessToken={auth?.accessToken}
                      setErrorMsg={setErrorMsg}
                      setViewErrorPopup={setViewErrorPopup}
                      viewErrorPopup={viewErrorPopup}
                    />
                  )}
                {saleOrderInfo?.status === SaleOrderStatusList[3].key &&
                  saleOrderInfo?.soFullyExported === false && (
                    <CreateExportRequestPopup
                      saleOrderInfo={saleOrderInfo}
                      accessToken={auth?.accessToken}
                      setErrorMsg={setErrorMsg}
                      setViewErrorPopup={setViewErrorPopup}
                      viewErrorPopup={viewErrorPopup}
                    />
                  )}
                <SaleOrderHeader
                  saleOrderInfo={saleOrderInfo}
                  accessToken={auth?.accessToken}
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                />
                <SaleOrderStatus
                  activeItemKey={toInteger(
                    Object.keys(SaleOrderStatusList).find(function (
                      key,
                      index
                    ) {
                      if (
                        saleOrderInfo?.status === SaleOrderStatusList[key].key
                      ) {
                        return key;
                      }
                    })
                  )}
                  statusList={{
                    0: SaleOrderStatusList[0],
                    1: SaleOrderStatusList[1],
                    2: SaleOrderStatusList[2],
                    3: SaleOrderStatusList[3],
                    4: SaleOrderStatusList[4],
                  }}
                  handleViewChangeHistoryModal={handleViewChangeHistoryModal}
                />
                <SaleOrderProductList
                  saleOrderInfo={saleOrderInfo}
                  accessToken={auth?.accessToken}
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                />
                {(saleOrderInfo?.status === SaleOrderStatusList[3].key ||
                  saleOrderInfo?.status === SaleOrderStatusList[4].key) && (
                  <SaleOrderExportList
                    saleOrderInfo={saleOrderInfo}
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

export default SaleOrderDetailsMain;
