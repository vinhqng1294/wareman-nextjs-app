import React from 'react';
import ProductImgViewer from './product-img-viewer.component';
import ProductInfo from './product-info.component';

const ProductInfoView = function ({
  productInfo,
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  ...props
}) {
  return (
    <React.Fragment>
      <div className={'flex w-full'.concat(' xxs:flex-col md:flex-row')}>
        <ProductInfo
          productInfo={productInfo}
          setErrorMsg={setErrorMsg}
          setViewErrorPopup={setViewErrorPopup}
          viewErrorPopup={viewErrorPopup}
          accessToken={accessToken}
        />
        <ProductImgViewer photoList={productInfo?.photoIds ?? []} />
      </div>
    </React.Fragment>
  );
};

export default ProductInfoView;
