import { createReducer } from "@reduxjs/toolkit";
import actionTypes from "./actionTypes";
import baseReducer from "../base/baseReducer";

const beerDetailsReducer = createReducer(
  {
    model: null,
    isBusy: false,
    error: null
  },
  {
    [actionTypes.GET_BEER_DETAILS_ERROR]: baseReducer.error,
    [actionTypes.GET_BEER_DETAILS_PENDING]: baseReducer.pending,
    [actionTypes.GET_BEER_DETAILS_SUCCESS]: baseReducer.success
  }
);

export default beerDetailsReducer;
