import actionTypes from "./actionTypes";

const initialState = {
  user: {},
  foreignUser: {},
  error: null,
  isLogout: false,
  isBusy: true,
  favoritesBeers: [],
  allowed: false,
  rememberMe: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_SESSION_SUCCESS:
      return {
        ...state,
        user: action.payload[0],
        rememberMe: action.payload[1],
        error: null,
        allowed: true
      };
    case actionTypes.SAVE_USER_SESSION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case actionTypes.EXIT_USER_SESSION_SUCCESS:
      return {
        ...state,
        user: {},
        isLogout: true,
        foreignUser: {},
        favoritesBeers: [],
        allowed: false,
        rememberMe: false
      };
    case actionTypes.HIDE_LOGOUT:
      return {
        ...state,
        isLogout: false
      };
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        isBusy: false,
        user: action.payload,
        error: null,
        favoritesBeers: [],
        allowed: true
      };
    case actionTypes.GET_USER_ERROR:
      return {
        ...state
      };
    case actionTypes.GET_FOREIGN_USER_SUCCESS:
      return {
        ...state,
        foreignUser: action.payload,
        favoritesBeers: [],
        allowed: false
      };
    case actionTypes.GET_FAVORITES_SUCCESS:
      return {
        ...state,
        favoritesBeers: [...state.favoritesBeers, ...action.payload]
      };
    case actionTypes.REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        favoritesBeers: state.favoritesBeers.filter(
          beer => beer.id !== action.payload
        )
      };
    default:
      return state;
  }
};

export default userReducer;
