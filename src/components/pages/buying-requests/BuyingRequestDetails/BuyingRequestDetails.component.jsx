import ContentContainer from '@/components/ui/container/content-container.component';
import { SearchBarType1 } from '@/components/ui/input/search.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import BuyingRequestHeader from './buying-request-header.component';
import BuyingRequestStatus from './buying-request-status.component';
import BuyingRequestProductList from './buying-request-product-list.component';
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
import { getBuyingRequestInfoById } from '@/apis/buying-request.api';
import { DotLoader } from '@/components/ui/loader/loader.component';
import StatusActionPopup from './status-action-popup.component';
import { BuyingRequestStatusList } from '../buying-request.enum';
import SimpleBreadcrumb from '@/components/ui/breadcrumb/breadcrumb.component';
import ChangeHistoryModal from './change-history-modal/change-history-modal.component';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const BuyingRequestDetailsMain = function ({ setRequestName, ...props }) {
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
  const [buyingRequestInfo, setBuyingRequestInfo] = useState({});

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
        getBuyingRequestInfoById({
          accessToken: auth?.accessToken,
          buyingRequestId: requestId,
        })
          .then(function ({ data: resData }) {
            console.info('getBuyingRequestInfoById resData', resData);
            setBuyingRequestInfo({ ...resData?.data });
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
        objectIsNotEmpty(buyingRequestInfo) &&
        objectIsNotNull(setRequestName)
      ) {
        setRequestName(buyingRequestInfo?.name);
      }
    },
    [buyingRequestInfo]
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
            breadcrumbInfo={{ url: '/buying-requests', name: 'Trở về' }}
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
                {buyingRequestInfo?.currentUserAllowUpdate === true &&
                  buyingRequestInfo?.status !==
                    BuyingRequestStatusList[5].key &&
                  buyingRequestInfo?.status !==
                    BuyingRequestStatusList[4].key && (
                    <StatusActionPopup
                      buyingRequestInfo={buyingRequestInfo}
                      accessToken={auth?.accessToken}
                      setErrorMsg={setErrorMsg}
                      setViewErrorPopup={setViewErrorPopup}
                      viewErrorPopup={viewErrorPopup}
                    />
                  )}
                <BuyingRequestHeader
                  buyingRequestInfo={buyingRequestInfo}
                  accessToken={auth?.accessToken}
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                />
                <BuyingRequestStatus
                  activeItemKey={toInteger(
                    Object.keys(BuyingRequestStatusList).find(function (
                      key,
                      index
                    ) {
                      if (
                        buyingRequestInfo?.status ===
                        BuyingRequestStatusList[key].key
                      ) {
                        return key;
                      }
                    })
                  )}
                  statusList={{
                    0: BuyingRequestStatusList[0],
                    1: BuyingRequestStatusList[1],
                    2: BuyingRequestStatusList[2],
                    3: BuyingRequestStatusList[3],
                    4: BuyingRequestStatusList[4],
                  }}
                  handleViewChangeHistoryModal={handleViewChangeHistoryModal}
                />
                <BuyingRequestProductList
                  buyingRequestInfo={buyingRequestInfo}
                  accessToken={auth?.accessToken}
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                />
              </React.Fragment>
            )}
          </div>
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default BuyingRequestDetailsMain;
