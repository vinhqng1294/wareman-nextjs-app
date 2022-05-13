import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import ReportItem from './report-item.component';
import TableHeader from './table-header.component';

const ReportItemList = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  rowList,
  ...props
}) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full bg-white')
          .concat(' rounded-md overflow-hidden')
          .concat(' border border-gray-200')
          .concat(' mb-5')}
      >
        <TableHeader />
        {[...rowList].map(function (rowData, index) {
          return (
            <React.Fragment key={index}>
              <ReportItem
                setErrorMsg={setErrorMsg}
                setViewErrorPopup={setViewErrorPopup}
                viewErrorPopup={viewErrorPopup}
                accessToken={accessToken}
                rowData={rowData}
                index={index}
                isLast={index + 1 === rowList?.length}
              />
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ReportItemList;
