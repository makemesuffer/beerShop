import actionTypes from "./actionTypes";

const initialState = {
  user: null,
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
      }; // nice
    case actionTypes.SAVE_USER_SESSION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    } // nice
    case actionTypes.EXIT_USER_SESSION_SUCCESS:
      return {
        ...state,
        user: null,
        isLogout: true,
        foreignUser: {},
        favoritesBeers: [],
        allowed: false,
        rememberMe: false
      }; // nice
    case actionTypes.HIDE_LOGOUT:
      return {
        ...state,
        isLogout: false
      }; // nice
    case actionTypes.GET_FAVORITES_SUCCESS:
      return {
        ...state,
        favoritesBeers: action.payload
      }; // nice
    default:
      return state;
  }
};

export default userReducer;
