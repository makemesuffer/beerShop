const initialState = {
  favorites: [],
  favoritesBeers: []
};

const favoriteReducer = (state = initialState, action) => {
  let ids;
  let beers;
  switch (action.type) {
    case "ADD_FAVORITE_SUCCESS":
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case "ADD_FAVORITE_ERROR":
      return console.log(action.payload);
    case "REMOVE_FAVORITE_SUCCESS":
      ids = state.favorites.filter(id => id !== action.payload);
      beers = state.favoritesBeers.filter(beer => beer.id !== action.payload);
      return {
        ...state,
        favorites: ids,
        favoritesBeers: beers
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
