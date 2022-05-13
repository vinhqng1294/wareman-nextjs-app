import { redirectTo } from '@/utils/commons/redirectToUrl.utils';
import { SvgIcon } from '@/utils/global.enums';
import React from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

const Page404Wrapper = styled.div`
  * {
    --button: #b3b3b3;
    --button-color: #0a0a0a;
    --shadow: #000;
    --bg: #737373;
    --header: #7a7a7a;
    --color: #fafafa;
    --lit-header: #e6e6e6;
    --speed: 2s;
  }
  * {
    box-sizing: border-box;
    transform-style: preserve-3d;
  }
  @property --swing-x {
    initial-value: 0;
    inherits: false;
    syntax: '<integer>';
  }
  @property --swing-y {
    initial-value: 0;
    inherits: false;
    syntax: '<integer>';
  }
  .container {
    /* height: 100%;
    width: 100%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    color: var(--color);
    perspective: 1200px;
  }

  h1 {
    animation: swing var(--speed) infinite alternate ease-in-out;
    font-size: clamp(5rem, 40vmin, 20rem);
    /* font-family: 'Open Sans', sans-serif; */
    font-weight: 700;
    /* margin: 0; */
    /* margin-top: 1rem;
    margin-bottom: 1rem; */
    letter-spacing: 1rem;
    transform: translate3d(0, 0, 0vmin);
    --x: calc(50% + (var(--swing-x) * 0.5) * 1%);
    background: radial-gradient(var(--lit-header), var(--header) 45%) var(--x)
      100%/200% 200%;
    -webkit-background-clip: text;
    color: transparent;
  }
  h1:after {
    animation: swing var(--speed) infinite alternate ease-in-out;
    content: '404';
    position: absolute;
    top: 0;
    left: 0;
    color: var(--shadow);
    filter: blur(1.5vmin);
    transform: scale(1.05) translate3d(0, 12%, -10vmin)
      translate(
        calc((var(--swing-x, 0) * 0.05) * 1%),
        calc((var(--swing-y) * 0.05) * 1%)
      );
  }
  .cloak {
    animation: swing var(--speed) infinite alternate-reverse ease-in-out;
    height: 100%;
    width: 100%;
    transform-origin: 50% 30%;
    transform: rotate(calc(var(--swing-x) * -0.25deg));
    background: radial-gradient(40% 40% at 50% 42%, transparent, #000 35%);
  }
  .cloak__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
  .cloak__container {
    height: 250vmax;
    width: 250vmax;
    position: absolute;
    /* top: 50%; */
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @-moz-keyframes swing {
    0% {
      --swing-x: -100;
      --swing-y: -100;
    }
    50% {
      --swing-y: 0;
    }
    100% {
      --swing-y: -100;
      --swing-x: 100;
    }
  }
  @-webkit-keyframes swing {
    0% {
      --swing-x: -100;
      --swing-y: -100;
    }
    50% {
      --swing-y: 0;
    }
    100% {
      --swing-y: -100;
      --swing-x: 100;
    }
  }
  @-o-keyframes swing {
    0% {
      --swing-x: -100;
      --swing-y: -100;
    }
    50% {
      --swing-y: 0;
    }
    100% {
      --swing-y: -100;
      --swing-x: 100;
    }
  }
  @keyframes swing {
    0% {
      --swing-x: -100;
      --swing-y: -100;
    }
    50% {
      --swing-y: 0;
    }
    100% {
      --swing-y: -100;
      --swing-x: 100;
    }
  }
`;

const Custom404Page = function ({ ...props }) {
  return (
    <React.Fragment>
      <Page404Wrapper className='overflow-x-hidden'>
        <div className='flex flex-col h-screen w-screen items-center'>
          <h1 className='xxs:mt-0 md:mt-5'>404</h1>
          <div className='cloak__wrapper'>
            <div className='cloak__container portrait:top-1/3 landscape:top-1/2'>
              <div className='cloak'></div>
            </div>
          </div>
          <div className='flex flex-col items-center px-8 space-y-3 my-auto'>
            <p
              className={'text-zinc-100 text-center'
                .concat(' xxs:text-xl md:text-3xl')
                .concat(' font-semibold')}
            >
              Xin lỗi! Chúng tôi không tìm thấy trang bạn cần tìm.
            </p>
            <button
              type='button'
              className={'flex items-center justify-center'
                .concat(' rounded-full')
                .concat(' xxs:px-3.5 xxs:py-1.5 md:px-5 md:py-2')
                .concat(' bg-white')
                .concat(' border-2 border-zinc-200')
                .concat(
                  false
                    ? ' bg-opacity-50 cursor-not-allowed'
                    : ' hover:shadow-md hover:bg-opacity-90'
                )}
              onClick={function (evt) {
                evt?.preventDefault();
                evt?.stopPropagation();
                redirectTo('/');
              }}
            >
              <ReactSVG
                src={SvgIcon['arrow-left']}
                className='fill dark w-4 h-4 mr-2'
              />
              <p className='text-base text-dark font-semibold'>
                Trở về trang chủ
              </p>
            </button>
          </div>
        </div>
      </Page404Wrapper>
    </React.Fragment>
  );
};

export default Custom404Page;
