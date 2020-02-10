import actionTypes from "./actionTypes";
import { findUser } from "../../dataAccess/userRepository/helpers";

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

const getUserSuccess = response => ({
  type: actionTypes.GET_USER_SUCCESS,
  payload: response
});

const getUserError = error => ({
  type: actionTypes.GET_USER_ERROR,
  payload: error
});

export const getUser = id => async dispatch => {
  const response = await findUser(id);
  if (response.data.success === false) {
    dispatch(getUserError(response.data.error));
  } else {
    dispatch(getUserSuccess(response.data));
  }
};
