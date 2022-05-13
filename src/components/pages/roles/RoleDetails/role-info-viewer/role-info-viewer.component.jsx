import React from 'react';
import RoleImgViewer from './role-img-viewer.component';
import RoleInfo from './role-info.component';

const RoleInfoView = function ({
  roleInfo,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  return (
    <React.Fragment>
      <div className={'flex w-full'.concat(' xxs:flex-col md:flex-row')}>
        <RoleInfo
          roleInfo={roleInfo}
          setErrorMsg={setErrorMsg}
          setViewErrorPopup={setViewErrorPopup}
          viewErrorPopup={viewErrorPopup}
          accessToken={accessToken}
        />
        <RoleImgViewer
          itemData={{
            imgUrl:
              'https://xe360.com/uploads/forum/photo/hi/hio/hio8uhzxz80d.jpg',
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default RoleInfoView;
