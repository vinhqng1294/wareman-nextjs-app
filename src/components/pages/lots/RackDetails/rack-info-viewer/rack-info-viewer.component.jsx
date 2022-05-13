import React from 'react';
import RackImgViewer from './rack-img-viewer.component';
import RackInfo from './rack-info.component';

const RackInfoView = function ({
  lotInfo,
  rackInfo,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  return (
    <React.Fragment>
      <div className={'flex w-full'.concat(' xxs:flex-col md:flex-row')}>
        <RackInfo
          lotInfo={lotInfo}
          rackInfo={rackInfo}
          setErrorMsg={setErrorMsg}
          setViewErrorPopup={setViewErrorPopup}
          viewErrorPopup={viewErrorPopup}
          accessToken={accessToken}
        />
        <RackImgViewer
          photoList={rackInfo?.photoIds ?? []}
          // photoList={
          //   lotInfo?.photoIds ?? [
          //     '42b469ec-5c4a-4e46-adac-5cae53683fc7',
          //     'bb50ffb8-197d-4527-aa04-67fad7bf6736',
          //     '4039b4a2-35b5-45e1-b4b6-a03007f8ed72',
          //     '37ab56f7-4e19-4535-af22-cd4f727d9755',
          //   ]
          // }
        />
      </div>
    </React.Fragment>
  );
};

export default RackInfoView;
