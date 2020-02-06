import actionTypes from "./actionTypes";

export const saveUserSession = response => ({
  type: actionTypes.SAVE_USER_SESSION,
  payload: response
});

export const exitUserSession = () => ({
  type: actionTypes.EXIT_USER_SESSION
});

export const hideLogout = () => ({
  type: actionTypes.HIDE_LOGOUT
});
