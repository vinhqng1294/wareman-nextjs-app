import { subscribeNotification, registerSwWithPerm } from '@/libs/notifications/signalr/signalr';
import { signalrConfig } from '@/libs/notifications/signalr/config';
import { isBoolean } from '@/utils/commons/checkVariableType.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { BgColor } from '@/utils/global.enums';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import Footer from './components/footer.component';
import Header from './components/header.component';

const DefaultLayout = function ({
  layoutBgColor,
  headerBgColor,
  footerBgColor,
  bodyVerticalCenter,
  children,
  ...props
}) {
  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [notification, setNotification] = useState({
    permission:
      typeof Notification !== 'undefined' ? Notification?.permission : 'none',
    apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN,
    appDomain: process.env.NEXT_PUBLIC_APP_DOMAIN,
    accessToken: auth?.accessToken,
    channelName: process.env.NEXT_PUBLIC_NOTIFICATION_BROADCAST_CHANNEL_NAME,
    provider: {
      config: signalrConfig,
      connection: null,
    },
  });

  useEffect(
    async function() {
      if (stringIsNotEmpty(auth?.accessToken)) {
        const connection = await subscribeNotification({ accessToken: auth?.accessToken });

        notification?.provider?.connection
          || setNotification({
              ...notification,
              provider: { ...notification?.provider, connection: connection }
            });

        notification?.provider?.connection && await registerSwWithPerm({ notification });
      }
    },
    [auth?.accessToken, notification]
  );

  return (
    <React.Fragment>
      <div
        id='wms-default-layout'
        className={`flex flex-col p-0`.concat(
          layoutBgColor && layoutBgColor?.length > 0
            ? ` ${layoutBgColor}`
            : ` ${BgColor.light}`
        )}
      >
        <SimpleBarReact className='h-screen w-screen'>
          <div className='flex flex-col min-h-screen'>
            <Header
              bgColor={stringIsNotEmpty(headerBgColor) ? headerBgColor : null}
              notification={notification}
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
            <Footer
              bgColor={stringIsNotEmpty(footerBgColor) ? footerBgColor : null}
            />
          </div>
        </SimpleBarReact>
      </div>
    </React.Fragment>
  );
};

export default DefaultLayout;
