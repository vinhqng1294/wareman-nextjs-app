import { isFunction } from '@/utils/commons/checkVariableType.utils';
import React, { useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

const TabHeader = function ({ activeTab, updateActiveTab, ...props }) {
  const tabConfigs = {
    1: {
      title: 'Địa chỉ',
    },
    2: {
      title: 'Liên hệ',
    },
  };

  const tabItemOnClick = function ({ selectedTabKey }) {
    if (isFunction(updateActiveTab)) {
      updateActiveTab(selectedTabKey);
    }
  };

  return (
    <React.Fragment>
      <div
        className={'flex w-full'
          .concat(' xxs:flex-col md:flex-row')
          .concat(' mt-10 mb-2')}
      >
        <div
          className={'flex flex-col'
            .concat(' border-b border-gray-200')
            .concat(' w-full')}
        >
          <ScrollContainer
            horizontal={true}
            vertical={false}
            hideScrollbars={true}
            className='h-full w-full'
            nativeMobileScroll={false}
          >
            <div
              className={'flex'
                .concat(' items-center justify-start')
                .concat(' px-1')}
            >
              {Object.keys(tabConfigs).map(function (tabKey, index) {
                const isActive = tabKey == activeTab;
                // console.info('tabKey', tabKey);
                // console.info('isActive', isActive);
                return (
                  <React.Fragment key={index}>
                    <div
                      className={'flex items-center flex-none'
                        .concat(' py-2.5 px-3')
                        .concat(' rounded-t-lg border-b-2')
                        .concat(
                          isActive
                            ? ' border-blue-500'
                            : ' border-transparent hover:border-gray-300'
                        )
                        .concat(' cursor-pointer')}
                      onClick={function (evt) {
                        evt?.preventDefault();
                        evt?.stopPropagation();
                        tabItemOnClick({ selectedTabKey: tabKey });
                      }}
                    >
                      <p
                        className={'text-base font-medium'
                          .concat(
                            isActive
                              ? ' text-blue-500'
                              : ' text-gray-500 hover:text-gray-600'
                          )
                          .concat('')}
                      >
                        {tabConfigs[tabKey]?.title}
                      </p>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </ScrollContainer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TabHeader;
