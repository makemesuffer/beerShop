const initialState = {
  favorites: []
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
      state.favorites.splice(index, 1);
      return {
        ...state,
        favorites: [...state.favorites]
      };
    case "REMOVE_FAVORITE_ERROR":
      return console.log(action.payload);
    default:
      return state;
  }
};

export default favoriteReducer;
