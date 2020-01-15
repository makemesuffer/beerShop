import { getSingleBeer } from "../../dataAccess/beerRepository/helpers";
import actionTypes from "./actionTypes";

const getBeerDetailsSuccess = response => ({
  type: actionTypes.GET_BEER_DETAILS_SUCCESS,
  payload: response
});

const getBeerDetails = id => async dispatch => {
  try {
    const response = await getSingleBeer(id);
    dispatch(getBeerDetailsSuccess(response.data));
  } catch (e) {
    console.log(e);
  }
};

export default getBeerDetails;
