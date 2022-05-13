import { isBoolean } from '@/utils/commons/checkVariableType.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { ButtonSize, ButtonType } from '../button/button.enum';
import RoundedButton from '../button/rounded-button.component';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import ModalContainer from '@/components/ui/modal/modal-container.component';
import ModalHeaderWrapper from '@/components/ui/modal/modal-header-wrapper.component';
import ModalContentWrapper from '@/components/ui/modal/modal-content-wrapper.component';
import ModalFooterWrapper from '@/components/ui/modal/modal-footer-wrapper.component';

const ModalSampleOrigin = function ({
  open: userDefined_Open,
  children,
  ...props
}) {
  const [open, setOpen] = useState(false);

  useEffect(
    function () {
      if (isBoolean(userDefined_Open) && userDefined_Open === true) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    },
    [userDefined_Open]
  );

  return (
    <React.Fragment>
      <div
        className={''
          .concat(open ? 'fixed' : 'sr-only')
          .concat(' right-0 left-0 top-0 inset-0 z-50')
          .concat(' overflow-y-auto overflow-x-hidden')
          .concat(' h-full w-full')
          .concat(' flex flex-col justify-center')
          .concat(' backdrop-filter backdrop-blur-md')
          .concat(' bg-slate-100 bg-opacity-5')
          .concat(` transform duration-300 ease-in-out`)
          .concat(open ? ' scale-100' : ' scale-0')
          .concat(' xxs:px-2 xxs:py-2')
          .concat(' md:px-0 md:py-5')}
      >
        <div
          className={`bg-white w-full max-w-2xl`
            .concat(` flex flex-col items-center`)
            .concat(` rounded-xl shadow-lg`)
            .concat(` mx-auto xxs-B:my-0 md-B:my-auto`)
            .concat(' relative overflow-hidden')}
        >
          <div
            className={'flex justify-between items-center'
              .concat(' w-full bg-white')
              .concat(' px-5 py-3')
              .concat(' border-b border-zinc-200')}
          >
            <p className='text-xl text-dark font-bold'>Modal Title</p>
            <button
              className={'flex items-center justify-center'
                .concat(' w-8 h-8')
                .concat(' rounded-full')
                .concat(' hover:bg-neutral-200 hover:bg-opacity-50')}
            >
              <ReactSVG
                src={SvgIcon['cross-alt']}
                className='w-6 h-6 fill-zinc-500'
              />
            </button>
          </div>
          <div className='flex w-full h-full overflow-hidden'>
            <SimpleBarReact
              className={`flex flex-col`.concat(' w-full').concat(' h-full')}
            >
              <div className={'flex flex-col w-full h-full'}>
                <div className='p-6 space-y-6'>
                  <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                    {`With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.`}
                  </p>
                  <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                    {`The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.`}
                  </p>
                  <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                    {`The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.`}
                  </p>
                  <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                    {`The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.`}
                  </p>
                  <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                    {`The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.`}
                  </p>
                </div>
              </div>
            </SimpleBarReact>
          </div>
          <div
            className={'flex flex-col'
              .concat(' w-full')
              .concat(' bg-white')
              .concat(' px-4 py-3')
              .concat(' border-t border-zinc-200')}
          >
            <RoundedButton
              size={ButtonSize.regular}
              btnType={ButtonType.primary}
              text={'Agree'}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const ModalSampleWithComponent = function ({ ...props }) {
  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  return (
    <React.Fragment>
      <ModalContainer open={viewErrorPopup}>
        <ModalHeaderWrapper>
          <div className={'flex justify-between items-center'}>
            <p className='text-xl text-dark font-bold'>Modal Title</p>
            <button
              type='button'
              className={'flex items-center justify-center'
                .concat(' w-8 h-8')
                .concat(' rounded-full')
                .concat(' hover:bg-neutral-200 hover:bg-opacity-50')}
              onClick={function (evt) {
                evt?.preventDefault();
                evt?.stopPropagation();
                setViewErrorPopup(!viewErrorPopup);
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
          <div className='p-6 space-y-6'>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              {`With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.`}
            </p>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              {`The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.`}
            </p>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              {`The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.`}
            </p>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              {`The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.`}
            </p>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              {`The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.`}
            </p>
          </div>
        </ModalContentWrapper>
        <ModalFooterWrapper>
          <RoundedButton
            size={ButtonSize.regular}
            btnType={ButtonType.primary}
            text={'Agree'}
          />
        </ModalFooterWrapper>
      </ModalContainer>
    </React.Fragment>
  );
};
