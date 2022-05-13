import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React from 'react';
import { ReactSVG } from 'react-svg';

const SimpleBreadcrumb = function ({
  breadcrumbInfo = { url: '', name: '' },
  ...props
}) {
  return (
    <React.Fragment>
      {stringIsNotEmpty(breadcrumbInfo?.name) && (
        <React.Fragment>
          <div className='flex py-3 px-2'>
            <button
              className='flex items-center justify-start space-x-2 group'
              onClick={function (evt) {
                evt?.stopPropagation();
                evt?.preventDefault();
                redirectTo(`${breadcrumbInfo?.url}`);
              }}
            >
              <ReactSVG
                src={SvgIcon['arrow-left']}
                className={'fill-sky-500 group-hover:fill-blue-600'.concat(
                  ' w-3.5'
                )}
              />
              <p className='text-sky-500 group-hover:text-blue-600 font-semibold text-sm'>
                {`${breadcrumbInfo?.name}`}
              </p>
            </button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SimpleBreadcrumb;
