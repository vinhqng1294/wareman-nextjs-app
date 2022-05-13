import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action_ImportRequest } from '@/redux/warehouse-import-request/import-request.action';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';

const CreateImportRequestPopup = function ({
  purchaseOrderInfo,
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
      Action_ImportRequest.SetCreateImportData({
        purchaseOrderId: stringIsNotEmpty(purchaseOrderInfo?.id)
          ? purchaseOrderInfo?.id
          : '',
      })
    );
    setTimeout(() => {
      redirectTo('/add/warehouse-import-request/from-purchase-order');
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
              {`Nếu hàng đã được giao và cần nhập vào kho, bạn có thể tạo yêu cầu nhập kho.`}
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
                  Tạo yêu cầu nhập kho
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateImportRequestPopup;
