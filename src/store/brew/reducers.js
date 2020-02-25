import actionTypes from "./actionTypes";

const initialState = {
  beerNames: [],
  singleBeer: []
};

const brewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BEER_NAMES:
      return {
        ...state,
        beerNames: action.payload
      };
    case actionTypes.GET_BEER_BY_NAME:
      return {
        ...state,
        singleBeer: action.payload
      };
    default:
      return state;
  }
};

export default brewReducer;
