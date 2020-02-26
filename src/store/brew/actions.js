import { getListOfBeers } from "../../dataAccess/beerRepository/helpers";
import { findBrews } from "../../dataAccess/brewRepository/helpers";
import actionTypes from "./actionTypes";

const getBeerNamesSuccess = response => ({
  type: actionTypes.GET_BEER_NAMES,
  payload: response
});

export const getBeerNames = name => async dispatch => {
  const response = await getListOfBeers(50, null, name);
  const result = response.data.map(elem => {
    return { id: elem.id, name: elem.name };
  });
  dispatch(getBeerNamesSuccess(result));
};

const getBeerByNameSuccess = response => ({
  type: actionTypes.GET_BEER_BY_NAME,
  payload: response
});

export const getBeerByName = name => async dispatch => {
  const response = await getListOfBeers(1, null, name);
  dispatch(getBeerByNameSuccess(response.data));
};

const getBrewListSuccess = response => ({
  type: actionTypes.GET_BREWS_LIST,
  payload: response
});

export const getBrewList = () => async dispatch => {
  const response = await findBrews();
  dispatch(getBrewListSuccess(response.data));
};
