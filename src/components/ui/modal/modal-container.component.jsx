import { isBoolean } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';

const ModalContainer = function ({
  open: userDefined_Open,
  modalSize: userDefined_ModalSize,
  zIndex: userDefined_zIndex = 'z-20',
  children,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [modalSize, setModalSize] = useState('');

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

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_ModalSize)) {
        setModalSize(userDefined_ModalSize);
      } else {
        setModalSize('max-w-2xl');
      }
    },
    [userDefined_ModalSize]
  );

  return (
    <React.Fragment>
      <div
        className={''
          // .concat(open ? 'fixed' : 'sr-only')
          .concat('fixed')
          .concat(' right-0 left-0 top-0 inset-0')
          .concat(' overflow-y-auto overflow-x-hidden')
          .concat(' h-full w-full')
          .concat(' flex flex-col justify-center')
          .concat(' backdrop-filter backdrop-blur-sm')
          .concat(' bg-gray-700 bg-opacity-50')
          // .concat(` transform duration-500 ease-linear`)
          .concat(open ? ' scale-100' : ' scale-0')
          .concat(' xxs:px-2 xxs:py-2')
          .concat(' md:px-0 md:py-5')
          .concat(` ${userDefined_zIndex}`)}
      >
        <div
          className={`bg-white w-full`
            .concat(` flex flex-col items-center`)
            .concat(` rounded-xl shadow-lg`)
            .concat(` mx-auto xxs-B:my-0 md-B:my-auto`)
            .concat(' relative overflow-hidden')
            .concat(` ${modalSize}`)}
        >
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalContainer;
