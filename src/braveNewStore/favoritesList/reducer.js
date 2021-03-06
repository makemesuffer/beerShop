import { createReducer } from "@reduxjs/toolkit";
import actionTypes from "./actionTypes";
import baseReducer from "../base/baseReducer";

const favoritesReducer = createReducer(
  {
    items: [],
    isBusy: false,
    error: null
  },
  {
    [actionTypes.GET_FAVORITES_ERROR]: baseReducer.error,
    [actionTypes.GET_FAVORITES_PENDING]: baseReducer.pending,
    [actionTypes.GET_FAVORITES_SUCCESS]: baseReducer.success,
    [actionTypes.CHANGE_FAVORITES]: baseReducer.success
  }
);

export default favoritesReducer;
