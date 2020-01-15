import { getSingleBeer } from "../../dataAccess/beerRepository/helpers";
import actionTypes from "./actionTypes";

const addFavoriteSuccess = response => ({
  type: actionTypes.ADD_FAVORITE_SUCCESS,
  payload: response
});

const addFavoriteError = error => ({
  type: actionTypes.ADD_FAVORITE_ERROR,
  payload: error
});

export const addFavorite = beer => dispatch => {
  try {
    dispatch(addFavoriteSuccess(beer));
  } catch (e) {
    dispatch(addFavoriteError(e));
  }
};

const removeFavoriteSuccess = response => ({
  type: actionTypes.REMOVE_FAVORITE_SUCCESS,
  payload: response
});

const removeFavoriteError = error => ({
  type: actionTypes.REMOVE_FAVORITE_ERROR,
  payload: error
});

export const removeFavorite = beer => dispatch => {
  try {
    dispatch(removeFavoriteSuccess(beer));
  } catch (e) {
    dispatch(removeFavoriteError(e));
  }
};

const getFavoritesSuccess = response => ({
  type: actionTypes.GET_FAVORITES_SUCCESS,
  payload: response
});

const getFavoritesError = error => ({
  type: actionTypes.GET_FAVORITES_ERROR,
  payload: error
});

export const getFavorites = id => async dispatch => {
  try {
    const response = await getSingleBeer(id);
    dispatch(getFavoritesSuccess(response.data));
  } catch (e) {
    dispatch(getFavoritesError(e));
  }
};
