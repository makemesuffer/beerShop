import actionTypes from "./actionTypes";

const initialState = {
  thisBeer: [], // item rename!!!
  isBusy: true,
  error: null
};

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BEER_DETAILS_SUCCESS:
      return {
        ...state,
        thisBeer: action.payload
      };
    case actionTypes.SET_STATUS:
      return {
        ...state,
        isBusy: action.payload
      };
    default:
      return state;
  }
};

export default detailsReducer;
