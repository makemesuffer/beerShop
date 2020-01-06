import getSearchResult from "../../dataAccess/dataAccess";

const getBeerSuccess = response => ({
  type: "GET_BEER_SUCCESS",
  payload: response
});
const getBeerError = error => ({ type: "GET_BEER_ERROR", payload: error });

const getBeerList = () => async dispatch => {
  try {
    const response = await getSearchResult();
    dispatch(getBeerSuccess(response.data.slice(0, 9)));
  } catch (e) {
    dispatch(getBeerError(e));
  }
};

export default getBeerList;
