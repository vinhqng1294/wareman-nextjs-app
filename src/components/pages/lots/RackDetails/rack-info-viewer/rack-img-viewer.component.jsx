import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import RackImg from './rack-img.component';

const RackImgViewer = function ({ photoList, ...props }) {
  const [imgRef, setImgRef] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

  const onWindowResize = function () {
    if (imgRef?.clientWidth) {
      setImgHeight(imgRef?.clientWidth);
    }
  };

  const [selectedImgId, setSelectedImgId] = useState('');

  const photoItemOnClick = function ({ data }) {
    setSelectedImgId(data);
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

  useEffect(
    function () {
      if (arrayIsNotEmpty(photoList)) {
        photoItemOnClick({ data: photoList[0] });
      }
    },
    [photoList]
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
          <RackImg
            imgUrl={
              stringIsNotEmpty(selectedImgId)
                ? `${process.env.NEXT_PUBLIC_API_DOMAIN}/photos/product/download/url?id=${selectedImgId}`
                : ''
            }
          />
        </div>
        <div
          className={'flex flex-col ml-3'.concat(' w-24')}
          style={{ height: `${imgHeight}px` }}
        >
          {arrayIsNotEmpty(photoList) && (
            <React.Fragment>
              <ScrollContainer
                horizontal={false}
                vertical={true}
                hideScrollbars={true}
                // className='h-full w-full'
                nativeMobileScroll={false}
              >
                <div className='flex flex-col space-y-5'>
                  {[...photoList].map(function (photoId, index) {
                    return (
                      <React.Fragment key={index}>
                        <div
                          className='w-24 h-24 cursor-pointer'
                          onClick={function (evt) {
                            evt?.preventDefault();
                            evt?.stopPropagation();
                            photoItemOnClick({ data: photoId });
                          }}
                        >
                          <RackImg
                            defaultSvgSize={'w-14 h-14'}
                            imgUrl={`${process.env.NEXT_PUBLIC_API_DOMAIN}/photos/product/download/url?id=${photoId}`}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </ScrollContainer>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RackImgViewer;
