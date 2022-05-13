import { ActionTypes_Auth } from './auth.actionTypes';

export const Action_Auth = {
  LoginSuccess: function ({
    firstName,
    lastName,
    email,
    userId,
    permissions,
    ...props
  }) {
    return {
      type: ActionTypes_Auth.LoginSuccess,
      payload: { firstName, lastName, email, userId, permissions, props },
    };
  },
  SetAccessToken: function ({ accessToken }) {
    return {
      type: ActionTypes_Auth.SetAccessToken,
      payload: { accessToken },
    };
  },
  Logout: function () {
    return {
      type: ActionTypes_Auth.Logout,
      payload: {},
    };
  },
};
