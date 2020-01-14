import { getSearchResult, getScrollResult } from "../../dataAccess/getAllBeers";
import { getBeerByName, continueBeer } from "../../dataAccess/getBeerByName";
// TODO add isLoading state; + spinners

// FIXME Get details about single page beer

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

const getBeerNameSuccess = response => ({
  type: "GET_BEER_NAME_SUCCESS",
  payload: response
});

export const getBeerName = name => async dispatch => {
  try {
    const response = await getBeerByName(name);
    dispatch(getBeerNameSuccess(response.data));
  } catch (e) {
    console.log(e);
  }
};

const getValueSuccess = response => ({
  type: "GET_VALUE_SUCCESS",
  payload: response
});

export const getInputValue = value => dispatch => {
  try {
    dispatch(getValueSuccess(value));
  } catch (e) {
    console.log(e);
  }
};

const continueBeerSuccess = response => ({
  type: "CONTINUE_BEER_SUCCESS",
  payload: response
});

export const continueBeerName = (name, page) => async dispatch => {
  try {
    const response = await continueBeer(name, page);
    dispatch(continueBeerSuccess(response.data));
  } catch (e) {
    console.log(e);
  }
};
