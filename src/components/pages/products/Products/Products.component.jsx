import ContentContainer from '@/components/ui/container/content-container.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ProductFilter from './product-filter.component';
import ProductItemList from './product-item-list.component';
import dynamic from 'next/dynamic';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { getCurrentUserPermission } from '@/apis/authentication.api';
import { checkPermission } from '@/utils/commons/checkPermission.utils';
import { PermissionList } from '@/utils/permission-list.enum';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';
import { updateWarehouseIdToHeader } from '@/apis/axios/setupAxios';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const ProductsMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [pageLoading, setPageLoading] = useState(true);

  const [isPermitted, setIsPermitted] = useState(false);
  const [userPermissions, setUserPermissions] = useState([]);

  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorPopupOnClose = function () {
    setViewErrorPopup(!viewErrorPopup);
    setErrorMsg('');
    setPageLoading(false);
  };

  useEffect(
    function () {
      if (!stringIsNotEmpty(auth?.accessToken)) {
        redirectTo('/login');
      }
    },
    [auth]
  );

  // start: user permission
  useEffect(
    function () {
      if (stringIsNotEmpty(auth?.accessToken)) {
        setPageLoading(true);
        getCurrentUserPermission({ accessToken: auth?.accessToken })
          .then(function ({ data: resData }) {
            if (!arrayIsNotEmpty([...resData?.data])) {
              console.info('getCurrentUserPermission resData', resData);
              setIsPermitted(false);
            } else {
              setUserPermissions([...resData?.data]);
            }
          })
          .catch(function (err) {
            console.info('err', err);
            console.info('err', err?.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setPageLoading(false);
          });
      }
    },
    [auth?.accessToken]
  );
  useEffect(
    function () {
      if (arrayIsNotEmpty(userPermissions)) {
        console.info('userPermissions', userPermissions);
        const result = checkPermission({
          permissionKey: PermissionList.CREATE_PRODUCT.key,
          userPermissionList: userPermissions,
        });
        if (result) {
          setIsPermitted(true);
        } else {
          setIsPermitted(false);
        }
      }
      // setPageLoading(false);
    },
    [userPermissions]
  );
  // useEffect(
  //   function () {
  //     if (!isPermitted) {
  //       redirectTo('/');
  //     }
  //   },
  //   [isPermitted]
  // );
  // end: user permission

  // useEffect(function () {
  //   updateWarehouseIdToHeader({ id: 'hdafgshdvbhsbdvjkhasuk' });
  // }, []);

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <ErrorModal
        open={viewErrorPopup}
        errorMsg={errorMsg}
        onClose={errorPopupOnClose}
      />
      <DefaultLayout>
        <ContentContainer cssClassnames={'xxs:px-2 md:px-5'}>
          {pageLoading ? (
            <React.Fragment>
              <div className='flex flex-col items-center py-10 px-3'>
                <DotLoader loading={pageLoading} />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div
                className={'flex flex-col'
                  .concat(' items-center')
                  .concat('')
                  .concat(' py-6')}
              >
                <div
                  className={'flex'
                    .concat(' w-full px-2')
                    .concat(' items-center justify-between')}
                >
                  <div className='flex'>
                    <p className='text-2xl text-dark font-bold'>
                      Danh sách sản phẩm
                    </p>
                  </div>
                  {isPermitted && (
                    <React.Fragment>
                      <div className='flex'>
                        <button
                          type='button'
                          className={'flex items-center justify-center'
                            .concat(' rounded-full')
                            .concat(' bg-blue-500')
                            .concat(' px-5 py-2')
                            .concat(' hover:shadow-md')
                            .concat(' space-x-3')}
                          onClick={function (evt) {
                            evt?.preventDefault();
                            evt?.stopPropagation();
                            redirectTo('/add/product');
                          }}
                        >
                          <ReactSVG
                            src={SvgIcon['add-sr']}
                            className={'fill-white'.concat(' w-5')}
                          />
                          <p className='text-white font-semibold text-base'>
                            Thêm sản phẩm
                          </p>
                        </button>
                      </div>
                    </React.Fragment>
                  )}
                </div>

                {/* <div
                  className={'flex flex-col'
                    .concat(' items-center')
                    .concat(' w-full max-w-2xl')}
                >
                  <SearchBarType1 />
                  <ProductFilter />
                </div> */}

                <ProductItemList
                  setErrorMsg={setErrorMsg}
                  setViewErrorPopup={setViewErrorPopup}
                  viewErrorPopup={viewErrorPopup}
                  accessToken={auth?.accessToken}
                />
              </div>
            </React.Fragment>
          )}
        </ContentContainer>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default ProductsMain;
