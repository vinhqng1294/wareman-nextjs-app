import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import {
  AbortItem,
  CanceledItem,
  CompletedItem,
  ConnectionLine,
  CurrentItem,
  DoneItem,
  NumberItem,
  StatusType,
  WarningItem,
} from '@/components/ui/status-icon/status-icon.component';
import { SaleOrderStatusList } from '../sale-order.enum';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';
import { isFunction } from '@/utils/commons/checkVariableType.utils';

const SaleOrderStatus = function ({
  activeItemKey = 0,
  statusList,
  handleViewChangeHistoryModal,
  ...props
}) {
  const [saleOrderStatusList, setSaleOrderStatusList] = useState({
    ...statusList,
  });
  const [subSaleOrderStatusList, setSubSaleOrderStatusList] = useState({});

  useEffect(
    function () {
      const updatedSubSaleOrderStatusList = {};
      updatedSubSaleOrderStatusList[Object.keys(saleOrderStatusList).length] =
        SaleOrderStatusList[5];
      updatedSubSaleOrderStatusList[
        Object.keys(saleOrderStatusList).length + 1
      ] = SaleOrderStatusList[6];
      setSubSaleOrderStatusList({
        ...subSaleOrderStatusList,
        ...updatedSubSaleOrderStatusList,
      });
    },
    [saleOrderStatusList]
  );

  // console.info('subSaleRequestStatusList', subBuyingRequestStatusList);

  return (
    activeItemKey >= 0 &&
    activeItemKey <
      Object.keys(saleOrderStatusList).length +
        Object.keys(subSaleOrderStatusList).length && (
      <React.Fragment>
        <div
          className={'flex flex-col'
            .concat(' w-full max-w-4xl')
            .concat(' bg-white')
            .concat(' rounded-md shadow-md')}
        >
          <div className={'flex flex-col pt-4 px-5'}>
            <div className={'flex items-center'}>
              {Object.keys(saleOrderStatusList).map(function (
                requestKey,
                index
              ) {
                const listLength = Object.keys(saleOrderStatusList).length;
                return (
                  <React.Fragment key={index}>
                    <React.Fragment>
                      {activeItemKey === index &&
                      activeItemKey !== listLength - 1 ? (
                        <CurrentItem />
                      ) : null}
                      {(index < activeItemKey &&
                        activeItemKey < listLength - 1) ||
                      (index < activeItemKey &&
                        activeItemKey === listLength + 1 &&
                        index < listLength - 1) ? (
                        <NumberItem
                          number={index + 1}
                          statusType={StatusType.done}
                        />
                      ) : null}
                      {index < activeItemKey &&
                      activeItemKey === listLength - 1 ? (
                        <NumberItem
                          number={index + 1}
                          statusType={StatusType.completed}
                        />
                      ) : null}
                      {index > activeItemKey && index !== listLength - 1 ? (
                        <NumberItem number={index + 1} />
                      ) : null}
                      {index === listLength - 1 && activeItemKey < index ? (
                        <DoneItem />
                      ) : null}
                      {index < listLength - 1 &&
                      activeItemKey === listLength ? (
                        <AbortItem />
                      ) : null}
                      {index === listLength - 1 && activeItemKey === index ? (
                        <CompletedItem />
                      ) : null}
                      {index === listLength - 1 &&
                      activeItemKey === listLength ? (
                        <CanceledItem />
                      ) : null}
                      {index === listLength - 1 &&
                      activeItemKey === listLength + 1 ? (
                        <WarningItem />
                      ) : null}
                    </React.Fragment>
                    <React.Fragment>
                      {activeItemKey === listLength - 1 &&
                      index < listLength - 1 ? (
                        <ConnectionLine statusType={StatusType.completed} />
                      ) : activeItemKey > listLength - 1 &&
                        activeItemKey < listLength + 1 &&
                        index < listLength - 1 ? (
                        <ConnectionLine />
                      ) : (index < activeItemKey &&
                          activeItemKey < listLength - 1 &&
                          index < listLength - 1) ||
                        (index < activeItemKey &&
                          index < listLength - 1 &&
                          activeItemKey === listLength + 1) ? (
                        <ConnectionLine statusType={StatusType.done} />
                      ) : index >= activeItemKey && index < listLength - 1 ? (
                        <ConnectionLine />
                      ) : null}
                    </React.Fragment>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className='flex pt-2 pb-4 px-5 mt-2.5'>
            <div className={'flex flex-col mr-5'}>
              <p className={'text-dark font-semibold text-xl'}>
                {activeItemKey < Object.keys(saleOrderStatusList).length
                  ? saleOrderStatusList[activeItemKey]?.name
                  : subSaleOrderStatusList[activeItemKey]?.name}
              </p>
              {activeItemKey < Object.keys(saleOrderStatusList).length
                ? stringIsNotEmpty(
                    saleOrderStatusList[activeItemKey]?.description
                  ) && (
                    <p className={'text-zinc-500 text-base'}>
                      {saleOrderStatusList[activeItemKey]?.description}
                    </p>
                  )
                : stringIsNotEmpty(
                    subSaleOrderStatusList[activeItemKey]?.description
                  ) && (
                    <p className={'text-zinc-500 text-base'}>
                      {subSaleOrderStatusList[activeItemKey]?.description}
                    </p>
                  )}
            </div>

            <div className={'flex items-end justify-end ml-auto flex-none'}>
              <button
                title='Xem lịch sử thay đổi'
                type='button'
                className={'flex items-center justify-center'
                  .concat(' rounded-full')
                  .concat(' bg-white')
                  .concat(' w-7 h-7')
                  .concat(' hover:border border-zinc-50')
                  .concat(' hover:shadow-md')}
                onClick={function (evt) {
                  evt?.preventDefault();
                  evt?.stopPropagation();
                  if (isFunction(handleViewChangeHistoryModal)) {
                    handleViewChangeHistoryModal({});
                  }
                }}
              >
                <ReactSVG
                  src={SvgIcon['time-past']}
                  className={'fill-zinc-700 w-4 h-4'}
                />
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default SaleOrderStatus;
