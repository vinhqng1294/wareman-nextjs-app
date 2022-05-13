import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import LotItem from './lot-item.component';

const LotItemList = function ({
  lotList,
  lotItemOnClick,
  defaultSelectedLot,
  selectedCount,
  ...props
}) {
  return (
    <React.Fragment>
      <div
        className={'w-full'
          .concat(' grid grid-cols-1')
          .concat(' gap-x-2 gap-y-2.5')}
      >
        {lotList?.map(function (lot, index) {
          return (
            <React.Fragment key={index}>
              <LotItem
                lotItemData={lot}
                lotItemOnClick={lotItemOnClick}
                defaultSelected={defaultSelectedLot === lot?.id}
                selectedCount={selectedCount}
              />
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default LotItemList;
