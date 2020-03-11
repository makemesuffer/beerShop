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
    [actionTypes.SAVE_USER_SESSION_PENDING]: baseReducer.pending,
    [actionTypes.SAVE_USER_SESSION_ERROR]: baseReducer.error,
    [actionTypes.SAVE_USER_SESSION_SUCCESS]: baseReducer.success,
    [actionTypes.CREATE_USER_ERROR]: baseReducer.error,
    [actionTypes.CREATE_USER_PENDING]: baseReducer.pending,
    [actionTypes.HIDE_LOGOUT]: baseReducer.success,
    [actionTypes.LOGOUT_USER]: baseReducer.reset,
    [actionTypes.LOGOUT_USER_ERROR]: baseReducer.error
  }
);

export default userReducer;
