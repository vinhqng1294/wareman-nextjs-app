import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import RackItem from './rack-item.component';

const RackItemList = function ({
  rackList,
  rackItemOnClick,
  defaultSelectedRack,
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
        {rackList?.map(function (rack, index) {
          return (
            <React.Fragment key={index}>
              <RackItem
                rackItemData={rack}
                rackItemOnClick={rackItemOnClick}
                defaultSelected={defaultSelectedRack === rack?.id}
                selectedCount={selectedCount}
              />
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default RackItemList;
