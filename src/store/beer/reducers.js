const initialState = {
  beerList: [],
  value: ""
};

const beerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BEER_SUCCESS":
      return {
        ...state,
        beerList: action.payload
      };
    case "UPDATE_BEER_SUCCESS":
      return {
        ...state,
        beerList: [...state.beerList, ...action.payload]
      };
    case "GET_BEER_ERROR":
      // FIXME add an error to state & display error
      return console.error(action.payload);
    case "GET_BEER_NAME_SUCCESS":
      return {
        ...state,
        beerList: action.payload
      };
    case "GET_VALUE_SUCCESS":
      return {
        ...state,
        value: action.payload
      };
    case "CONTINUE_BEER_SUCCESS":
      return {
        ...state,
        beerList: [...state.beerList, ...action.payload]
      };
    default:
      return state;
  }
};

export default beerReducer;
