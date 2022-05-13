import lodash from 'lodash';
import { isString } from './checkVariableType.utils';

export const parseInt = function (numStr) {
  return isString(numStr) && lodash.parseInt(numStr);
};

export const parseFloat = function (numStr) {
  return isString(numStr) && Number.parseFloat(numStr);
};

export const convertJsonToStr = function (jsonObj) {
  if (lodash.isObjectLike(jsonObj)) {
    return JSON.stringify(jsonObj);
  } else {
    return '{}';
  }
};

export const toJson = function (strObj) {
  if (isString(strObj)) {
    return JSON.parse(strObj);
  } else {
    return {};
  }
};
