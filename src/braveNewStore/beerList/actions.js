import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import { getListOfBeers } from "../../dataAccess/beerRepository/helpers";

export const getBeerList = createAction(
  actionTypes.GET_BEER_SUCCESS,
  payload => {
    // TODO:  test name = null check blyat ??
    const { perPage, page, name, abv, ibu, ebc } = payload;
    return getListOfBeers(perPage, page, name, abv, ibu, ebc);
  }
);

export const continueBeerList = createAction(
  actionTypes.UPDATE_BEER,
  payload => {
    const { perPage, page, name, abv, ibu, ebc } = payload;
    return getListOfBeers(perPage, page, name, abv, ibu, ebc);
  }
);
