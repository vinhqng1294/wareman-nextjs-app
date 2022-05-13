import React, { useState } from 'react';
import TabHeader from './tab-header.component';
import AddressListTab from './tabs/address-list-tab.component';
import ContactListTab from './tabs/contact-list-tab.component';

const CustomerTabViewer = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  customerInfo,
  ...props
}) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <React.Fragment>
      <div className={'flex flex-col w-full'}>
        <TabHeader activeTab={activeTab} updateActiveTab={setActiveTab} />

        {activeTab == 1 && (
          <AddressListTab
            setErrorMsg={setErrorMsg}
            setViewErrorPopup={setViewErrorPopup}
            viewErrorPopup={viewErrorPopup}
            accessToken={accessToken}
            customerInfo={customerInfo}
          />
        )}
        {activeTab == 2 && (
          <ContactListTab
            setErrorMsg={setErrorMsg}
            setViewErrorPopup={setViewErrorPopup}
            viewErrorPopup={viewErrorPopup}
            accessToken={accessToken}
            customerInfo={customerInfo}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default CustomerTabViewer;
