import actionTypes from "./actionTypes";

const initialState = {
  beerNames: [],
  singleBeer: [],
  brewList: [],
  singleBrew: null
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
    case actionTypes.GET_BREWS_LIST:
      return {
        ...state,
        brewList: action.payload
      };
    case actionTypes.GET_BREW_BY_ID:
      return {
        ...state,
        singleBrew: action.payload
      };
    default:
      return state;
  }
};

export default brewReducer;
