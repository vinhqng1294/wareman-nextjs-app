import lodash from 'lodash';
import { isString } from './checkVariableType.utils';

export const toCamelCase = function (str) {
  if (isString(str)) {
    return lodash.camelCase(str);
  } else {
    return str;
  }
};

export const toKebabCase = function (str) {
  if (isString(str)) {
    return lodash.kebabCase(str);
  } else {
    return str;
  }
};

export const toSnakeCase = function (str) {
  if (isString(str)) {
    return lodash.snakeCase(str);
  } else {
    return str;
  }
};

export const toHtmlStr = function (str) {
  if (isString(str)) {
    return lodash.escape(str);
  } else {
    return str;
  }
};

export const toStartCase = function (str) {
  if (isString(str)) {
    return lodash.startCase(str);
  } else {
    return str;
  }
};
