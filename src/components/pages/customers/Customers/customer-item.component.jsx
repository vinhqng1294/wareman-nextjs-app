import {
  ButtonSize,
  ButtonType,
  IconType,
} from '@/components/ui/button/button.enum';
import IconButton from '@/components/ui/button/icon-button.component';
import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon, TextColor } from '@/utils/global.enums';
import React from 'react';
import { ReactSVG } from 'react-svg';
import moment from 'moment';

const CustomerItem = function ({ index, customerItemData, ...props }) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' border-b border-gray-200')
          .concat(' hover:bg-zinc-50')}
      >
        <div className='flex'>
          <div
            className='flex w-full cursor-pointer'
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              redirectTo(`/customers/${customerItemData?.id}`);
            }}
          >
            <div
              className={'flex w-16 flex-none'
                .concat(' items-start justify-start')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark'>{index + 1}</p>
            </div>
            <div
              className={'flex w-full'
                .concat(' items-start justify-start')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark'>
                {`${
                  stringIsNotEmpty(customerItemData?.name)
                    ? `${customerItemData?.name}`
                    : 'N/A'
                }`}
              </p>
            </div>

            <div
              className={'flex w-40 flex-none'
                .concat(' items-start justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark text-center'>
                {`${
                  stringIsNotEmpty(customerItemData?.addedDate)
                    ? moment(customerItemData?.addedDate).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )
                    : 'N/A'
                }`}
              </p>
            </div>
            {/* <div
              className={'flex w-40 flex-none'
                .concat(' items-start justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark text-center'>{`${
                stringIsNotEmpty(uomItemData?.updatedDate)
                  ? moment(uomItemData?.updatedDate).format(
                      'DD/MM/YYYY HH:mm:ss'
                    )
                  : 'N/A'
              }`}</p>
            </div> */}
          </div>

          {/* <div
            className={'flex w-40 flex-none'
              .concat(' items-center justify-end')
              .concat(' px-2 py-1.5')
              .concat(' space-x-3')}
          >
            <button
              title='Sửa'
              type='button'
              className={'flex items-center justify-center'
                .concat(' rounded-lg')
                .concat(' hover:bg-white')
                .concat(' w-6 h-6')
                .concat(' hover:shadow-md hover:border border-zinc-50')}
            >
              <ReactSVG
                src={SvgIcon.pencil}
                className={'fill-blue-500 w-4 h-4'}
              />
            </button>
            <button
              title='Xoá'
              type='button'
              className={'flex items-center justify-center'
                .concat(' rounded-lg')
                .concat(' hover:bg-white')
                .concat(' w-6 h-6')
                .concat(' hover:shadow-md hover:border border-zinc-50')}
            >
              <ReactSVG
                src={SvgIcon.trash}
                className={'fill-red-500 w-4 h-4'}
              />
            </button>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomerItem;
