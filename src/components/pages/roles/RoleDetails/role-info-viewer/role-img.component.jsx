import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import Image from 'next/image';
import React from 'react';
import { ReactSVG } from 'react-svg';

const RoleImg = function ({ imgUrl, imgAlt, defaultSvgSize, ...props }) {
  return (
    <React.Fragment>
      {stringIsNotEmpty(imgUrl) ? (
        <div
          className={'flex flex-col'
            .concat(' relative overflow-hidden')
            .concat(' w-full h-full')
            .concat(' rounded-md')}
          style={{ backgroundImage: `url(${imgUrl})` }}
        >
          <Image
            className={`backdrop-filter backdrop-blur-2xl`}
            loader={function ({ src }) {
              return src;
            }}
            src={imgUrl ? imgUrl : '#'}
            alt={stringIsNotEmpty(imgAlt) ? imgAlt : ''}
            layout='fill'
            objectFit='contain'
            unoptimized
          />
        </div>
      ) : (
        <div
          className={'flex flex-col'
            .concat(' justify-center items-center')
            .concat(' w-full h-full')
            .concat(' bg-zinc-100 rounded-md')}
        >
          <ReactSVG
            src={SvgIcon['mountains-sr']}
            className={'fill-zinc-300'
              .concat(
                stringIsNotEmpty(defaultSvgSize)
                  ? ` ${defaultSvgSize}`
                  : ' w-36 h-36'
              )
              .concat('')}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default RoleImg;
