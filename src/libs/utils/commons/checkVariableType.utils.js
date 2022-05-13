import lodash from 'lodash';

export const isString = function (value) {
  return lodash.isString(value);
};

export const isInteger = function (value) {
  return lodash.isInteger(value);
};

export const isDecimal = function (value) {
  return (
    typeof value === 'number' &&
    !Number.isNaN(value) &&
    !Number.isInteger(value)
  );
};

export const isBoolean = function (value) {
  return typeof value === 'boolean';
};

export const isFunction = function (value) {
  return typeof value === 'function';
};

export const isNotNullOrUndefined = function (value) {
  return value !== undefined || value !== null;
};

export const isPlainObject = function (value) {
  return lodash.isPlainObject(value);
};

export const isArray = function (value) {
  return lodash.isArray(value);
};

export const isObject = function (value) {
  return typeof value === 'object';
};
