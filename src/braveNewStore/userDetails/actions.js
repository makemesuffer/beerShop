import jwt_decode from "jwt-decode";
import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import {
  loginUser,
  createUser,
  findUser,
  changePassword
} from "../../dataAccess/userRepository/helpers";
import setAuthToken from "../../dataAccess/userRepository/setAuthToken";

export const saveUserSession = createAction(
  actionTypes.SAVE_USER_SESSION,
  async data => {
    const { payload, rememberMe } = data;
    const response = await loginUser(payload);
    setAuthToken(response.data.accessTOKEN);
    const decoded = jwt_decode(response.data.accessTOKEN);
    decoded.rememberMe = rememberMe;
    if (rememberMe === true) {
      localStorage.setItem("token", response.data.accessTOKEN);
    } else {
      sessionStorage.setItem("poken", response.data.accessTOKEN);
    }
    return decoded;
  }
);

export const userCreate = createAction(actionTypes.CREATE_USER, payload => {
  return createUser(payload);
});

export const checkStorage = createAction(
  actionTypes.GET_USER,
  async (user, rememberMe) => {
    const response = await findUser(user.id);
    setAuthToken(response.data.accessTOKEN);
    const decoded = jwt_decode(response.data.accessTOKEN);
    if (rememberMe === true) {
      localStorage.setItem("token", response.data.accessTOKEN);
    } else {
      sessionStorage.setItem("poken", response.data.accessTOKEN);
    }
    return decoded;
  }
);

export const updateUser = createAction(actionTypes.UPDATE_USER);

export const logoutUser = createAction(actionTypes.LOGOUT_USER);

export const changeUserPassword = createAction(
  actionTypes.CHANGE_PASSWORD,
  async payload => {
    const result = await changePassword(payload);
    console.log(result.data);
    return result.data;
  }
);
