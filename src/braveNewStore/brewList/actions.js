import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import { findBrews } from "../../dataAccess/brewRepository/helpers";

const getBrewList = createAction(actionTypes.GET_BREWS_SUCCESS, () => {
  return findBrews();
});

export default getBrewList;
