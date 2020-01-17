import actionTypes from "./actionTypes";

const initialState = {
  beerList: [],
  value: "",
  hasMoreBeers: true,
  page: 2,
  showFilters: false,
  alcoholValue: 2,
  bitternessValue: 0,
  colorValue: 4
};

const beerReducer = (state = initialState, action) => {
  let show;
  let update;
  switch (action.type) {
    case actionTypes.GET_BEER_SUCCESS:
      show = state.value !== "";
      return {
        ...state,
        beerList: action.payload,
        page: 2,
        showFilters: show, // FIXME: Вынеси логику в контейнеры
        hasMoreBeers: true
      };
    case actionTypes.UPDATE_BEER_SUCCESS:
      update = action.payload.length !== 0;
      return {
        ...state,
        beerList: [...state.beerList, ...action.payload],
        page: state.page + 1,
        hasMoreBeers: update
      };
    case actionTypes.SET_FILTERS_VALUE:
      console.log(action.payload);
      return {
        ...state,
        alcoholValue: action.payload[0],
        bitternessValue: action.payload[1],
        colorValue: action.payload[2]
      };
    case actionTypes.SET_VALUE_SUCCESS:
      return {
        ...state,
        value: action.payload
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
    case actionTypes.GET_BEER_ERROR:
      return console.error(action.payload);
    default:
      return state;
  }
};

export default beerReducer;
