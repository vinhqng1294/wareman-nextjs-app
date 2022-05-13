import EmptyListInfoV2 from '@/components/ui/empty-list-info/empty-list-info-v2.component';
import { arrayIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React from 'react';
import ProductItem from './product-item.component';

const ProductItemList = function ({
  productList,
  productInfoList,
  onItemRemove,
  onItemEdit,
  ...props
}) {
  return (
    <React.Fragment>
      <div className='flex flex-col'>
        <div className='flex items-center'>
          <p className='text-lg text-dark font-semibold'>Danh sách sản phẩm</p>
        </div>
        <div className='flex flex-col mt-4'>
          {arrayIsNotEmpty(productList) ? (
            <React.Fragment>
              {productList?.map(function (product, index) {
                return (
                  <React.Fragment key={index}>
                    <ProductItem
                      productItemData={product}
                      index={index}
                      isLast={index + 1 === productList?.length}
                      productInfoData={productInfoList[index]}
                      onItemRemove={onItemRemove}
                      onItemEdit={onItemEdit}
                    />
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <EmptyListInfoV2 itemLabel={'sản phẩm'} />
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductItemList;
