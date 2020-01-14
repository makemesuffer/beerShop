import getSingleBeer from "../../dataAccess/getExactBeer";

// FIXME move types to constants
const addFavoriteSuccess = response => ({
  type: "ADD_FAVORITE_SUCCESS",
  payload: response
});

const addFavoriteError = error => ({
  type: "ADD_FAVORITE_ERROR",
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
  type: "REMOVE_FAVORITE_SUCCESS",
  payload: response
});

const removeFavoriteError = error => ({
  type: "REMOVE_FAVORITE_ERROR",
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
  type: "GET_FAVORITES_SUCCESS",
  payload: response
});

const getFavoritesError = error => ({
  type: "GET_FAVORITES_ERROR",
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
