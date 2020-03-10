import jwt_decode from "jwt-decode";
import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import { loginUser } from "../../dataAccess/userRepository/helpers";
import setAuthToken from "../../dataAccess/userRepository/setAuthToken";

const saveUserSession = createAction(
  actionTypes.SAVE_USER_SESSION_SUCCESS,
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

export default saveUserSession;

// Спорный момент конечно

// TODO: фавориты в отдельном, не делай лишнии апи коллы
/*
export const saveUserProgress = createAction(
  actionTypes.SAVE_USER_SESSION_SUCCESS,
  async payload => {
    const { id, rememberMe } = payload;
    const response = await findUser(id);
    setAuthToken(response.data.accessTOKEN);
    const decoded = jwt_decode(response.data.accessTOKEN);
    if (rememberMe === true) {
      localStorage.setItem("token", response.data.accessTOKEN);
    } else {
      sessionStorage.setItem("poken", response.data.accessTOKEN);
    }
  }
);
 */
