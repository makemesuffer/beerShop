const initialState = {
  beerList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BEER_SUCCESS":
      return {
        ...state,
        beerList: action.payload
      };
    case "GET_BEER_ERROR":
      return console.log(action.payload);
    default:
      return state;
  }
};

export default reducer;
