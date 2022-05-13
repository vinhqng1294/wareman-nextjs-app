import { isFunction } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React from 'react';
import { ReactSVG } from 'react-svg';
import ModalContainer from '../modal-container.component';
import ModalContentWrapper from '../modal-content-wrapper.component';
import ModalHeaderWrapper from '../modal-header-wrapper.component';

const InfoModal = function ({
  open,
  onClose,
  onCloseParams,
  infoMsg,
  ...props
}) {
  return (
    <React.Fragment>
      <ModalContainer open={open} modalSize={'max-w-sm'}>
        <ModalHeaderWrapper cssClasses={'px-3 pt-3'}>
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
        </ModalHeaderWrapper>
        <ModalContentWrapper>
          <div
            className={'flex flex-col items-center'
              .concat(' space-y-5')
              .concat(' pt-3 pb-10')}
          >
            <div className='flex flex-col items-center'>
              <ReactSVG
                src={SvgIcon['info-sr']}
                className='w-14 h-14 fill-blue-500'
              />
            </div>
            <div className={'flex flex-col'.concat(' xxs:px-7 xs:px-9')}>
              <p className='text-base text-dark text-center'>
                {stringIsNotEmpty(infoMsg) ? infoMsg : `<info message>`}
              </p>
            </div>
          </div>
        </ModalContentWrapper>
        {/* <ModalFooterWrapper></ModalFooterWrapper> */}
      </ModalContainer>
    </React.Fragment>
  );
};

export default InfoModal;
