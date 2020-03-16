import { createReducer } from "@reduxjs/toolkit";
import actionTypes from "./actionTypes";
import baseReducer from "../base/baseReducer";

const brewListReducer = createReducer(
  {
    items: [],
    isBusy: false,
    error: null
  },
  {
    [actionTypes.GET_BREWS_ERROR]: baseReducer.error,
    [actionTypes.GET_BREWS_PENDING]: baseReducer.pending,
    [actionTypes.GET_BREWS_SUCCESS]: baseReducer.success,
    [actionTypes.CHANGE_RATING_ERROR]: baseReducer.error,
    [actionTypes.CHANGE_RATING_SUCCESS]: baseReducer.success,
    [actionTypes.GET_FILTERED_BREWS_PENDING]: baseReducer.pending,
    [actionTypes.GET_FILTERED_BREWS_SUCCESS]: baseReducer.success
  }
);

export default brewListReducer;
