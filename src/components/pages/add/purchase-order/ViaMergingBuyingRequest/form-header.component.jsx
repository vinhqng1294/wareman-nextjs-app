import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';

const FormHeader = function ({ title, subTitle, ...props }) {
  return (
    <React.Fragment>
      <div className={'flex flex-col'}>
        <p
          className={'text-dark text-center font-bold'
            .concat(' xxs:text-2xl')
            .concat(' md:text-3xl')
            .concat(' px-6')}
        >
          {`Tạo đơn đặt hàng từ yêu cầu mua hàng`}
        </p>
      </div>

      {(stringIsNotEmpty(title) || stringIsNotEmpty(subTitle)) && (
        <div className={'flex flex-col'.concat(' xxs:mt-6 md:mt-8')}>
          {stringIsNotEmpty(title) && (
            <p
              className={'text-dark font-semibold'
                .concat(' xxs:text-xl')
                .concat(' md:text-2xl')}
            >
              {`${title}`}
            </p>
          )}
          {stringIsNotEmpty(subTitle) && (
            <p
              className={'text-zinc-500'
                .concat(' xxs:text-sm')
                .concat(' md:text-base')}
            >
              {`${subTitle}`}
            </p>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default FormHeader;
