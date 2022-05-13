import React from 'react';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';

const ModalContentWrapper = function ({ children, ...props }) {
  return (
    <React.Fragment>
      <div className='flex w-full h-full overflow-hidden'>
        <SimpleBarReact
          className={`flex flex-col`.concat(' w-full').concat(' h-full')}
        >
          <div className={'flex flex-col w-full h-full'}>{children}</div>
        </SimpleBarReact>
      </div>
    </React.Fragment>
  );
};

export default ModalContentWrapper;
