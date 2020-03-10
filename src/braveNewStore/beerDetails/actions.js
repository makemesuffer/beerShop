import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import { getSingleBeer } from "../../dataAccess/beerRepository/helpers";

const getBeerDetails = createAction(
  actionTypes.GET_BEER_DETAILS_SUCCESS,
  id => {
    return getSingleBeer(id);
  }
);

export default getBeerDetails;
