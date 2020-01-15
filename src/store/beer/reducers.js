import actionTypes from "./actionTypes";

const initialState = {
  beerList: [],
  value: "",
  hasMoreBeers: true,
  page: 2,
  showFilters: false
};

const beerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BEER_SUCCESS:
      return {
        ...state,
        beerList: action.payload,
        page: 2,
        hasMoreBeers: true,
        showFilters: false
      };
    case actionTypes.UPDATE_BEER_SUCCESS:
      return {
        ...state,
        beerList: [...state.beerList, ...action.payload],
        page: state.page + 1
      };
    case actionTypes.GET_BEER_ERROR:
      return console.error(action.payload);
    case actionTypes.GET_BEER_NAME_SUCCESS:
      return {
        ...state,
        beerList: action.payload,
        hasMoreBeers: true,
        page: 2,
        showFilters: true
      };
    case actionTypes.GET_VALUE_SUCCESS:
      return {
        ...state,
        value: action.payload
      };
    case actionTypes.CONTINUE_BEER_SUCCESS:
      return {
        ...state,
        beerList: [...state.beerList, ...action.payload],
        page: state.page + 1
      };
    case actionTypes.SET_BEER_LIST:
      return {
        ...state,
        hasMoreBeers: action.payload
      };
    case actionTypes.SET_FILTERS:
      return {
        ...state,
        showFilters: action.payload
      };
    case actionTypes.FILTER_BEER_SUCCESS:
      return {
        ...state,
        beerList: action.payload
      };
    default:
      return state;
  }
};

export default beerReducer;
