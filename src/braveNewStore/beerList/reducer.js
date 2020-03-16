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
    [actionTypes.UPDATE_BEER_ERROR]: baseReducer.error,
    [actionTypes.UPDATE_BEER_SUCCESS]: baseReducer.continueArray,
    [actionTypes.GET_BEER_NAMES_PENDING]: baseReducer.pending,
    [actionTypes.GET_BEER_NAMES_SUCCESS]: baseReducer.success
  }
);

export default beerReducer;
