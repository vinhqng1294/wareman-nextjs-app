import React, { useState } from 'react';
import TabHeader from './tab-header.component';
import ProductListTab from './tabs/product-list-tab/product-list-tab.component';

const RackTabViewer = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  lotInfo,
  rackInfo,
  ...props
}) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <React.Fragment>
      <div className={'flex flex-col w-full'}>
        <TabHeader activeTab={activeTab} updateActiveTab={setActiveTab} />

        {activeTab == 1 && (
          <ProductListTab
            setErrorMsg={setErrorMsg}
            setViewErrorPopup={setViewErrorPopup}
            viewErrorPopup={viewErrorPopup}
            accessToken={accessToken}
            lotInfo={lotInfo}
            rackInfo={rackInfo}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default RackTabViewer;
