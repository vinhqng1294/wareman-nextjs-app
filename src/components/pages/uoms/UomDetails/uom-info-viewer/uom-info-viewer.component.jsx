import React from 'react';
import UomImgViewer from './uom-img-viewer.component';
import UomInfo from './uom-info.component';

const UomInfoView = function ({
  uomInfo,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  return (
    <React.Fragment>
      <div className={'flex w-full'.concat(' xxs:flex-col md:flex-row')}>
        <UomInfo
          uomInfo={uomInfo}
          setErrorMsg={setErrorMsg}
          setViewErrorPopup={setViewErrorPopup}
          viewErrorPopup={viewErrorPopup}
          accessToken={accessToken}
        />
        <UomImgViewer
          itemData={{
            imgUrl:
              'https://xe360.com/uploads/forum/photo/hi/hio/hio8uhzxz80d.jpg',
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default UomInfoView;
