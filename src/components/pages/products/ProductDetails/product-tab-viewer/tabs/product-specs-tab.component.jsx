import { getProductSpecsById } from '@/apis/product.api';
import { DotLoader } from '@/components/ui/loader/loader.component';
import {
  arrayIsNotEmpty,
  objectIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import TabEmptyInfo from '../tab-empty-info.component';

const ProductSpecsTab = function ({
  setErrorMsg,
  setViewErrorPopup,
  viewErrorPopup,
  accessToken,
  productInfo,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  const [productSpecs, setProductSpecs] = useState([]);

  useEffect(
    function () {
      if (objectIsNotEmpty(productInfo)) {
        getProductSpecsById({
          accessToken: accessToken,
          productId: productInfo?.id,
        })
          .then(function ({ data: resData }) {
            console.info('getProductSpecsById resData', resData);
            setProductSpecs([...resData?.data?.specs]);
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
            {arrayIsNotEmpty(productSpecs) ? (
              <React.Fragment>
                {[...productSpecs].map(function (spec, index) {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className={'flex'
                          .concat(' border-b border-gray-200')
                          .concat(' hover:bg-zinc-50')}
                      >
                        <div
                          className={
                            'flex w-40'
                              .concat(' items-start justify-start')
                              .concat(' px-2 py-1.5')
                            // .concat(' border-r border-gray-200')
                          }
                        >
                          <p className='text-base text-dark font-medium'>
                            {spec?.attributeName}
                          </p>
                        </div>
                        <div
                          className={'flex'
                            .concat(' items-start justify-start')
                            .concat(' px-2 py-1.5')}
                        >
                          <p className='text-base text-dark'>
                            {stringIsNotEmpty(spec?.attributeValue)
                              ? `${spec?.attributeValue}`
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
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

export default ProductSpecsTab;
