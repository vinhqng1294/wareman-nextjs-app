import { ButtonType, IconType } from '@/components/ui/button/button.enum';
import IconButton from '@/components/ui/button/icon-button.component';
import ContentContainer from '@/components/ui/container/content-container.component';
import InputPassword from '@/components/ui/input/input-password.component';
import InputText from '@/components/ui/input/input-text.component';
import { InputState } from '@/components/ui/input/input.enum';
import BlankLayout from '@/layouts/Blank.layout';
import passwordValidation from '@/utils/commons/passwordValidation.utils';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { SvgIcon, TextColor } from '@/utils/global.enums';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { Action_Auth } from '@/redux/auth/auth.action';
import ErrorModal from '@/components/ui/modal/error-modal/error-modal.component';
import { DotLoader } from '@/components/ui/loader/loader.component';
import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { getCurrentUserInfo, login } from 'libs/apis/authentication.api';
import emailValidation from '@/utils/commons/emailValidation.utils';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

const LoginMain = function ({ ...props }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(
    (state) => ({ auth: state?.auth }),
    shallowEqual
  );

  const [pageLoading, setPageLoading] = useState(false);

  const [viewErrorPopup, setViewErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorPopupOnClose = function () {
    setViewErrorPopup(!viewErrorPopup);
    setErrorMsg('');
    setPageLoading(false);
  };

  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('@wareman.xyz');
  const [password, setPassword] = useState('');
  const [inputValidation, setInputValidation] = useState({
    email: true,
    password: true,
  });
  const emailOnChange = function ({ value, evt }) {
    setEmail(value);
    setInputValidation({
      ...inputValidation,
      email: emailValidation(value),
    });
  };
  const passwordOnChange = function ({ value, evt }) {
    setPassword(value);
    setInputValidation({
      ...inputValidation,
      password: passwordValidation(value),
    });
  };

  // Mock Login
  // const handleLogin = function ({ ...props }) {
  //   // console.info('login ...', props);
  //   setPageLoading(true);
  //   if (username === 'vqn@wareman.xyz' && password === 'Test1234@') {
  //     dispatch(
  //       Action_Auth.LoginSuccess({
  //         firstName: 'Vinh Q.',
  //         lastName: 'Nguyen',
  //         email: 'vinhnq@mailsac.com',
  //       })
  //     );
  //     dispatch(
  //       Action_Auth.SetAccessToken({
  //         accessToken: 'success',
  //       })
  //     );

  //     setTimeout(() => {
  //       setPageLoading(false);
  //       redirectTo('/');
  //     }, 300);
  //   } else {
  //     setViewErrorPopup(!viewErrorPopup);
  //     setErrorMsg('Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại.');
  //   }
  // };

  const [accessToken, setAccessToken] = useState('');
  const handleLogin = function () {
    console.info('login ...');
    setPageLoading(true);
    login({ email: email, password: password })
      .then(function ({ data: resData }) {
        console.info('login', resData);
        setAccessToken(resData?.data?.token);
      })
      .catch(function (err) {
        console.error('err', err);
        console.error('err', err?.response);
        setErrorMsg('Thông tin đăng nhập không đúng. Vui lòng thử lại!');
        setViewErrorPopup(!viewErrorPopup);
      });
  };

  useEffect(
    function () {
      if (stringIsNotEmpty(auth?.accessToken)) {
        redirectTo('/');
      }
    },
    [auth]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(accessToken)) {
        getCurrentUserInfo({ accessToken: accessToken })
          .then(function ({ data: resData }) {
            console.info('getCurrentUserInfo', resData);
            dispatch(
              Action_Auth.LoginSuccess({
                firstName: resData?.data?.firstName,
                lastName: resData?.data?.lastName,
                email: resData?.data?.email,
                userId: resData?.data?.userId,
                permissions: {
                  createBuyingRequest:
                    resData?.data?.currentUserAllowCreateBuyingRequest,
                  createCustomer: resData?.data?.currentUserAllowCreateCustomer,
                  createLot: resData?.data?.currentUserAllowCreateLot,
                  createProduct: resData?.data?.currentUserAllowCreateProduct,
                  createProvider: resData?.data?.currentUserAllowCreateProvider,
                  createPurchaseOrder:
                    resData?.data?.currentUserAllowCreatePurchaseOrder,
                  createRack: resData?.data?.currentUserAllowCreateRack,
                  createRole: resData?.data?.currentUserAllowCreateRole,
                  createSaleOrder:
                    resData?.data?.currentUserAllowCreateSaleOrder,
                  createUom: resData?.data?.currentUserAllowCreateUom,
                  createUser: resData?.data?.currentUserAllowCreateUser,
                },
                rawData: resData?.data,
              })
            );
            dispatch(
              Action_Auth.SetAccessToken({
                accessToken: accessToken,
              })
            );
            setPageLoading(false);
          })
          .catch(function (err) {
            console.error('err', err);
            console.error('err', err?.response);
            setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại!');
            dispatch(Action_Auth.Logout());
            setViewErrorPopup(!viewErrorPopup);
          });
      }
    },
    [accessToken]
  );

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <ErrorModal
        open={viewErrorPopup}
        errorMsg={errorMsg}
        onClose={errorPopupOnClose}
      />
      <BlankLayout bodyVerticalCenter>
        <ContentContainer cssClassnames={'xxs:px-1 md:px-5'}>
          <div className={'flex flex-col'.concat(' items-center')}>
            <div
              className={'flex flex-col'
                .concat(' items-center bg-white')
                .concat(' rounded-lg shadow-md')
                .concat(' xxs:max-w-xs md:max-w-md w-full')
                .concat(' xxs:py-5 md:py-6')
                .concat(' xxs:px-5 md:px-7')}
            >
              <div className='flex items-center justify-center'>
                <p className='text-dark text-3xl font-bold text-center'>
                  Đăng nhập
                </p>
              </div>
              <form className='flex flex-col' onSubmit={handleLogin}>
                <div
                  className={'flex flex-col'
                    .concat(' mt-6 w-72')
                    .concat(' space-y-4')}
                >
                  <InputText
                    label={'Email'}
                    labelColor={TextColor.default}
                    inputState={
                      !inputValidation.email
                        ? InputState.danger
                        : InputState.default
                    }
                    placeholder={''}
                    errorTooltipId={'email-error'}
                    errorText={'Email không hợp lệ'}
                    defaultText={email}
                    onChange={emailOnChange}
                  />
                  <InputPassword
                    label={'Mật khẩu'}
                    labelColor={TextColor.default}
                    inputState={
                      !inputValidation.password
                        ? InputState.danger
                        : InputState.default
                    }
                    errorTooltipId={'password-error'}
                    errorText={`Mật khẩu phải chứa từ 8 đến 20 ký tự. Trong đó phải chứa ít
                    nhất 1 chữ số, 1 chữ cái in hoa, 1 chữ cái in thường, và 1 ký
                    tự đặc biệt`}
                    onChange={passwordOnChange}
                    helpText={`Mật khẩu phải chứa từ 8 đến 20 ký tự. Trong đó phải chứa ít
                    nhất 1 chữ số, 1 chữ cái in hoa, 1 chữ cái in thường, và 1 ký
                    tự đặc biệt`}
                    helpTooltipId={'password-help'}
                  />
                </div>
                <div className='flex items-center justify-center mt-7 mb-2'>
                  {pageLoading ? (
                    <DotLoader loading={pageLoading} />
                  ) : (
                    <IconButton
                      iconType={IconType.svg}
                      btnType={ButtonType.primary}
                      src={SvgIcon.login}
                      roundedFull
                      type={'submit'}
                      disabled={
                        !(
                          stringIsNotEmpty(email) &&
                          stringIsNotEmpty(password) &&
                          inputValidation.password &&
                          inputValidation.email
                        )
                      }
                      onClick={handleLogin}
                    />
                  )}
                  {/* <RoundedButton
                  bold
                  btnType={ButtonType.primary}
                  text={'Đăng nhập'}
                  RightIcon={function () {
                    return (
                      <ReactSVG
                        className='w-5 h-5 fill-white ml-2 my-auto'
                        src={SvgIcon.login}
                      />
                    );
                  }}
                  type={'submit'}
                /> */}
                </div>
              </form>
            </div>
          </div>
        </ContentContainer>
      </BlankLayout>
    </React.Fragment>
  );
};

export default LoginMain;
