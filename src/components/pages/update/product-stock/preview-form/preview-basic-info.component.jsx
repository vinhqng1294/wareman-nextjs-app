import { trimUUID } from '@/utils/commons/trimUUID.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { isNumber } from 'lodash';
import React from 'react';

const PreviewBasicInfo = function ({
  defaultValue,
  productStockInfo,
  lotInfo,
  rackInfo,
  ...props
}) {
  return (
    <React.Fragment>
      <div className='flex flex-col'>
        <div className='flex space-x-2'>
          <p className={'text-2xl text-blue-500 font-semibold'}>
            {stringIsNotEmpty(productStockInfo?.productName)
              ? `${productStockInfo?.productName}`
              : 'N/A'}
          </p>
        </div>
        <div className='flex space-x-2'>
          <p className={'text-base text-dark'.concat(' flex-none').concat('')}>
            Mã đơn nhập hàng:
          </p>
          <p className={'text-base text-dark font-medium'}>
            {stringIsNotEmpty(productStockInfo?.importId)
              ? `${trimUUID(productStockInfo?.importId)}`.toUpperCase()
              : 'N/A'}
          </p>
        </div>
        <div className='flex space-x-2'>
          <p className={'text-base text-dark'.concat(' flex-none').concat('')}>
            Tên đơn nhập hàng:
          </p>
          <p className={'text-base text-dark font-medium'}>
            {stringIsNotEmpty(productStockInfo?.importName)
              ? `${productStockInfo?.importName}`
              : 'N/A'}
          </p>
        </div>
        <div className='flex flex-col space-x-2'>
          <p className={'text-base text-dark'.concat(' flex-none').concat('')}>
            Vị trí hiện tại
          </p>
          <div className='flex space-x-2 pl-10'>
            <p className='text-base text-dark'>Phân khu:</p>
            {stringIsNotEmpty(productStockInfo?.lotName) ? (
              <p className='text-base text-dark font-medium'>
                {`${productStockInfo?.lotName}`}
              </p>
            ) : (
              <p className='text-base text-zinc-500 font-medium italic'>{`Chưa sắp xếp`}</p>
            )}
          </div>
          <div className='flex space-x-2 pl-10'>
            <p className='text-base text-dark'>Kệ:</p>
            {stringIsNotEmpty(productStockInfo?.rackName) ? (
              <p className='text-base text-dark font-medium'>
                {`${productStockInfo?.rackName}`}
              </p>
            ) : (
              <p className='text-base text-zinc-500 font-medium italic'>{`Chưa sắp xếp`}</p>
            )}
          </div>
        </div>
        <div className='flex flex-col space-x-2'>
          <p className={'text-base text-dark'.concat(' flex-none').concat('')}>
            Di chuyển đến
          </p>
          <div className='flex space-x-2 pl-10'>
            <p className='text-base text-dark'>Phân khu:</p>
            {stringIsNotEmpty(lotInfo?.name) ? (
              <p className='text-base text-blue-500 font-medium'>
                {`${lotInfo?.name}`}
              </p>
            ) : (
              <p className='text-base text-zinc-500 font-medium italic'>{`Chưa sắp xếp`}</p>
            )}
          </div>
          <div className='flex space-x-2 pl-10'>
            <p className='text-base text-dark'>Kệ:</p>
            {stringIsNotEmpty(rackInfo?.name) ? (
              <p className='text-base text-blue-500 font-medium'>
                {`${rackInfo?.name}`}
              </p>
            ) : (
              <p className='text-base text-zinc-500 font-medium italic'>{`Chưa sắp xếp`}</p>
            )}
          </div>
        </div>
        <div className='flex space-x-2'>
          <p className={'text-base text-dark'.concat(' flex-none').concat('')}>
            Di chuyển với số lượng:
          </p>
          <p className={'text-base text-blue-500 font-medium'}>
            {isNumber(defaultValue?.quantity)
              ? `${parseFloat(defaultValue?.quantity)}`
              : '0'}
          </p>
          <p
            className={'text-base text-dark font-medium'}
          >{`/${productStockInfo?.quantity} ${productStockInfo?.productUomName}`}</p>
        </div>
      </div>
      {/* <div className='flex flex-col'>
        <div className='flex items-center space-x-2'>
          <p className={'text-base text-dark'}>Tên yêu cầu mua hàng:</p>
          <p className={'text-2xl text-dark font-semibold'}>
            {defaultValue?.name}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <p className={'text-base text-dark flex-none'}>Người tạo:</p>
          <p className={'text-base text-blue-500 font-semibold'}>
            {makeFullName({
              firstName: userData?.firstName,
              lastName: userData?.lastName,
            })}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <p className={'text-base text-dark flex-none'}>Từ nhà cung cấp:</p>
          <p className={'text-base text-blue-500 font-semibold'}>
            {`${providerInfo?.name}`}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <p className={'text-base text-dark flex-none'}>Mô tả:</p>
          <p className={'text-base text-zinc-500'}>
            {stringIsNotEmpty(defaultValue?.description)
              ? defaultValue?.description
              : 'N/A'}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <p className={'text-base text-dark flex-none'}>Ghi chú:</p>
          <p className={'text-base text-zinc-500'}>
            {stringIsNotEmpty(defaultValue?.notes)
              ? defaultValue?.notes
              : 'N/A'}
          </p>
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default PreviewBasicInfo;
