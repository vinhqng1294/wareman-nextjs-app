import { isArray, isPlainObject, isString } from './checkVariableType.utils';

export const stringIsNotEmpty = function (str) {
  return isString(str) && str?.length > 0;
};

export const jsonObjectIsNotEmpty = function (obj) {
  return isPlainObject(obj) && Object.keys(obj)?.length > 0;
};

export const arrayIsNotEmpty = function (arr) {
  return isArray(arr) && arr?.length > 0;
};

export const objectIsNotNull = function (obj) {
  return obj !== undefined && obj !== null;
};

export const objectIsNotEmpty = function (obj) {
  return objectIsNotNull(obj) && Object.keys(obj)?.length > 0;
};
