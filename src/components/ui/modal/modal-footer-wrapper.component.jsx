import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';

const ModalFooterWrapper = function ({
  cssClasses: userDefined_CssClasses,
  children,
  ...props
}) {
  const [cssClasses, setCssClasses] = useState('');

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_CssClasses)) {
        setCssClasses(userDefined_CssClasses);
      } else {
        setCssClasses(
          'bg-white'.concat(' px-4 py-3').concat(' border-t border-zinc-200')
        );
      }
    },
    [userDefined_CssClasses]
  );

  return (
    <React.Fragment>
      <div className={'flex flex-col w-full'.concat(` ${cssClasses}`)}>
        {children}
      </div>
    </React.Fragment>
  );
};

export default ModalFooterWrapper;
