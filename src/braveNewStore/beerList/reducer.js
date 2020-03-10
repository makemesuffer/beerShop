import { createReducer } from "@reduxjs/toolkit";
import actionTypes from "./actionTypes";
import baseReducer from "../base/baseReducer";

const beerReducer = createReducer(
  {
    items: [],
    isBusy: false,
    error: null
  },
  {
    [actionTypes.GET_BEER_PENDING]: baseReducer.pending,
    [actionTypes.GET_BEER_ERROR]: baseReducer.error,
    [actionTypes.GET_BEER_SUCCESS]: baseReducer.success,
    [actionTypes.UPDATE_BEER]: baseReducer.continueArray
  }
);

export default beerReducer;

/*
beerList: {
beerList: [],
page: 1,
hasMoreBeers: true/false
}
  [actionTypes.SET_VALUE]: baseReducer.success,
    [actionTypes.SET_FILTERS]: baseReducer.success,
    [actionTypes.SET_SCROLL]: baseReducer.success,
    [actionTypes.SET_PARAMS]: baseReducer.success
 */
