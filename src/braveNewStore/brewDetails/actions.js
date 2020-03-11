import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import { findSingleBrew } from "../../dataAccess/brewRepository/helpers";

const getBrewDetails = createAction(actionTypes.GET_BREW_SUCCESS, id => {
  return findSingleBrew(id);
});

export default getBrewDetails;
