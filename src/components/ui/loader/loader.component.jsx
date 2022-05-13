import ReactSpinnerDotLoader from 'react-spinners/DotLoader';
import ReactSpinnerClipLoader from 'react-spinners/ClipLoader';
import ReactSpinnerSyncLoader from 'react-spinners/SyncLoader';
import ReactSpinnerMoonLoader from 'react-spinners/MoonLoader';
import ReactSpinnerPulseLoader from 'react-spinners/PulseLoader';
import ReactSpinnerRingLoader from 'react-spinners/RingLoader';
import React from 'react';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import { isInteger } from '@/utils/commons/checkVariableType.utils';

export const DotLoader = function ({ color, size, loading, ...props }) {
  return (
    <React.Fragment>
      <ReactSpinnerDotLoader
        color={stringIsNotEmpty(color) ? color : '#0ea5e9'}
        size={isInteger(size) ? size : 35}
        loading={loading}
        {...props}
      />
    </React.Fragment>
  );
};

export const ClipLoader = function ({ color, size, loading, ...props }) {
  return (
    <React.Fragment>
      <ReactSpinnerClipLoader
        color={stringIsNotEmpty(color) ? color : '#0ea5e9'}
        size={isInteger(size) ? size : 35}
        speedMultiplier={0.5}
        loading={loading}
        {...props}
      />
    </React.Fragment>
  );
};

export const MoonLoader = function ({ color, size, loading, ...props }) {
  return (
    <React.Fragment>
      <ReactSpinnerMoonLoader
        color={stringIsNotEmpty(color) ? color : '#0ea5e9'}
        size={isInteger(size) ? size : 30}
        speedMultiplier={0.5}
        loading={loading}
        {...props}
      />
    </React.Fragment>
  );
};

export const RingLoader = function ({ color, size, loading, ...props }) {
  return (
    <React.Fragment>
      <ReactSpinnerRingLoader
        color={stringIsNotEmpty(color) ? color : '#0ea5e9'}
        size={isInteger(size) ? size : 35}
        loading={loading}
        {...props}
      />
    </React.Fragment>
  );
};

export const PulseLoader = function ({
  color,
  size,
  loading,
  margin,
  ...props
}) {
  return (
    <React.Fragment>
      <ReactSpinnerPulseLoader
        color={stringIsNotEmpty(color) ? color : '#0ea5e9'}
        size={isInteger(size) ? size : 8}
        margin={isInteger(margin) ? margin : 2.5}
        speedMultiplier={0.69}
        loading={loading}
        {...props}
      />
    </React.Fragment>
  );
};

export const SyncLoader = function ({
  color,
  size,
  loading,
  margin,
  ...props
}) {
  return (
    <React.Fragment>
      <ReactSpinnerSyncLoader
        color={stringIsNotEmpty(color) ? color : '#0ea5e9'}
        size={isInteger(size) ? size : 10}
        margin={isInteger(margin) ? margin : 2.5}
        speedMultiplier={0.69}
        loading={loading}
        {...props}
      />
    </React.Fragment>
  );
};
