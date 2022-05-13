import React from 'react';

const UnauthorizedView = function ({ ...props }) {
  return (
    <React.Fragment>
      <div className='flex flex-col space-y-10 mt-10'>
        <p
          className={'text-white text-center'
            .concat(' xxs:text-base md:text-lg')
            .concat(' xxs:px-7 xxs:py-3')
            .concat(' md:px-8 md:py-4')
            .concat(' rounded-full bg-sky-400')}
        >
          Vui lòng đăng nhập để tiếp tục
        </p>
        <p
          className={'text-dark text-center space-x-2'
            .concat(' xxs:text-sm xxs:px-5')
            .concat(' md:text-base md:px-0')}
        >
          <span className='font-semibold'>Lưu ý:</span>
          <span className=''>
            Nếu bạn chưa có tài khoản, vui lòng liên hệ admin hệ thống để tạo
            tài khoản giúp bạn
          </span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default UnauthorizedView;
