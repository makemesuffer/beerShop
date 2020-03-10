import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import { getBeersById } from "../../dataAccess/beerRepository/helpers";

const getFavorites = createAction(
  actionTypes.GET_FAVORITES_SUCCESS,
  async payload => {
    const promises = await getBeersById(payload);
    return Promise.all(promises);
  }
);

export default getFavorites;
