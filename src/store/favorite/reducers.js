const initialState = {
  favorites: [],
  favoritesBeers: []
};

// TODO: action types blya zabil

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVORITE_SUCCESS":
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case "REMOVE_FAVORITE_SUCCESS":
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload),
        favoritesBeers: state.favoritesBeers.filter(
          beer => beer.id !== action.payload
        )
      };
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
