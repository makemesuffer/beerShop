import jwt_decode from "jwt-decode";

import actionTypes from "./actionTypes";
import { findUser } from "../../dataAccess/userRepository/helpers";
import { getSingleBeer } from "../../dataAccess/beerRepository/helpers";
import setAuthToken from "../../dataAccess/userRepository/setAuthToken";

const getFavoritesSuccess = response => ({
  type: actionTypes.GET_FAVORITES_SUCCESS,
  payload: response
});

export const saveUserSessionSuccess = response => ({
  type: actionTypes.SAVE_USER_SESSION_SUCCESS,
  payload: response
});

export const saveUserSession = data => dispatch => {
  console.log(data[0]);
  setAuthToken(data[0]);
  const decoded = jwt_decode(data[0]);
  if (data[1] === true) {
    localStorage.setItem("token", data[0]);
  }
  dispatch(saveUserSessionSuccess([decoded, data[1]]));
};

const exitUserSessionSuccess = () => ({
  type: actionTypes.EXIT_USER_SESSION_SUCCESS
});

export const exitUserSession = () => dispatch => {
  localStorage.removeItem("token");
  setAuthToken(false);
  dispatch(exitUserSessionSuccess());
};

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

const getForeignUserSuccess = response => ({
  type: actionTypes.GET_FOREIGN_USER_SUCCESS,
  payload: response
});

export const getForeignUser = id => async dispatch => {
  const response = await findUser(id);
  if (response.data.success === false) {
    dispatch(getUserError(response.data.error));
  } else {
    dispatch(getForeignUserSuccess(response.data));
  }
};

export const getFavorites = id => async dispatch => {
  const response = await getSingleBeer(id);
  dispatch(getFavoritesSuccess(response.data));
};

export const removeFavorite = response => ({
  type: actionTypes.REMOVE_FAVORITE_SUCCESS,
  payload: response
});
