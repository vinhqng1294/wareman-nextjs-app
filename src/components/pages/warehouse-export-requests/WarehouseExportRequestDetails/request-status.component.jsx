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
import { ExportRequestStatusList } from '../export-request.enum';
import { ReactSVG } from 'react-svg';
import { SvgIcon } from '@/utils/global.enums';
import { isFunction } from '@/utils/commons/checkVariableType.utils';

const RequestStatus = function ({
  activeItemKey = 0,
  statusList,
  handleViewChangeHistoryModal,
  ...props
}) {
  const [purchaseOrderStatusList, setPurchaseOrderStatusList] = useState({
    ...statusList,
  });
  const [subPurchaseOrderStatusList, setSubPurchaseOrderStatusList] = useState(
    {}
  );

  useEffect(
    function () {
      const updatedSubPurchaseOrderStatusList = {};
      updatedSubPurchaseOrderStatusList[
        Object.keys(purchaseOrderStatusList).length
      ] = ExportRequestStatusList[5];
      updatedSubPurchaseOrderStatusList[
        Object.keys(purchaseOrderStatusList).length + 1
      ] = ExportRequestStatusList[6];
      setSubPurchaseOrderStatusList({
        ...subPurchaseOrderStatusList,
        ...updatedSubPurchaseOrderStatusList,
      });
    },
    [purchaseOrderStatusList]
  );

  // console.info('subPurchaseRequestStatusList', subBuyingRequestStatusList);

  return (
    activeItemKey >= 0 &&
    activeItemKey <
      Object.keys(purchaseOrderStatusList).length +
        Object.keys(subPurchaseOrderStatusList).length && (
      <React.Fragment>
        <div
          className={'flex flex-col'
            .concat(' w-full max-w-4xl')
            .concat(' bg-white')
            .concat(' rounded-md shadow-md')}
        >
          <div className={'flex flex-col pt-4 px-5'}>
            <div className={'flex items-center'}>
              {Object.keys(purchaseOrderStatusList).map(function (
                requestKey,
                index
              ) {
                const listLength = Object.keys(purchaseOrderStatusList).length;
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
                {activeItemKey < Object.keys(purchaseOrderStatusList).length
                  ? purchaseOrderStatusList[activeItemKey]?.name
                  : subPurchaseOrderStatusList[activeItemKey]?.name}
              </p>
              {activeItemKey < Object.keys(purchaseOrderStatusList).length
                ? stringIsNotEmpty(
                    purchaseOrderStatusList[activeItemKey]?.description
                  ) && (
                    <p className={'text-zinc-500 text-base'}>
                      {purchaseOrderStatusList[activeItemKey]?.description}
                    </p>
                  )
                : stringIsNotEmpty(
                    subPurchaseOrderStatusList[activeItemKey]?.description
                  ) && (
                    <p className={'text-zinc-500 text-base'}>
                      {subPurchaseOrderStatusList[activeItemKey]?.description}
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

export default RequestStatus;
