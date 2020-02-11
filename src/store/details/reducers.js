import actionTypes from "./actionTypes";

const initialState = {
  item: [],
  isBusy: true,
  error: null
};

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BEER_DETAILS_SUCCESS:
      return {
        ...state,
        item: action.payload
      };
    case actionTypes.GET_BEER_DETAILS_PENDING:
      return {
        ...state,
        isBusy: action.payload,
        item: []
      };
    case actionTypes.GET_BEER_DETAILS_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default detailsReducer;
