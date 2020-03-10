import { createReducer } from "@reduxjs/toolkit";
import actionTypes from "./actionTypes";
import baseReducer from "../base/baseReducer";

const userReducer = createReducer(
  {
    model: null,
    isBusy: false,
    error: null
  },
  {
    [actionTypes.SAVE_USER_SESSION_PENDING]: baseReducer.success,
    [actionTypes.SAVE_USER_SESSION_ERROR]: baseReducer.error,
    [actionTypes.SAVE_USER_SESSION_SUCCESS]: baseReducer.success,
    [actionTypes.HIDE_LOGOUT]: baseReducer.success,
    [actionTypes.LOGOUT_USER]: baseReducer.reset
  }
);

export default userReducer;
