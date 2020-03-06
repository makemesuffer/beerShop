import actionTypes from "./actionTypes";

const initialState = {
  beerNames: [],
  singleBeer: null,
  brewList: [],
  singleBrew: null,
  rating: 0,
  error: null,
  id: null
};

const brewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BEER_NAMES:
      return {
        ...state,
        beerNames: action.payload,
        error: null
      };
    case actionTypes.GET_BEER_BY_NAME:
      return {
        ...state,
        singleBeer: action.payload,
        error: null
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
    case actionTypes.GET_RATING_CHANGE:
      return {
        ...state,
        rating: action.payload,
        error: null
      };
    case actionTypes.GET_ERROR:
      return {
        ...state,
        error: action.payload.message,
        rating: action.payload.rating,
        id: action.payload.id
      };
    case actionTypes.ADD_DELETE_COMMENT:
      return {
        ...state,
        singleBrew: action.payload
      };
    case actionTypes.FILTER_BREWS_SUCCESS:
      return {
        ...state,
        brewList: action.payload
      };
    default:
      return state;
  }
};

export default brewReducer;
