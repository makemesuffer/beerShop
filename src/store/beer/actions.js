import {
  getSearchResult,
  getScrollResult,
  getBeerByName,
  continueBeer,
  getBeerByFilters
} from "../../dataAccess/beerRepository/helpers";

import actionTypes from "./actionTypes";

const updateBeerSuccess = response => ({
  type: actionTypes.UPDATE_BEER_SUCCESS,
  payload: response
});

const getBeerSuccess = response => ({
  type: actionTypes.GET_BEER_SUCCESS,
  payload: response
});
const getBeerError = error => ({
  type: actionTypes.GET_BEER_ERROR,
  payload: error
});

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
  type: actionTypes.GET_BEER_NAME_SUCCESS,
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
  type: actionTypes.GET_VALUE_SUCCESS,
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
  type: actionTypes.CONTINUE_BEER_SUCCESS,
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

export const setBeerList = bool => ({
  type: actionTypes.SET_BEER_LIST,
  payload: bool
});

export const setFilters = bool => ({
  type: actionTypes.SET_FILTERS,
  payload: bool
});

const filterBeerSuccess = response => ({
  type: actionTypes.FILTER_BEER_SUCCESS,
  payload: response
});

export const filterBeer = (name, abv, ibu, ebc) => async dispatch => {
  try {
    const response = await getBeerByFilters(name, abv, ibu, ebc);
    dispatch(filterBeerSuccess(response.data));
  } catch (e) {
    console.log(e);
  }
};
