import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon, TextColor } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { isFunction } from '@/utils/commons/checkVariableType.utils';

const BuyingRequestItem = function ({
  itemData,
  itemOnClick: defaultItemOnClick,
  defaultSelected,
  ...props
}) {
  const [selected, setSelected] = useState(defaultSelected ?? false);
  const itemOnClick = function () {
    setSelected(!selected);
    if (isFunction(defaultItemOnClick)) {
      defaultItemOnClick({
        selected: !selected,
        buyingRequestItemData: itemData,
      });
    }
  };

  return (
    <React.Fragment>
      <div className='flex flex-col'>
        <div
          className={'flex relative'
            .concat(' w-full')
            .concat(' bg-white')
            .concat(' rounded-md shadow-md')
            .concat(' xxs:py-3')
            .concat(' md:py-4')
            .concat(' cursor-pointer')
            .concat(selected ? ' ring-[1.5px] ring-sky-400' : '')}
          title={
            stringIsNotEmpty(itemData?.name) ? itemData?.name : `<Tên sản phẩm>`
          }
          onClick={itemOnClick}
        >
          {/* <div
            className={'flex flex-col'
              .concat(' flex-none justify-center')
              .concat(' pl-2.5')}
          >
            <div
              className={'flex flex-none'
                .concat(' items-center justify-center')
                .concat(' w-4 h-4')
                .concat(' rounded-full border-1')
                .concat(selected ? ' bg-blue-500' : ' bg-white')
                .concat(selected ? ' border-transparent' : ' border-gray-300')}
            >
              {selected && (
                <React.Fragment>
                  <ReactSVG
                    src={SvgIcon.check}
                    className={'w-2.5 h-2.5'.concat(' fill-white')}
                  />
                </React.Fragment>
              )}
            </div>
          </div> */}
          <div className='flex px-3'>
            <div className='flex mt-0'>
              <TextEllipsis
                content={
                  stringIsNotEmpty(itemData?.name)
                    ? itemData?.name
                    : `<Tên sản phẩm>`
                }
                textFormat={`whitespace-pre-wrap`
                  .concat(` text-base text-dark`)
                  .concat(' font-semibold')}
                customTextStyles={{
                  WebkitLineClamp: 2,
                  display: `-webkit-box`,
                  WebkitBoxOrient: `vertical`,
                }}
              />
            </div>
          </div>
          {selected && (
            <React.Fragment>
              <div
                className={'flex flex-col flex-none'
                  .concat(' justify-center items-end')
                  .concat(' pr-2.5 ml-auto')}
              >
                <div
                  className={'flex flex-none'
                    .concat(' items-center justify-center')
                    .concat(' w-4 h-4')
                    .concat(' rounded-full border-1')
                    .concat(selected ? ' bg-blue-500' : ' bg-white')
                    .concat(
                      selected ? ' border-transparent' : ' border-gray-300'
                    )}
                >
                  <ReactSVG
                    src={SvgIcon.check}
                    className={'w-2.5 h-2.5'.concat(' fill-white')}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuyingRequestItem;
