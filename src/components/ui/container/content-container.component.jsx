import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';

const ContentContainer = function ({ cssClassnames, children, ...props }) {
  return (
    <React.Fragment>
      <div
        className={'xxs:w-full lg:max-w-7xl flex flex-col'.concat(
          stringIsNotEmpty(cssClassnames) ? ` ${cssClassnames}` : ''
        )}
        {...props}
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default ContentContainer;
