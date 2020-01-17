import { getSingleBeer } from "../../dataAccess/beerRepository/helpers";
import actionTypes from "./actionTypes";

export const setStatus = isBusy => ({
  type: actionTypes.SET_STATUS,
  payload: isBusy
});

const getBeerDetailsSuccess = response => ({
  type: actionTypes.GET_BEER_DETAILS_SUCCESS,
  payload: response
});

export const getBeerDetails = id => async dispatch => {
  try {
    // TODO: Засунь все в один обработчик
    const response = await getSingleBeer(id);
    dispatch(getBeerDetailsSuccess(response.data));
  } catch (e) {
    console.log(e);
  }
};
