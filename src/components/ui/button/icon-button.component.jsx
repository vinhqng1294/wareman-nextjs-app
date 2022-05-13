import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import Img from '../imageUI/imageUI.component';
import { ButtonSize, ButtonType, IconType } from './button.enum';

const IconButton = function ({
  btnType: userDefinedType,
  size: userDefinedSize,
  disabled: userDefinedDisabled,
  onClick: btnOnClick,
  payload,
  iconType: userDefinedIconType,
  roundedFull: userDefindedRoundedFull,
  src: userDefinedImgSrc,
  iconOnlySvgFillColor,
  ...props
}) {
  const [size, setSize] = useState(null);
  const [btnDimension, setBtnDimension] = useState(null);
  const [iconDimension, setIconDimension] = useState(null);
  const [borderWidth, setBorderWidth] = useState(null);
  const [type, setType] = useState(null);
  const [bgColor, setBgColor] = useState(null);
  const [borderColor, setBorderColor] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [rounded, setRounded] = useState(null);
  const [iconType, setIconType] = useState(null);
  const [svgFillColor, setSvgFillColor] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefinedSize)) {
        setSize(userDefinedSize);
      } else {
        setSize(ButtonSize.regular);
      }
    },
    [userDefinedSize]
  );
  useEffect(
    function () {
      if (stringIsNotEmpty(size)) {
        switch (size) {
          case ButtonSize.small:
            setBtnDimension('w-6 h-6');
            setIconDimension('w-3 h-3');
            setBorderWidth('border-1');
            break;
          case ButtonSize.regular:
            setBtnDimension('w-12 h-12');
            setIconDimension('w-6 h-6');
            setBorderWidth('border-2');
            break;
          case ButtonSize.large:
            setBtnDimension('w-14 h-14');
            setIconDimension('w-7 h-7');
            setBorderWidth('border-2.5');
            break;
          default:
            setBtnDimension('w-12 h-12');
            setIconDimension('w-6 h-6');
            setBorderWidth('border-2');
        }
      }
    },
    [size]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefinedType)) {
        setType(userDefinedType);
      } else {
        setType(ButtonType.default);
      }
    },
    [userDefinedType]
  );
  useEffect(
    function () {
      if (stringIsNotEmpty(type)) {
        switch (type) {
          case ButtonType.primary:
            setBgColor('bg-blue-500');
            setSvgFillColor('fill-white');
            setBorderColor('border-transparent');
            break;
          case ButtonType.warning:
            setBgColor('bg-amber-500');
            setSvgFillColor('fill-white');
            setBorderColor('border-transparent');
            break;
          case ButtonType.danger:
            setBgColor('bg-red-600');
            setSvgFillColor('fill-white');
            setBorderColor('border-transparent');
            break;
          case ButtonType.success:
            setBgColor('bg-green-500');
            setSvgFillColor('fill-white');
            setBorderColor('border-transparent');
            break;
          case ButtonType.secondary:
            setBgColor('bg-gray-200');
            setSvgFillColor('fill-dark');
            setBorderColor('border-transparent');
            break;
          case ButtonType.iconOnly:
            setBgColor('bg-transparent');
            setSvgFillColor(
              stringIsNotEmpty(iconOnlySvgFillColor)
                ? iconOnlySvgFillColor
                : 'fill-dark'
            );
            setBorderColor('border-transparent');
            break;
          default:
            setBgColor('bg-white');
            setSvgFillColor('fill-dark');
            setBorderColor('border-gray-200');
        }
      }
    },
    [type, iconOnlySvgFillColor]
  );

  useEffect(
    function () {
      if (userDefindedRoundedFull) {
        setRounded('rounded-full');
      } else {
        setRounded('rounded-md');
      }
    },
    [userDefindedRoundedFull]
  );

  useEffect(
    function () {
      if (
        typeof userDefinedDisabled === 'boolean' &&
        userDefinedDisabled === true
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    },
    [userDefinedDisabled]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefinedIconType)) {
        setIconType(userDefinedIconType);
      } else {
        setIconType(IconType.image);
      }
    },
    [userDefinedIconType]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(iconType) && stringIsNotEmpty(userDefinedImgSrc)) {
        setImgSrc(userDefinedImgSrc);
      } else {
        if (iconType === IconType.image) {
          setImgSrc('/assets/image/folder.png');
        } else {
          setImgSrc('/assets/flaticon/regular/fi-rr-shield-interrogation.svg');
        }
      }
    },
    [iconType, userDefinedImgSrc]
  );

  return (
    <React.Fragment>
      <button
        className={'flex justify-center items-center'
          .concat(rounded ? ` ${rounded}` : '')
          .concat(btnDimension ? ` ${btnDimension}` : '')
          .concat(bgColor ? ` ${bgColor}` : '')
          .concat(borderWidth ? ` ${borderWidth}` : '')
          .concat(borderColor ? ` ${borderColor}` : '')
          .concat(
            disabled
              ? ' bg-opacity-50 cursor-not-allowed'
              : ' hover:shadow-md hover:bg-opacity-90'
          )}
        disabled={disabled}
        onClick={function (evt) {
          evt?.preventDefault();
          evt?.stopPropagation();
          if (typeof btnOnClick !== 'undefined') {
            btnOnClick({ ...payload });
          }
        }}
        {...props}
      >
        {iconType === IconType.image && (
          <React.Fragment>
            <div
              className={'flex'.concat(
                iconDimension ? ` ${iconDimension}` : ''
              )}
            >
              <Img imgSrc={imgSrc} />
            </div>
          </React.Fragment>
        )}
        {iconType === IconType.svg && (
          <React.Fragment>
            <ReactSVG
              className={''
                .concat(iconDimension ? ` ${iconDimension}` : '')
                .concat(svgFillColor ? ` ${svgFillColor}` : '')}
              src={imgSrc}
            />
          </React.Fragment>
        )}
      </button>
    </React.Fragment>
  );
};

export default IconButton;

// Usage example:
{
  /* <IconButton
  iconType={IconType.svg}
  size={ButtonSize.regular}
  type={ButtonType.iconOnly}
  iconOnlySvgFillColor={'fill-red-500'}
  src={'/assets/flaticon/regular/fi-rr-box.svg'}
  roundedFull
/>; */
}
{
  /* <IconButton
  iconType={IconType.svg}
  size={ButtonSize.regular}
  type={ButtonType.primary}
  src={'/assets/flaticon/regular/fi-rr-box.svg'}
  roundedFull
/>; */
}

{
  /* <IconButton
  size={ButtonSize.large}
  type={ButtonType.iconOnly}
  src={'/assets/image/shovel.png'}
/>; */
}
