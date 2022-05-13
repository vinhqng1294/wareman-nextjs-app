import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';

const ModalHeaderWrapper = function ({
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
          'bg-white'.concat(' px-5 py-3').concat(' border-b border-zinc-200')
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

export default ModalHeaderWrapper;
