import {
  getProductDescriptionById,
} from '@/apis/product.api';
import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import TabEmptyInfo from '../tab-empty-info.component';

const ProductDetailsDescriptionTab = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  productInfo,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  const [productDescription, setProductDescription] = useState('');

  useEffect(
    function () {
      if (objectIsNotEmpty(productInfo)) {
        getProductDescriptionById({
          accessToken: accessToken,
          productId: productInfo?.id,
        })
          .then(function ({ data: resData }) {
            console.info('getProductDescriptionById resData', resData);
            setProductDescription([...resData?.data?.longDescription]);
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            setViewErrorPopup(!viewErrorPopup);
          })
          .finally(function () {
            setLoading(false);
          });
      }
    },
    [productInfo]
  );

  return (
    <React.Fragment>
      {loading ? (
        <React.Fragment>
          <div className='flex flex-col items-center py-10 px-3 mx-auto'>
            <DotLoader loading={loading} />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='flex flex-col py-3 px-6'>
            {stringIsNotEmpty(productDescription) ? (
              <React.Fragment>
                <p className='text-base text-dark'>{`${productDescription}`}</p>
              </React.Fragment>
            ) : (
              <TabEmptyInfo />
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductDetailsDescriptionTab;
