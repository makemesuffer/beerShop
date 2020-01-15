import actionTypes from "./actionTypes";

const initialState = {
  thisBeer: []
};

const detailsReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_BEER_DETAILS_SUCCESS) {
    console.log(action.payload);
    return {
      ...state,
      thisBeer: action.payload
    };
  }
  return state;
};

export default detailsReducer;
