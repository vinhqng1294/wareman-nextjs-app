import XRegExp from 'xregexp';

const emailValidation = function (email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export default emailValidation;
