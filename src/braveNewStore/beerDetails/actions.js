import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import { getSingleBeer } from "../../dataAccess/beerRepository/helpers";

const getBeerDetails = createAction(actionTypes.GET_BEER_DETAILS, async id => {
  const response = await getSingleBeer(id);
  return response.data[0];
});

export default getBeerDetails;
