import {
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { Action_ExportRequest } from '@/redux/warehouse-export-request/export-request.action';

const CreateExportRequestPopup = function ({
  saleOrderInfo,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const createImportOnClick = function ({}) {
    setLoading(true);
    dispatch(
      Action_ExportRequest.SetCreateExportData({
        saleOrderId: stringIsNotEmpty(saleOrderInfo?.id)
          ? saleOrderInfo?.id
          : '',
      })
    );
    setTimeout(() => {
      redirectTo('/add/warehouse-export-request/from-sale-order');
    }, 200);
  };

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full max-w-4xl')
          .concat(' bg-blue-100')
          .concat(' rounded-md shadow-md')}
      >
        <div className='flex w-full px-5 py-4 items-center'>
          <div className='flex items-center mr-6'>
            <p className='text-dark text-base font-medium'>
              {`Nếu hàng đã được bán và cần xuất kho, bạn có thể tạo yêu cầu xuất kho.`}
            </p>
          </div>
          <div className='flex flex-none ml-auto mt-auto'>
            <div className='flex items-center justify-end space-x-2.5'>
              <button
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(' bg-blue-500')
                  .concat(' px-4 py-1.5')
                  .concat(' hover:shadow-md')
                  .concat(' border border-transparent')}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  createImportOnClick({});
                }}
              >
                <p className='text-white font-semibold text-sm'>
                  Tạo yêu cầu xuất kho
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateExportRequestPopup;
