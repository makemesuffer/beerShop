import { createReducer } from "@reduxjs/toolkit";
import actionTypes from "./actionTypes";
import baseReducer from "../base/baseReducer";

const searchReducer = createReducer(
  {
    model: {},
    isBusy: false,
    error: null
  },
  {
    [actionTypes.SET_SCROLL]: baseReducer.success,
    [actionTypes.SET_PARAMS]: baseReducer.success,
    [actionTypes.SET_FILTERS]: baseReducer.success,
    [actionTypes.SET_VALUE]: baseReducer.success
  }
);

export default searchReducer;
