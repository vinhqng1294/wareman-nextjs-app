import React from 'react';
import EmployeeImgViewer from './employee-img-viewer.component';
import EmployeeInfo from './employee-info.component';

const EmployeeInfoView = function ({
  employeeInfo,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  return (
    <React.Fragment>
      <div className={'flex w-full'.concat(' xxs:flex-col md:flex-row')}>
        <EmployeeInfo
          employeeInfo={employeeInfo}
          setErrorMsg={setErrorMsg}
          setViewErrorPopup={setViewErrorPopup}
          viewErrorPopup={viewErrorPopup}
          accessToken={accessToken}
        />
        <EmployeeImgViewer
          // itemData={{
          //   imgUrl:
          //     'https://xe360.com/uploads/forum/photo/hi/hio/hio8uhzxz80d.jpg',
          // }}
        />
      </div>
    </React.Fragment>
  );
};

export default EmployeeInfoView;
