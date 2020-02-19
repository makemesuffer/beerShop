import jwt_decode from "jwt-decode";

import actionTypes from "./actionTypes";
import {
  createUser,
  findUser,
  loginUser
} from "../../dataAccess/userRepository/helpers";
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

export const saveUserSessionError = error => ({
  type: actionTypes.SAVE_USER_SESSION_ERROR,
  payload: error
});

export const saveUserSession = data => async dispatch => {
  try {
    const { payload, rememberMe } = data;
    const response = await loginUser(payload);
    setAuthToken(response.data.accessTOKEN);
    const decoded = jwt_decode(response.data.accessTOKEN);
    if (rememberMe === true) {
      localStorage.setItem("token", response.data.accessTOKEN);
    }
    dispatch(saveUserSessionSuccess([decoded, rememberMe]));
  } catch (err) {
    dispatch(saveUserSessionError(err.response.data.error));
  }
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

export const userCreate = payload => async dispatch => {
  try {
    await createUser(payload);
  } catch (err) {
    dispatch(saveUserSessionError(err.response.data.error));
  }
};
