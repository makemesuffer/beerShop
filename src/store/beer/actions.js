import getSearchResult from "../../dataAccess/dataAccess";

const getBeerSuccess = response => ({
  type: "GET_BEER_SUCCESS",
  payload: response
});
const getBeerError = error => ({ type: "GET_BEER_ERROR", payload: error });

const testingApi = () => async dispatch => {
  try {
    const response = await getSearchResult();
    console.log(response.data.slice(0, 9));
    dispatch(getBeerSuccess(response.data.slice(0, 9)));
  } catch (e) {
    dispatch(getBeerError(e));
  }
};

export default testingApi;
