import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import React, { useEffect, useState } from 'react';

const Tooltip = function ({
  id: userDefined_Id,
  content: userDefined_Content,
  zIndex: userDefined_zIndex,
  fontSize: userDefined_FontSize,
  bold: userDefined_Bold,
  textColor: userDefined_TextColor,
  bgColor: userDefined_BgColor,
  tooltipWidth: userDefined_TooltipWidth,
  ...props
}) {
  const [tooltipId, setTooltipId] = useState(null);
  const [content, setContent] = useState(null);
  const [zIndex, setZIndex] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [bold, setBold] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const [bgColor, setBgColor] = useState(null);
  const [tooltipWidth, setTooltipWidth] = useState(null);

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_Id)) {
        setTooltipId(userDefined_Id);
      } else {
        setTooltipId(null);
      }
    },
    [userDefined_Id]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_Content)) {
        setContent(userDefined_Content);
      } else {
        setContent('');
      }
    },
    [userDefined_Content]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_zIndex)) {
        setZIndex(userDefined_zIndex);
      } else {
        setZIndex('z-10');
      }
    },
    [userDefined_zIndex]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_FontSize)) {
        setFontSize(userDefined_FontSize);
      } else {
        setFontSize('text-xs');
      }
    },
    [userDefined_FontSize]
  );

  useEffect(
    function () {
      if (userDefined_Bold) {
        setBold('font-semibold');
      } else {
        setBold('');
      }
    },
    [userDefined_Bold]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_TextColor)) {
        setTextColor(userDefined_TextColor);
      } else {
        setTextColor('text-dark');
      }
    },
    [userDefined_TextColor]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_BgColor)) {
        setBgColor(userDefined_BgColor);
      } else {
        setBgColor('bg-gray-100');
      }
    },
    [userDefined_BgColor]
  );

  useEffect(
    function () {
      if (stringIsNotEmpty(userDefined_TooltipWidth)) {
        setTooltipWidth(userDefined_TooltipWidth);
      } else {
        setTooltipWidth('max-w-xs');
      }
    },
    [userDefined_TooltipWidth]
  );

  return (
    <React.Fragment>
      <div
        id={tooltipId}
        role='tooltip'
        className={'tooltip'
          .concat(' inline-block absolute invisible')
          .concat(' py-2 px-3')
          .concat(' rounded-lg shadow-sm')
          .concat(' opacity-0 transition-opacity duration-300')
          .concat(bold ? ` ${bold}` : '')
          .concat(zIndex ? ` ${zIndex}` : '')
          .concat(bgColor ? ` ${bgColor}` : '')}
      >
        <p
          className={''
            .concat(tooltipWidth ? ` ${tooltipWidth}` : '')
            .concat(fontSize ? ` ${fontSize}` : '')
            .concat(textColor ? ` ${textColor}` : '')}
        >
          {content}
        </p>
        <div className='tooltip-arrow' data-popper-arrow></div>
      </div>
    </React.Fragment>
  );
};

export default Tooltip;
