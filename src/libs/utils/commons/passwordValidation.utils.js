import XRegExp from 'xregexp';

const passwordValidation = function (password) {
  const pattern = XRegExp(
    `(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@\$%^&*-])(?=\\S+\$).{8,20}`
  );
  return pattern.test(password);
};

export default passwordValidation;

export const containUppercase = function (password) {
  const pattern = XRegExp(`^.*[A-Z]+.*$`);
  return pattern.test(password);
};

export const containLowercase = function (password) {
  const pattern = XRegExp(`^.*[a-z]+.*$`);
  return pattern.test(password);
};

export const containNumeric = function (password) {
  const pattern = XRegExp(`^.*[0-9].*$`);
  return pattern.test(password);
};

export const containSpecialChar = function (password) {
  const pattern = XRegExp(`^.*[#?!@$%^&*-]+.*$`);
  return pattern.test(password);
};

export const validLength = function (password) {
  const pattern = XRegExp(`^.{8,20}$`);
  return pattern.test(password);
};
