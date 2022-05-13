import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useState } from 'react';
import { ImportRequestStatusList } from '@/components/pages/warehouse-import-requests/import-request.enum';
import moment from 'moment';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { makeFullName } from '@/utils/commons/makeFullName.utils';
import { ExportRequestStatusList } from '@/components/pages/warehouse-export-requests/export-request.enum';

const ExportItem = function ({
  index,
  exportRequestItemData,
  isLast,
  accessToken,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  ...props
}) {
  const [componentLoading, setComponentLoading] = useState(false);

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
            className={'flex w-full'.concat(' cursor-pointer')}
            onClick={function (evt) {
              evt?.preventDefault();
              evt?.stopPropagation();
              redirectTo(
                `/warehouse-export-requests/${exportRequestItemData?.id}`,
                true
              );
            }}
          >
            <div
              className={'flex w-16 flex-none'
                .concat(' items-center justify-start')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark'>{index + 1}</p>
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-start')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark'>
                {/* {`${
                  stringIsNotEmpty(importRequestItemData?.name)
                    ? importRequestItemData?.name
                    : 'N/A'
                }`} */}
                {`${makeFullName({
                  firstName: exportRequestItemData?.userFirstName,
                  lastName: exportRequestItemData?.userLastName,
                })}`}
              </p>
            </div>

            <div
              className={'flex w-52 flex-none flex-wrap'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p
                className={'text-sm font-semibold'.concat(
                  exportRequestItemData?.status ===
                    ExportRequestStatusList[6].key
                    ? ' text-orange-400'
                    : exportRequestItemData?.status ===
                      ExportRequestStatusList[2].key
                    ? ' text-sky-600'
                    : // : importRequestItemData?.status ===
                    //   ImportRequestStatusList[3].key
                    // ? ' text-blue-600'
                    exportRequestItemData?.status ===
                      ExportRequestStatusList[3].key
                    ? ' text-amber-600'
                    : exportRequestItemData?.status ===
                      ExportRequestStatusList[4].key
                    ? ' text-green-500'
                    : exportRequestItemData?.status ===
                      ExportRequestStatusList[5].key
                    ? ' text-red-600'
                    : ' text-zinc-500'
                )}
              >
                {`${
                  ExportRequestStatusList[
                    `${Object.keys(ExportRequestStatusList).find(function (
                      key,
                      index
                    ) {
                      if (
                        exportRequestItemData?.status ===
                        ExportRequestStatusList[key].key
                      ) {
                        return key;
                      }
                    })}`
                  ]?.name
                }`.toUpperCase()}
              </p>
            </div>

            <div
              className={'flex w-36 flex-none'
                .concat(' items-start justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark text-center'>
                {`${
                  stringIsNotEmpty(exportRequestItemData?.addedDate)
                    ? moment(exportRequestItemData?.addedDate).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )
                    : 'N/A'
                }`}
              </p>
            </div>
            <div
              className={'flex w-36 flex-none'
                .concat(' items-start justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-base text-dark text-center'>
                {`${
                  stringIsNotEmpty(exportRequestItemData?.updatedDate)
                    ? moment(exportRequestItemData?.updatedDate).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )
                    : 'N/A'
                }`}
              </p>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExportItem;
