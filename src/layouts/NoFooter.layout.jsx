import { isBoolean } from '@/utils/commons/checkVariableType.utils';
import { BgColor } from '@/utils/global.enums';
import React from 'react';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import Header from './components/header.component';

const NoFooterLayout = function ({
  layoutBgColor,
  headerBgColor,
  bodyVerticalCenter,
  children,
  ...props
}) {
  return (
    <React.Fragment>
      <div
        className={`flex flex-col p-0`.concat(
          layoutBgColor && layoutBgColor?.length > 0
            ? ` ${layoutBgColor}`
            : ` ${BgColor.light}`
        )}
      >
        <SimpleBarReact className='h-screen'>
          <div className='flex flex-col min-h-screen'>
            <Header
              bgColor={stringIsNotEmpty(headerBgColor) ? headerBgColor : null}
            />
            <div
              className={'flex flex-col items-center'.concat(
                isBoolean(bodyVerticalCenter) && bodyVerticalCenter === true
                  ? ' my-auto'
                  : ' my-0'
              )}
            >
              {children}
            </div>
          </div>
        </SimpleBarReact>
      </div>
    </React.Fragment>
  );
};

export default NoFooterLayout;
