import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import { findUser } from "../../dataAccess/userRepository/helpers";

const getForeignUser = createAction(
  actionTypes.GET_FOREIGN_USER_SUCCESS,
  id => {
    return findUser(id);
  }
);

export default getForeignUser;
