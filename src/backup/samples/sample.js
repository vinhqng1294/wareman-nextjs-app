import Head from 'next/head';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Action_Auth } from '@/redux/auth/auth.action';
import RoundedButton from '@/components/ui/button/rounded-button.component';
import { ReactSVG } from 'react-svg';
import {
  ButtonSize,
  ButtonType,
  IconType,
} from '@/components/ui/button/button.enum';
import IconButton from '@/components/ui/button/icon-button.component';
import Img from '@/components/ui/imageUI/imageUI.component';
import { mergeArrUnique } from '@/utils/commons/array.utils';
import InputText from '@/components/ui/input/input-text.component';
import {
  InputLabelPosition,
  InputSize,
  InputState,
  InputTextPosition,
  LabelSize,
} from '@/components/ui/input/input.enum';
import { objectIsNotNullOrUndefined } from '@/utils/commons/validateNotEmpty.utils';
import InputPassword from '@/components/ui/input/input-password.component';
import Checkbox from '@/components/ui/checkbox/checkbox.component';
import XRegExp from 'xregexp';
import { containNumeric } from '@/utils/commons/passwordValidation.utils';

const FlowbitePlugin = dynamic(
  () => import('@/components/plugins/flowbite-plugin.component'),
  {
    ssr: false,
  }
);

export default function Home() {
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);

  const inputChange = function ({ value }) {
    console.info('input value', value);
    if (containNumeric(value)) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(function () {
    dispatch(
      Action_Auth.LoginSuccess({
        firstName: 'Vinh Q.',
        lastName: 'Nguyen',
        email: 'vinhnq@mailsac.com',
      })
    );
  }, []);

  const arr1 = [
    {
      name: 'a1',
      description: 'test 1',
      details: { skin: 'red', eye: 'brown' },
    },
    {
      name: 'a2',
      description: 'test 2',
      details: { skin: 'blue', eye: 'brown' },
    },
  ];
  const arr2 = [
    {
      name: 'a1',
      description: 'test 1',
      details: { skin: 'red', eye: 'brown' },
    },
    {
      name: 'a3',
      description: 'test 3',
      details: { skin: 'yellow', eye: 'blue' },
    },
  ];

  return (
    <React.Fragment>
      <FlowbitePlugin />
      <Head>
        <title>Trang chủ</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col py-5'>
        <p className='leading-snug text-7xl text-center'>Trang chủ</p>
        <div className='flex flex-col items-center space-y-2 py-4'>
          <div className={'flex flex-col w-60 space-y-3'}>
            <Checkbox
              label={'hien mat khau'}
              labelFontSize={'text-sm leading-4'}
              // label={function ({ ...props }) {
              //   return (
              //     <p className='text-sm leading-4 text-dark space-x-1 w-28'>
              //       <span>Agree with dasd sad ada asd asdasd ada ad ad</span>
              //       <span className='text-blue-400'>terms</span>
              //     </p>
              //   );
              // }}
              checked={true}
              onChange={function ({ checked }) {
                console.info('checkbox status', checked);
              }}
            />
            <InputPassword
              label={'Mat khau'}
              labelSize={LabelSize.small}
              placeholder={'Mat khau'}
              size={InputSize.regular}
              inputState={InputState.default}
              errorTooltipId={'password-error'}
              errorText={
                'You can use any value defined in your opacity scale, or use arbitrary values if you need to deviate from your design tokens.'
              }
              onChange={function ({ value }) {
                console.info('password value', value);
              }}
            />
            <InputText
              labelBold
              // labelColor={'text-blue-400'}
              // helpIconColor={'fill-blue-400'}
              // labelPosition={InputLabelPosition.center}
              label={'Label'}
              inputState={isError ? InputState.danger : InputState.default}
              // size={InputSize.regular}
              inputBold
              // textPosition={InputTextPosition.right}
              placeholder={'eg. abc'}
              helpText={
                'You can use any value defined in your opacity scale, or use arbitrary values if you need to deviate from your design tokens.'
              }
              helpTooltipId={'tooltip1'}
              labelSize={LabelSize.small}
              errorTooltipId={'name-error'}
              errorText={
                'You can use any value defined in your opacity scale, or use arbitrary values if you need to deviate from your design tokens.'
              }
              defaultText={'hello'}
              onChange={inputChange}
            />
            <InputText
              labelBold
              labelColor={'text-blue-400'}
              helpIconColor={'fill-blue-400'}
              helpTooltipColor={'bg-blue-400'}
              // labelPosition={InputLabelPosition.center}
              label={'Label'}
              inputState={InputState.default}
              // size={InputSize.large}
              inputBold
              textPosition={InputTextPosition.right}
              placeholder={'eg. abc'}
              helpText={'abc'}
              helpTooltipId={'tooltip2'}
              labelSize={LabelSize.small}
            />
          </div>
          <div className='flex w-52 h-52 border-1 border-slate-200'>
            <Img
              imgSrc={
                'https://kenh14cdn.com/203336854389633024/2021/12/10/photo-1-16391285892221239562337.jpg'
              }
            />
          </div>
          <IconButton
            iconType={IconType.svg}
            size={ButtonSize.regular}
            type={ButtonType.warning}
            src={'/assets/flaticon/regular/fi-rr-box.svg'}
            roundedFull
            // disabled
          />
          <RoundedButton
            bold
            roundedFull
            size={ButtonSize.large}
            type={ButtonType.success}
            text={'Xoá'}
            RightIcon={function () {
              return (
                <ReactSVG
                  className='w-3 fill-white ml-1.5'
                  src='/assets/flaticon/regular/fi-rr-trash.svg'
                />
              );
            }}

            // RightIcon={function () {
            //   return (
            //     <ReactSVG
            //       className='w-6 fill-white ml-5'
            //       src='/assets/flaticon/regular/fi-rr-add.svg'
            //     />
            //   );
            // }}
          />
          <div className=''>
            <button
              data-tooltip-target='tooltip-default'
              type='button'
              className='text-blue-400 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Default tooltip
            </button>
            <div
              id='tooltip-default'
              role='tooltip'
              className='inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-sky-500 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700'
            >
              {` Tooltip content dasdiuy adu hdausid h o get started with using
              tooltips all you need to do is add the data-tooltip-target="
              {elementId}" data attribute to an element where elementId is the
              id of the tooltip component. In the following example you can see
              the button that will trigger the tooltip-default element to be
              shown when hovered or focused.`}
              <div
                className='tooltip-arrow ring-1 ring-black'
                data-popper-arrow
              ></div>
            </div>
          </div>
        </div>
        <div className=''>
          <button
            id='dropdownInformationButton'
            data-dropdown-toggle='dropdownInformation'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            type='button'
            data-dropdown-placement='top-end'
          >
            Dropdown header{' '}
          </button>

          <div
            id='dropdownInformation'
            className='hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
          >
            <div className='py-3 px-4 text-gray-900 dark:text-white'>
              <span className='block text-sm'>Bonnie Green</span>
              <span className='block text-sm font-medium truncat'>
                name@flowbite.com
              </span>
            </div>
            <ul className='py-1' aria-labelledby='dropdownInformationButton'>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                >
                  Earnings
                </a>
              </li>
            </ul>
            <div className='py-1'>
              <a
                href='#'
                className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
              >
                Sign out
              </a>
            </div>
          </div>
        </div>

        <footer className='flex items-center justify-center w-full h-24 border-t'>
          <a
            className='flex items-center justify-center'
            href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            Powered by{' '}
            <div className='h-4 w-10 ml-2'>
              <Img imgSrc={'/vercel.svg'} />
            </div>
            {/* <Image src='/vercel.svg' alt='Vercel Logo' className='h-4 ml-2' /> */}
          </a>
        </footer>
      </div>
    </React.Fragment>
  );
}
