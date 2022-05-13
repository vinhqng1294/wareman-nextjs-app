import React, { useState } from 'react';
import TabHeader from './tab-header.component';
import ProductDetailsDescriptionTab from './tabs/product-details-description-tab.component';
import ProductStatisticsTab from './tabs/product-statistics-tab/product-statistics-tab.component';
import ProductSpecsTab from './tabs/product-specs-tab.component';

const ProductTabViewer = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  productInfo,
  ...props
}) {
  const [activeTab, setActiveTab] = useState(1);
  // console.info('activeTab', activeTab);

  return (
    <React.Fragment>
      <div className={'flex flex-col w-full'}>
        <TabHeader activeTab={activeTab} updateActiveTab={setActiveTab} />

        {activeTab == 1 && (
          <ProductSpecsTab
            setErrorMsg={setErrorMsg}
            setViewErrorPopup={setViewErrorPopup}
            viewErrorPopup={viewErrorPopup}
            accessToken={accessToken}
            productInfo={productInfo}
          />
        )}
        {activeTab == 2 && (
          <ProductDetailsDescriptionTab
            setErrorMsg={setErrorMsg}
            setViewErrorPopup={setViewErrorPopup}
            viewErrorPopup={viewErrorPopup}
            accessToken={accessToken}
            productInfo={productInfo}
          />
        )}
        {activeTab == 3 && (
          <ProductStatisticsTab
            setErrorMsg={setErrorMsg}
            setViewErrorPopup={setViewErrorPopup}
            viewErrorPopup={viewErrorPopup}
            accessToken={accessToken}
            productInfo={productInfo}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductTabViewer;
