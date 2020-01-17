import { getListOfBeers } from "../../dataAccess/beerRepository/helpers";

import actionTypes from "./actionTypes";

// SETTERS

export const setValueSuccess = response => ({
  type: actionTypes.SET_VALUE_SUCCESS,
  payload: response
});

export const setBeerList = bool => ({
  type: actionTypes.SET_BEER_LIST,
  payload: bool
});

export const setFilters = bool => ({
  type: actionTypes.SET_FILTERS,
  payload: bool
});

export const setFiltersValue = array => ({
  type: actionTypes.SET_FILTERS_VALUE,
  payload: array
});

// GETTERS

const getBeerError = error => ({
  type: actionTypes.GET_BEER_ERROR,
  payload: error
});

const getBeerSuccess = response => ({
  type: actionTypes.GET_BEER_SUCCESS,
  payload: response
});

const updateBeerSuccess = response => ({
  type: actionTypes.UPDATE_BEER_SUCCESS,
  payload: response
});

export const getBeer = (page, name, abv, ibu, ebc) => async dispatch => {
  try {
    let response;
    if (name === "") response = await getListOfBeers(page);
    else response = await getListOfBeers(page, name, abv, ibu, ebc);
    dispatch(getBeerSuccess(response.data));
  } catch (e) {
    dispatch(getBeerError(e));
  }
};

export const continueBeerName = (
  name,
  page,
  abv,
  ibu,
  ebc
) => async dispatch => {
  try {
    const response = await getListOfBeers(page, name, abv, ibu, ebc);
    dispatch(updateBeerSuccess(response.data));
  } catch (e) {
    dispatch(getBeerError(e));
  }
};
