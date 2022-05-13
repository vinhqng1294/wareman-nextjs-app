import React from 'react';

const TableHeader = function ({ ...props }) {
  return (
    <React.Fragment>
      <div
        className={'flex'
          .concat(' border-b border-gray-200')
          .concat(' shadow')
          .concat(' bg-gray-300')}
      >
        <div
          className={'flex w-16 flex-none'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')}
        >
          <p className='text-sm text-dark font-semibold'>#</p>
        </div>
        <div
          className={'flex w-full'
            .concat(' items-center justify-start')
            .concat(' px-2 py-1.5')
            .concat(' border-l border-gray-200')}
        >
          <p className='text-sm text-dark font-semibold'>Mặt hàng</p>
        </div>
        <div
          className={'flex w-36 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')
            .concat(' border-l border-gray-200')}
        >
          <p className='text-sm text-dark font-semibold text-center'>{`Đơn giá bình quân (₫)`}</p>
        </div>
        <div
          className={'flex w-24 flex-none'
            .concat(' items-center justify-center')
            .concat(' px-2 py-1.5')
            .concat(' border-l border-gray-200')}
        >
          <p className='text-sm text-dark font-semibold text-center'>
            Đơn vị tính
          </p>
        </div>

        <div
          className={'flex flex-col'
            .concat(' flex-none w-60')
            .concat(' border-l border-gray-200')}
        >
          <div
            className={'flex w-full'
              .concat(' items-center justify-center')
              .concat(' px-2 py-1.5')
              .concat(' border-b border-gray-200')}
          >
            <p className='text-sm text-dark font-semibold text-center'>
              Tồn đầu kỳ
            </p>
          </div>
          <div className={'flex w-full'}>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-sm text-dark font-semibold text-center'>
                Số lượng
              </p>
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' border-l border-gray-200')}
            >
              <p className='text-sm text-dark font-semibold text-center'>
                Thành tiền
              </p>
            </div>
          </div>
        </div>

        <div
          className={'flex flex-col'
            .concat(' flex-none w-60')
            .concat(' border-l border-gray-200')}
        >
          <div
            className={'flex w-full'
              .concat(' items-center justify-center')
              .concat(' px-2 py-1.5')
              .concat(' border-b border-gray-200')}
          >
            <p className='text-sm text-dark font-semibold text-center'>
              Nhập trong kỳ
            </p>
          </div>
          <div className={'flex w-full'}>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-sm text-dark font-semibold text-center'>
                Số lượng
              </p>
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' border-l border-gray-200')}
            >
              <p className='text-sm text-dark font-semibold text-center'>
                Thành tiền
              </p>
            </div>
          </div>
        </div>

        <div
          className={'flex flex-col'
            .concat(' flex-none w-60')
            .concat(' border-l border-gray-200')}
        >
          <div
            className={'flex w-full'
              .concat(' items-center justify-center')
              .concat(' px-2 py-1.5')
              .concat(' border-b border-gray-200')}
          >
            <p className='text-sm text-dark font-semibold text-center'>
              Xuất trong kỳ
            </p>
          </div>
          <div className={'flex w-full'}>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-sm text-dark font-semibold text-center'>
                Số lượng
              </p>
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' border-l border-gray-200')}
            >
              <p className='text-sm text-dark font-semibold text-center'>
                Thành tiền
              </p>
            </div>
          </div>
        </div>

        <div
          className={'flex flex-col'
            .concat(' flex-none w-60')
            .concat(' border-l border-gray-200')}
        >
          <div
            className={'flex w-full'
              .concat(' items-center justify-center')
              .concat(' px-2 py-1.5')
              .concat(' border-b border-gray-200')}
          >
            <p className='text-sm text-dark font-semibold text-center'>
              Tồn cuối kỳ
            </p>
          </div>
          <div className={'flex w-full'}>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')}
            >
              <p className='text-sm text-dark font-semibold text-center'>
                Số lượng
              </p>
            </div>
            <div
              className={'flex w-full'
                .concat(' items-center justify-center')
                .concat(' px-2 py-1.5')
                .concat(' border-l border-gray-200')}
            >
              <p className='text-sm text-dark font-semibold text-center'>
                Thành tiền
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TableHeader;
