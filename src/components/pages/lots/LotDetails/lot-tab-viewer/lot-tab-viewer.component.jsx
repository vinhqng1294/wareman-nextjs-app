import React, { useState } from 'react';
import TabHeader from './tab-header.component';
import ProductListTab from './tabs/product-list-tab.component';
import RackListTab from './tabs/rack-list-tab.component';

const LotTabViewer = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  lotInfo,
  ...props
}) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <React.Fragment>
      <div className={'flex flex-col w-full'}>
        <TabHeader activeTab={activeTab} updateActiveTab={setActiveTab} />

        {activeTab == 1 && (
          <RackListTab
            setErrorMsg={setErrorMsg}
            setViewErrorPopup={setViewErrorPopup}
            viewErrorPopup={viewErrorPopup}
            accessToken={accessToken}
            lotInfo={lotInfo}
          />
        )}
        {activeTab == 2 && (
          <ProductListTab
            setErrorMsg={setErrorMsg}
            setViewErrorPopup={setViewErrorPopup}
            viewErrorPopup={viewErrorPopup}
            accessToken={accessToken}
            lotInfo={lotInfo}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default LotTabViewer;
