import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import RoleImg from './role-img.component';

const RoleImgViewer = function ({ itemData, ...props }) {
  const [imgRef, setImgRef] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

  const onWindowResize = function () {
    if (imgRef?.clientWidth) {
      setImgHeight(imgRef?.clientWidth);
    }
  };

  useEffect(
    function () {
      window.addEventListener('resize', onWindowResize);
      setTimeout(function () {
        onWindowResize();
      }, 200);
      return () => {
        window.removeEventListener('resize', onWindowResize);
      };
    },
    [imgRef]
  );

  return (
    <React.Fragment>
      <div
        className={'lg:ml-5 xl:ml-10'
          // .concat(' border-l border-zinc-200')
          .concat(' xxs:hidden lg:flex')
          .concat(' w-full')}
      >
        <div
          ref={setImgRef}
          className={'flex flex-col'.concat(' w-full').concat('')}
          style={{ height: `${imgHeight}px` }}
        >
          <RoleImg imgUrl={itemData?.imgUrl} />
        </div>
        <div
          className={'flex flex-col ml-3'.concat(' w-36')}
          style={{ height: `${imgHeight}px` }}
        >
          <ScrollContainer
            horizontal={false}
            vertical={true}
            hideScrollbars={true}
            // className='h-full w-full'
            nativeMobileScroll={false}
          >
            <div className='flex flex-col space-y-5'>
              <div className='w-36 h-36'>
                <RoleImg defaultSvgSize={'w-14 h-14'} />
              </div>
              <div className='w-36 h-36'>
                <RoleImg defaultSvgSize={'w-14 h-14'} />
              </div>
              <div className='w-36 h-36'>
                <RoleImg defaultSvgSize={'w-14 h-14'} />
              </div>
              <div className='w-36 h-36'>
                <RoleImg defaultSvgSize={'w-14 h-14'} />
              </div>
            </div>
          </ScrollContainer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RoleImgViewer;
