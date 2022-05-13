import ContentContainer from '@/components/ui/container/content-container.component';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { Symbol } from '@/utils/global.enums';
import React from 'react';

const Footer = function ({ bgColor, ...props }) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-col flex-none'
          .concat(' items-center')
          .concat(' mt-auto')
          .concat(
            stringIsNotEmpty(bgColor) ? ` ${bgColor}` : ' bg-transparent'
          )}
      >
        <ContentContainer>
          <div
            className={'flex'
              .concat(' item-center justify-center')
              .concat(' py-3 px-7')}
          >
            <p
              className={'text-dark text-center'
                .concat(' xxs:text-sm')
                .concat(' md:text-base')}
            >
              Capstone Project {Symbol.longDash} {Symbol.copyright} Warehouse
              Management {Symbol.longDash} 2022
            </p>
          </div>
        </ContentContainer>
      </div>
    </React.Fragment>
  );
};

export default Footer;
