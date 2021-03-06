import { arrayIsNotEmpty, stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import moment from 'moment';

const RoleItem = function ({ index, roleItemData, ...props }) {
  const [isExpand, setIsExpand] = useState(false);
  const expandBtnOnClick = function () {
    setIsExpand(!isExpand);
  };

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
            // onClick={function (evt) {
            //   evt?.preventDefault();
            //   evt?.stopPropagation();
            //   redirectTo(
            //     `/lots/${lotInfo?.id}/rack/${uomInfo?.id}`,
            //     true
            //   );
            // }}
          >
            {/* <div className='flex flex-none w-8 px-1 py-1.5'>
              <button
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(' hover:bg-white')
                  .concat(' w-6 h-6')
                  .concat(' hover:shadow-md hover:border border-zinc-50')}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  expandBtnOnClick();
                }}
              >
                <ReactSVG
                  src={isExpand ? SvgIcon['angle-up'] : SvgIcon['angle-down']}
                  className={'fill-dark w-4 h-4'}
                />
              </button>
            </div> */}
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
                  stringIsNotEmpty(roleItemData?.name)
                    ? `${roleItemData?.name}`
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
                  stringIsNotEmpty(roleItemData?.addedDate)
                    ? moment(roleItemData?.addedDate).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )
                    : 'N/A'
                }`}
              </p>
            </div>
            <div
              className={'flex w-40 flex-none'
                .concat(' items-start justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark text-center'>{`${
                stringIsNotEmpty(roleItemData?.updatedDate)
                  ? moment(roleItemData?.updatedDate).format(
                      'DD/MM/YYYY HH:mm:ss'
                    )
                  : 'N/A'
              }`}</p>
            </div>
          </div>

          {/* <div
            className={'flex w-32 flex-none'
              .concat(' items-center justify-end')
              .concat(' px-2 py-1.5')
              .concat(' space-x-3')}
          >
            <button
              title='S???a'
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
              title='Xo??'
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
        {isExpand && (
          <React.Fragment>
            <div className='flex w-full pl-10 pr-2 py-1.5 space-x-2'>
              <p className='text-base text-dark font-semibold'>C??c quy???n ???????c ph??p:</p>
              {/* {arrayIsNotEmpty(roleItemData?.permissions) ? } */}
              <p className='text-base text-dark'>
                {stringIsNotEmpty(roleItemData?.description)
                  ? roleItemData?.description
                  : 'N/A'}
              </p>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default RoleItem;
