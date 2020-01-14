const initialState = {
  favorites: [],
  favoritesBeers: []
};

const favoriteReducer = (state = initialState, action) => {
  let index;
  switch (action.type) {
    case "ADD_FAVORITE_SUCCESS":
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case "ADD_FAVORITE_ERROR":
      return console.log(action.payload);
    case "REMOVE_FAVORITE_SUCCESS":
      index = [...state.favorites].indexOf(action.payload);
      // FIXME don't mutate state
      state.favorites.splice(index, 1);
      state.favoritesBeers.splice(index, 1);
      return {
        ...state,
        favorites: [...state.favorites],
        favoritesBeers: [...state.favoritesBeers]
      };
    case "REMOVE_FAVORITE_ERROR":
      return console.log(action.payload);
    case "GET_FAVORITES_SUCCESS":
      return {
        ...state,
        favoritesBeers: [...state.favoritesBeers, ...action.payload]
      };
    case "GET_FAVORITES_ERROR":
      return console.log(action.payload);
    default:
      return state;
  }
};

export default favoriteReducer;
