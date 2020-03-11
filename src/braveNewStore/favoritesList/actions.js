import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import { getBeersById } from "../../dataAccess/beerRepository/helpers";

export const getFavorites = createAction(
  actionTypes.GET_FAVORITES,
  async payload => {
    const promises = await getBeersById(payload);
    const favorites = await Promise.all(promises);
    return favorites.map(elem => elem.data[0]);
  }
);

export const changeFavorites = createAction(actionTypes.CHANGE_FAVORITES);
