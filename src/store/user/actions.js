import jwt_decode from "jwt-decode";

import actionTypes from "./actionTypes";
import { findUser } from "../../dataAccess/userRepository/helpers";
import setAuthToken from "../../dataAccess/userRepository/setAuthToken";
import { getBeersById } from "../../dataAccess/beerRepository/helpers";

export const saveUserSessionSuccess = response => ({
  type: actionTypes.SAVE_USER_SESSION_SUCCESS,
  payload: response
});

export const saveUserSessionError = error => ({
  type: actionTypes.SAVE_USER_SESSION_ERROR,
  payload: error
});

export const saveUserProgress = (user, rememberMe) => async dispatch => {
  const response = await findUser(user.id);
  setAuthToken(response.data.accessTOKEN);
  const decoded = jwt_decode(response.data.accessTOKEN);
  if (rememberMe === true) {
    localStorage.setItem("token", response.data.accessTOKEN);
  } else {
    sessionStorage.setItem("poken", response.data.accessTOKEN);
  }
  dispatch(saveUserSessionSuccess([decoded, rememberMe]));
};

const exitUserSessionSuccess = () => ({
  type: actionTypes.EXIT_USER_SESSION_SUCCESS
});

export const exitUserSession = () => dispatch => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("poken");
  setAuthToken(false);
  dispatch(exitUserSessionSuccess());
};

export const hideLogout = () => ({
  type: actionTypes.HIDE_LOGOUT
});

const getFavoritesSuccess = response => ({
  type: actionTypes.GET_FAVORITES_SUCCESS,
  payload: response
});

export const getFavoritesById = array => async dispatch => {
  const promises = await getBeersById(array);
  const response = await Promise.all(promises);
  dispatch(getFavoritesSuccess(response.map(elem => elem.data[0])));
};

// ПРи добавлении/удалении просто еще вызываю раз гетфаворитс чтобы опять по айди пройти
