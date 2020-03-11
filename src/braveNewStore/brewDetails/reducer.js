import { createReducer } from "@reduxjs/toolkit";
import actionTypes from "./actionTypes";
import baseReducer from "../base/baseReducer";

const brewDetailsReducer = createReducer(
  {
    model: null,
    isBusy: false,
    error: null
  },
  {
    [actionTypes.GET_BREW_ERROR]: baseReducer.error,
    [actionTypes.GET_BREW_PENDING]: baseReducer.pending,
    [actionTypes.GET_BREW_SUCCESS]: baseReducer.success
  }
);

export default brewDetailsReducer;
