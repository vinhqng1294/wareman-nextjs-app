import { stringIsNotEmpty } from './validateNotEmpty.utils';

export const trimUUID = function (rawUUID) {
  if (!stringIsNotEmpty(rawUUID)) {
    return '';
  }
  return rawUUID.slice(0, rawUUID.indexOf('-', 0));
};
