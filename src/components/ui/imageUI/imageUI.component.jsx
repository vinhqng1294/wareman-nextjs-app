import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImgObjectFit } from './image.enum';

const Img = function ({
  imgSrc: userDefinedImgSrc,
  alt: userDefinedAlt,
  cover: isObjectFitCover,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState('#');
  const [alt, setAlt] = useState(null);
  const [objectFit, setObjectFit] = useState('contain');

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefinedImgSrc)) {
        setImgSrc(userDefinedImgSrc);
      } else {
        setImgSrc('');
      }
    },
    [userDefinedImgSrc]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefinedAlt)) {
        setAlt(userDefinedAlt);
      } else {
        setAlt('');
      }
    },
    [userDefinedAlt]
  );

  useEffect(
    function () {
      if (typeof isObjectFitCover === 'boolean' && isObjectFitCover === true) {
        setObjectFit(ImgObjectFit.cover);
      } else {
        setObjectFit(ImgObjectFit.contain);
      }
    },
    [isObjectFitCover]
  );

  return (
    <div
      className={'relative overflow-hidden w-full h-full'.concat(
        !stringIsNotEmpty(imgSrc) ? ' bg-slate-100' : ''
      )}
    >
      {stringIsNotEmpty(imgSrc) && (
        <Image
          loader={function ({ src }) {
            return src;
          }}
          src={imgSrc}
          alt={alt}
          layout='fill'
          objectFit={objectFit}
          unoptimized
        />
      )}
    </div>
  );
};

export default Img;
