import { createReducer } from "@reduxjs/toolkit";

import actionTypes from "./actionTypes";
import baseReducer from "../base/baseReducer";

const otherUserReducer = createReducer(
  {
    model: null,
    isBusy: false,
    error: null
  },
  {
    [actionTypes.GET_FOREIGN_USER_ERROR]: baseReducer.error,
    [actionTypes.GET_FOREIGN_USER_PENDING]: baseReducer.pending,
    [actionTypes.GET_FOREIGN_USER_SUCCESS]: baseReducer.success
  }
);

export default otherUserReducer;
