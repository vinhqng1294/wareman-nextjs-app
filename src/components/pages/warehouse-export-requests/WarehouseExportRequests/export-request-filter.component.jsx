import ToggleButton from '@/components/ui/button/toggle-button.component';
import Checkbox from '@/components/ui/checkbox/checkbox.component';
import React from 'react';
import { useState } from 'react';

const ExportRequestFilter = function ({ ...props }) {
  const [viewFilterOption, setViewFilterOption] = useState(false);

  const filterOnCheck = function (isChecked) {
    setViewFilterOption(isChecked);
  };

  return (
    <React.Fragment>
      <div
        className={'flex flex-col'
          .concat(' w-full bg-zinc-50')
          .concat(' py-2.5 px-7 mt-3 overflow-hidden')
          .concat(' border-gray-200 border-t border-b')
          .concat(' rounded-tl-xl rounded-tr-xl')
          .concat(' rounded-bl-xl rounded-br-xl')}
      >
        <div className='flex items-center justify-between'>
          <p className='text-base text-dark'>Bộ lọc</p>
          <div className='flex ml-7'>
            <ToggleButton
              defaultChecked={viewFilterOption}
              onCheck={filterOnCheck}
              primaryColor={'bg-neutral-600'}
            />
          </div>
        </div>

        <div
          className={'flex-wrap select-none'
            .concat(' justify-start mt-3')
            .concat(' -mx-3.5 overflow-hidden')
            .concat(' transition-all ease-linear duration-300')
            .concat(viewFilterOption ? ' transform flex' : ' transform hidden')}
        >
          <div className='flex mx-3.5 mb-2.5'>
            <Checkbox
              spaceX={'space-x-2'}
              label={function ({ ...props }) {
                return (
                  <p className='text-sm leading-4 text-dark space-x-1'>
                    {/* <span>Agree with dasd sad ada asd asdasd ada ad ad</span> */}
                    <span className='text-amber-500'>Đang chuẩn bị</span>
                  </p>
                );
              }}
            />
          </div>
          <div className='flex mx-3.5 mb-2.5'>
            <Checkbox
              spaceX={'space-x-2'}
              label={function ({ ...props }) {
                return (
                  <p className='text-sm leading-4 text-dark space-x-1'>
                    {/* <span>Agree with dasd sad ada asd asdasd ada ad ad</span> */}
                    <span className='text-green-500'>Thành phẩm</span>
                  </p>
                );
              }}
            />
          </div>
          <div className='flex mx-3.5 mb-2.5'>
            <Checkbox
              spaceX={'space-x-2'}
              label={function ({ ...props }) {
                return (
                  <p className='text-sm leading-4 text-dark space-x-1'>
                    {/* <span>Agree with dasd sad ada asd asdasd ada ad ad</span> */}
                    <span className='text-red-500'>Lỗi</span>
                  </p>
                );
              }}
            />
          </div>
          <div className='flex mx-3.5 mb-2.5'>
            <Checkbox
              spaceX={'space-x-2'}
              label={function ({ ...props }) {
                return (
                  <p className='text-sm leading-4 text-dark space-x-1'>
                    {/* <span>Agree with dasd sad ada asd asdasd ada ad ad</span> */}
                    <span className='text-zinc-500'>Đang đóng gói</span>
                  </p>
                );
              }}
            />
          </div>
          <div className='flex mx-3.5 mb-2.5'>
            <Checkbox
              spaceX={'space-x-2'}
              label={function ({ ...props }) {
                return (
                  <p className='text-sm leading-4 text-dark space-x-1'>
                    {/* <span>Agree with dasd sad ada asd asdasd ada ad ad</span> */}
                    <span className='text-sky-500'>Đã vận chuyển</span>
                  </p>
                );
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExportRequestFilter;
