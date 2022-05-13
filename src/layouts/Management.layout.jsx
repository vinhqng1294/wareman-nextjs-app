import { isBoolean } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { BgColor } from '@/utils/global.enums';
import React from 'react';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import Footer from './components/footer.component';
import Header from './components/header.component';

const ManagementLayout = function ({
  layoutBgColor,
  headerBgColor,
  footerBgColor,
  bodyVerticalCenter,
  bodyPaddingY,
  title,
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
        <div className='flex flex-col h-screen w-screen'>
          <Header
            bgColor={stringIsNotEmpty(headerBgColor) ? headerBgColor : null}
          />
          <div
            className={'flex flex-col'
              .concat(' w-full overflow-hidden')
              .concat(
                isBoolean(bodyVerticalCenter) && bodyVerticalCenter === true
                  ? ' my-auto'
                  : ' my-0'
              )
              .concat(
                stringIsNotEmpty(bodyPaddingY) ? ` ${bodyPaddingY}` : ' py-0'
              )}
          >
            <div className={'flex flex-col py-5'}>
              <p
                className={'text-dark text-center font-bold'
                  .concat(' xxs:text-2xl')
                  .concat(' md:text-4xl')
                  .concat(' px-6')}
              >
                {stringIsNotEmpty(title) ? title : `<tiêu đề>`}
              </p>
            </div>
            <div className='flex flex-col h-full w-full overflow-hidden'>
              <SimpleBarReact className='h-full w-full'>
                <div className='flex flex-col'>
                  <div className={'flex flex-col items-center'}>{children}</div>
                </div>
              </SimpleBarReact>
            </div>
          </div>
          <Footer
            bgColor={stringIsNotEmpty(footerBgColor) ? footerBgColor : null}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ManagementLayout;
