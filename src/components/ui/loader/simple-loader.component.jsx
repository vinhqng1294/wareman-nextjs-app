import { SvgIcon } from '@/utils/global.enums';
import React from 'react';
import { ReactSVG } from 'react-svg';

export const SimpleLoader = function({
  css,
  size,
  loading,
  ...props
}) {
  return loading === true
    ? (
      <React.Fragment>
        <div className={'flex justify-center items-center  py-5 px-3 '.concat(css ? css : '')}>
          <ReactSVG
            className={'animate-spin w-5 h-5 '.concat(size ? `w-${size} h-${size}` : '')}
            src={SvgIcon['loader']}
          />
        </div>
      </React.Fragment>
      )
    : ('');
}
