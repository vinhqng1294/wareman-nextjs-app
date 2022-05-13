import ModalContainer from '@/components/ui/modal/modal-container.component';
import ModalContentWrapper from '@/components/ui/modal/modal-content-wrapper.component';
import ModalHeaderWrapper from '@/components/ui/modal/modal-header-wrapper.component';
import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React from 'react';
import { ReactSVG } from 'react-svg';
import ProductStockListTab from './product-stock-list-tab.component';

const ProductImportDetailsModal = function ({
  open,
  onClose,
  onCloseParams,
  requestId,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  return (
    <React.Fragment>
      <ModalContainer open={open} modalSize={'max-w-7xl h-full'}>
        <ModalHeaderWrapper cssClasses={'px-3 py-2'.concat(' shadow-md')}>
          <div className='flex items-center'>
            <div
              className={'flex justify-start items-center'.concat(
                ' w-8 h-full'
              )}
            ></div>
            <div
              className={'flex justify-center items-center'.concat(
                ' w-full h-full'
              )}
            >
              <p className='text-dark text-lg font-semibold'>
                Chi tiết nhập kho
              </p>
            </div>
            <div className={'flex justify-end items-center'}>
              <button
                type='button'
                className={'flex items-center justify-center'
                  .concat(' w-8 h-8')
                  .concat(' rounded-full')
                  .concat(' hover:bg-neutral-200 hover:bg-opacity-50')}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  if (isFunction(onClose)) {
                    onClose({ onCloseParams });
                  }
                }}
              >
                <ReactSVG
                  src={SvgIcon['cross-alt']}
                  className='w-6 h-6 fill-zinc-500'
                />
              </button>
            </div>
          </div>
        </ModalHeaderWrapper>
        <ModalContentWrapper>
          <div className='flex flex-col w-full h-full min-h-[300px]'>
            <ProductStockListTab
              setErrorMsg={setErrorMsg}
              setViewErrorPopup={setViewErrorPopup}
              viewErrorPopup={viewErrorPopup}
              accessToken={accessToken}
              requestId={requestId}
            />
          </div>
        </ModalContentWrapper>
        {/* <ModalFooterWrapper></ModalFooterWrapper> */}
      </ModalContainer>
    </React.Fragment>
  );
};

export default ProductImportDetailsModal;
