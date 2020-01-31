import { getSingleBeer } from "../../dataAccess/beerRepository/helpers";
import actionTypes from "./actionTypes";

export const addFavorite = response => ({
  type: actionTypes.ADD_FAVORITE_SUCCESS,
  payload: response
});

export const removeFavorite = response => ({
  type: actionTypes.REMOVE_FAVORITE_SUCCESS,
  payload: response
});

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
