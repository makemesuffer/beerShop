import { getSearchResult, getScrollResult } from "../../dataAccess/dataAccess";

const updateBeerSuccess = response => ({
  type: "UPDATE_BEER_SUCCESS",
  payload: response
});

const getBeerSuccess = response => ({
  type: "GET_BEER_SUCCESS",
  payload: response
});
const getBeerError = error => ({ type: "GET_BEER_ERROR", payload: error });

export const getBeerList = () => async dispatch => {
  try {
    const response = await getSearchResult();
    dispatch(getBeerSuccess(response.data)); // .slice(0, 9)
  } catch (e) {
    dispatch(getBeerError(e));
  }
};

export const continueBeerList = page => async dispatch => {
  try {
    const response = await getScrollResult(page);
    dispatch(updateBeerSuccess(response.data));
  } catch (e) {
    dispatch(getBeerError(e));
  }
};
