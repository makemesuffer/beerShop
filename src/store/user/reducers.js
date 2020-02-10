import actionTypes from "./actionTypes";

const initialState = {
  user: {},
  error: null,
  isLogout: false,
  isBusy: true
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_SESSION:
      return {
        ...state,
        user: action.payload,
        error: null
      };
    case actionTypes.EXIT_USER_SESSION:
      return {
        ...state,
        user: {},
        isLogout: true
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
        error: null
      };
    case actionTypes.GET_USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
