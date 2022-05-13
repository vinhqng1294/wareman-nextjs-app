import { stringIsNotEmpty } from './validateNotEmpty.utils';

const URL_ACTION = {
  newTab: '_blank',
  currentTab: '_self',
};

const openUrl = function (url, action) {
  window.open(url, action);
};

export const redirectTo = function (url, isNewTab = false) {
  if (stringIsNotEmpty(url)) {
    openUrl(url, isNewTab ? URL_ACTION.newTab : URL_ACTION.currentTab);
  }
};
