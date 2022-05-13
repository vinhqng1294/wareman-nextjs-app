import TextEllipsis from '@/components/ui/text-ellipsis/text-ellipsis.component';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon } from '@/utils/global.enums';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { isFunction } from '@/utils/commons/checkVariableType.utils';

const CustomerItem = function ({
  customerItemData,
  customerItemOnClick,
  defaultSelected,
  selectedCount,
  ...props
}) {
  const [selected, setSelected] = useState(defaultSelected ?? false);
  const itemOnClick = function () {
    if (!selected) {
      if (selectedCount + 1 >= 0 && selectedCount + 1 < 2) {
        setSelected(true);
        if (isFunction(customerItemOnClick)) {
          customerItemOnClick({
            selected: !selected,
            customerItemData: customerItemData,
          });
        }
      }
    } else {
      if (selectedCount - 1 >= 0 && selectedCount - 1 < 2) {
        setSelected(false);
        if (isFunction(customerItemOnClick)) {
          11;
          customerItemOnClick({
            selected: !selected,
            productItemData: customerItemData,
          });
        }
      }
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
            stringIsNotEmpty(customerItemData?.name)
              ? customerItemData?.name
              : `<Tên khách hàng>`
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
                  stringIsNotEmpty(customerItemData?.name)
                    ? customerItemData?.name
                    : `<Tên khách hàng>`
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

export default CustomerItem;
