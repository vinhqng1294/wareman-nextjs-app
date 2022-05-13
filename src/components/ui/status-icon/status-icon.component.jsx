import { SvgIcon } from '@/utils/global.enums';
import React from 'react';
import { ReactSVG } from 'react-svg';

export const StatusType = {
  default: 1,
  done: 2,
  completed: 3,
  canceled: 4,
};

export const ConnectionLine = function ({
  statusType = StatusType.default,
  ...props
}) {
  return (
    <React.Fragment>
      <div className={'flex items-center w-full'}>
        <div
          className={'flex w-full border-b-1.5'.concat(
            statusType === StatusType.done
              ? ' border-blue-500'
              : statusType === StatusType.completed
              ? ' border-green-500'
              : ' border-gray-200'
          )}
        ></div>
      </div>
    </React.Fragment>
  );
};

export const DoneItem = function ({
  statusType = StatusType.default,
  ...props
}) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-none'
          .concat(' items-center justify-center')
          .concat(' w-6 h-6')
          .concat(' rounded-full')
          .concat(
            statusType === StatusType.done
              ? ' bg-blue-500'
              : statusType === StatusType.completed
              ? ' bg-green-500'
              : ' bg-gray-200'
          )}
      >
        <ReactSVG
          src={SvgIcon.check}
          className={'w-2.5 h-2.5'.concat(
            statusType === StatusType.default ? ' fill-zinc-500' : ' fill-white'
          )}
        />
      </div>
    </React.Fragment>
  );
};

export const AbortItem = function ({
  statusType = StatusType.default,
  ...props
}) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-none'
          .concat(' items-center justify-center')
          .concat(' w-6 h-6')
          .concat(' rounded-full')
          .concat(
            statusType === StatusType.canceled ? ' bg-red-500' : ' bg-gray-200'
          )}
      >
        <ReactSVG
          src={SvgIcon.cross}
          className={'w-2 h-2'.concat(
            statusType === StatusType.default ? ' fill-zinc-500' : ' fill-white'
          )}
        />
      </div>
    </React.Fragment>
  );
};

export const NumberItem = function ({
  number,
  statusType = StatusType.default,
  ...props
}) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-none'
          .concat(' items-center justify-center')
          .concat(' w-6 h-6')
          .concat(' rounded-full')
          .concat(
            statusType === StatusType.done
              ? ' bg-blue-500'
              : statusType === StatusType.completed
              ? ' bg-green-500'
              : ' bg-gray-200'
          )}
      >
        <p
          className={'text-xs leading-6 text-center align-middle w-6 h-6'.concat(
            statusType === StatusType.default ? ' text-zinc-500' : ' text-white'
          )}
        >
          {number}
        </p>
      </div>
    </React.Fragment>
  );
};

export const CurrentItem = function ({ ...props }) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-none'
          .concat(' items-center justify-center')
          .concat(' w-11 h-11')
          .concat(' bg-white')
          .concat(' rounded-full shadow-md')
          .concat(' border border-zinc-200')}
      >
        <ReactSVG
          src={SvgIcon.clock}
          className={'w-6 h-6'.concat(' fill-dark')}
        />
      </div>
    </React.Fragment>
  );
};

export const CanceledItem = function ({ ...props }) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-none'
          .concat(' items-center justify-center')
          .concat(' w-11 h-11')
          .concat(' bg-red-500')
          .concat(' rounded-full shadow-md')}
      >
        <ReactSVG
          src={SvgIcon.cross}
          className={'w-4 h-4'.concat(' fill-white')}
        />
      </div>
    </React.Fragment>
  );
};

export const CompletedItem = function ({ ...props }) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-none'
          .concat(' items-center justify-center')
          .concat(' w-11 h-11')
          .concat(' bg-green-500')
          .concat(' rounded-full shadow-md')}
      >
        <ReactSVG
          src={SvgIcon.check}
          className={'w-5 h-5'.concat(' fill-white')}
        />
      </div>
    </React.Fragment>
  );
};

export const WarningItem = function ({ ...props }) {
  return (
    <React.Fragment>
      <div
        className={'flex flex-none'
          .concat(' items-center justify-center')
          .concat(' w-11 h-11')
          .concat(' bg-orange-500')
          .concat(' rounded-full shadow-md')}
      >
        <ReactSVG
          src={SvgIcon['exclamation-sr']}
          className={'w-5 h-5'.concat(' fill-white')}
        />
      </div>
    </React.Fragment>
  );
};
