import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import { getListOfBeers } from "../../dataAccess/beerRepository/helpers";

export const getBeerList = createAction(actionTypes.GET_BEER, async payload => {
  const { perPage, page, name, abv, ibu, ebc } = payload;
  const response = await getListOfBeers(perPage, page, name, abv, ibu, ebc);
  return response.data;
});

export const continueBeerList = createAction(
  actionTypes.UPDATE_BEER,
  async payload => {
    const { perPage, page, name, abv, ibu, ebc } = payload;
    const response = await getListOfBeers(perPage, page, name, abv, ibu, ebc);
    return response.data;
  }
);

export const getBeerNames = createAction(
  actionTypes.GET_BEER_NAMES,
  async name => {
    const response = await getListOfBeers(50, null, name);
    return response.data.map(elem => {
      return { id: elem.id, name: elem.name };
    });
  }
);
