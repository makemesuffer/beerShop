import { getSingleBeer } from "../../dataAccess/beerRepository/helpers";
import actionTypes from "./actionTypes";

export const getBeerDetailsPending = isBusy => ({
  type: actionTypes.GET_BEER_DETAILS_PENDING,
  payload: isBusy
});

const getBeerDetailsSuccess = response => ({
  type: actionTypes.GET_BEER_DETAILS_SUCCESS,
  payload: response
});

const getBeerDetailsError = error => ({
  type: actionTypes.GET_BEER_DETAILS_ERROR,
  payload: error
});

export const getBeerDetails = id => async dispatch => {
  try {
    const response = await getSingleBeer(id);
    dispatch(getBeerDetailsSuccess(response.data));
  } catch (e) {
    dispatch(getBeerDetailsError(e.response.data.message));
  }
};
