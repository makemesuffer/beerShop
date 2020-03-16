import { createReducer } from "@reduxjs/toolkit";
import actionTypes from "./actionTypes";
import baseReducer from "../base/baseReducer";

const userReducer = createReducer(
  {
    model: null,
    isBusy: true,
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
    [actionTypes.LOGOUT_USER_ERROR]: baseReducer.error,
    [actionTypes.GET_USER_ERROR]: baseReducer.error,
    [actionTypes.GET_USER_PENDING]: baseReducer.pending,
    [actionTypes.GET_USER_SUCCESS]: baseReducer.success,
    [actionTypes.UPDATE_USER]: baseReducer.success,
    [actionTypes.CHANGE_PASSWORD_ERROR]: baseReducer.error,
    [actionTypes.CHANGE_PASSWORD_SUCCESS]: baseReducer.success
  }
);

export default userReducer;
