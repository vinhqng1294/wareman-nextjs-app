import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { generateRandomColorHex } from '@/utils/commons/generateRandomColor.utils';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import { ReactSVG } from 'react-svg';

const NavItem = function ({ icon, label, url, secondIcon = null, ...props }) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' rounded-md bg-zinc-100')
          .concat(' hover:cursor-pointer')
          .concat(' xxs:px-4 xxs:py-3')
          .concat(' md:px-5 md:py-4')
          .concat(' space-y-3')
          .concat(' xxs:max-w-[15rem] xs:max-w-none w-full')
          .concat(' hover:shadow-md')}
        onClick={function (evt) {
          evt?.preventDefault();
          evt?.stopPropagation();
          if (stringIsNotEmpty(url)) {
            redirectTo(url);
          }
        }}
      >
        <div className={'flex'}>
          {stringIsNotEmpty(icon) ? (
            <React.Fragment>
              <ReactSVG
                src={icon}
                className={'fill-dark'
                  .concat(' xxs:w-7 xxs:h-7')
                  .concat(' xs:w-8 xs:h-8')
                  .concat(' lg:w-10 lg:h-10')}
              />
              {stringIsNotEmpty(secondIcon) && (
                <ReactSVG
                  src={secondIcon}
                  className={'fill-dark ml-0.5'
                    .concat(' xxs:w-7 xxs:h-7')
                    .concat(' xs:w-8 xs:h-8')
                    .concat(' lg:w-10 lg:h-10')}
                />
              )}
            </React.Fragment>
          ) : (
            <div
              className={'flex rounded-full'
                .concat(' xxs:w-7 xxs:h-7')
                .concat(' xs:w-8 xs:h-8')
                .concat(' lg:w-10 lg:h-10')}
              style={{ backgroundColor: `${generateRandomColorHex()}` }}
            ></div>
          )}
        </div>
        <div className={'flex xxs:h-12 md:h-14 items-end'}>
          <TextEllipsis
            content={stringIsNotEmpty(label) ? label : `<Tên tính năng>`}
            textFormat={`whitespace-pre-wrap`
              .concat(` text-dark break-words`)
              .concat(' xxs:text-base md:text-lg')}
            customTextStyles={{
              WebkitLineClamp: 2,
              display: `-webkit-box`,
              WebkitBoxOrient: `vertical`,
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavItem;
