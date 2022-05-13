import { stringIsNotEmpty } from './validateNotEmpty.utils';

export const makeFullName = function ({
  firstName,
  middleName = '',
  lastName,
}) {
  return ''
    .concat(stringIsNotEmpty(lastName) ? `${lastName}` : '')
    .concat(stringIsNotEmpty(middleName) ? ` ${middleName}` : '')
    .concat(stringIsNotEmpty(firstName) ? ` ${firstName}` : '');
};
