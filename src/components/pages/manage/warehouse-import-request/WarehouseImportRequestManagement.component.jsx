import ContentContainer from '@/components/ui/container/content-container.component';
import { SearchBarType1 } from '@/components/ui/input/search.component';
import DefaultLayout from '@/layouts/Default.layout';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import FunctionItem from '../function-item.component';
import ManagementLayout from '@/layouts/Management.layout';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const WarehouseImportRequestManagementMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const { permissions: permissionList } = auth?.user1;

  useEffect(
    function () {
      if (!stringIsNotEmpty(auth?.accessToken)) {
        redirectTo('/login');
      } else {
        redirectTo('/warehouse-import-requests');
      }
    },
    [auth?.accessToken]
  );

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <ManagementLayout
        layoutBgColor={'bg-white'}
        bodyVerticalCenter
        title={'Quản lý yêu cầu nhập kho'}
      >
        <ContentContainer cssClassnames={'xxs:px-2 md:px-5'}>
          <div
            className={'flex flex-col'
              .concat(' items-center')
              .concat(' pt-3 pb-5')}
          >
            <div
              className={'flex flex-col'
                .concat(' space-y-4 w-full')
                .concat(' md:max-w-2xl')}
            >
              <FunctionItem
                itemName={'Xem tất cả yêu cầu nhập kho'}
                url={'/warehouse-import-requests'}
              />
              {/* <FunctionItem
                itemName={'Tạo đơn đặt hàng'}
                url={'/add/purchase-order'}
              /> */}
            </div>
          </div>
        </ContentContainer>
      </ManagementLayout>
    </React.Fragment>
  );
};

export default WarehouseImportRequestManagementMain;
