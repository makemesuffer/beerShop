import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import {
  getListOfBeers,
  getSingleBeer
} from "../../dataAccess/beerRepository/helpers";

const getBeerDetails = createAction(
  actionTypes.GET_BEER_DETAILS,
  async (id, name) => {
    const response =
      id !== null
        ? await getSingleBeer(id)
        : await getListOfBeers(1, null, name);

    return response.data[0];
  }
);

export default getBeerDetails;
