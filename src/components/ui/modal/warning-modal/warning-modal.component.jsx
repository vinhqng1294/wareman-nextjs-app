import { isFunction } from '@/utils/commons/checkVariableType.utils';
import {
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { ButtonSize, ButtonType } from '@/components/ui/button/button.enum';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import ModalContainer from '../modal-container.component';
import ModalContentWrapper from '../modal-content-wrapper.component';
import ModalFooterWrapper from '../modal-footer-wrapper.component';
import ModalHeaderWrapper from '../modal-header-wrapper.component';
import { DotLoader } from '@/components/ui/loader/loader.component';

const WarningModal = function ({
  open,
  onClose,
  onCloseParams,
  onAgree,
  onAgreeParams,
  warningMsg,
  warningMsgObj,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const handleAgree = function () {
    // console.info('onAgree', onAgree);
    setLoading(true);
    if (isFunction(onAgree?.function)) {
      onAgree?.function({ ...onAgree?.params })?.finally(function () {
        setLoading(false);
        onClose({ onCloseParams });
      });
    }
  };

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
              .concat(' pt-3 pb-5')}
          >
            <div className='flex flex-col items-center'>
              <ReactSVG
                src={SvgIcon['shield-exclamation-sr']}
                className='w-14 h-14 fill-amber-500'
              />
            </div>
            <div className={'flex flex-col'.concat(' xxs:px-7 xs:px-9')}>
              {objectIsNotEmpty(warningMsgObj) ? (
                <React.Fragment>{warningMsgObj}</React.Fragment>
              ) : (
                <p className='text-base text-dark text-center'>
                  {stringIsNotEmpty(warningMsg)
                    ? warningMsg
                    : `<warning message>?`}
                </p>
              )}
            </div>
          </div>
        </ModalContentWrapper>
        <ModalFooterWrapper cssClasses={'px-5 py-5'}>
          <div className={'flex justify-center items-center space-x-5'}>
            {loading ? (
              <div className='flex'>
                <DotLoader loading={loading} />
              </div>
            ) : (
              <React.Fragment>
                <RoundedButton
                  size={ButtonSize.regular}
                  btnType={ButtonType.primary}
                  text={'Đồng ý'}
                  onClick={handleAgree}
                  payload={onAgreeParams}
                />
                <RoundedButton
                  size={ButtonSize.regular}
                  btnType={ButtonType.default}
                  text={'Không'}
                  onClick={onClose}
                  payload={onCloseParams}
                />
              </React.Fragment>
            )}
          </div>
        </ModalFooterWrapper>
      </ModalContainer>
    </React.Fragment>
  );
};

export default WarningModal;
