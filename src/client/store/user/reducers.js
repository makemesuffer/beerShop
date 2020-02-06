import actionTypes from "./actionTypes";

const initialState = {
  user: {},
  isLogout: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_SESSION:
      return {
        ...state,
        user: action.payload
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
    default:
      return state;
  }
};

export default userReducer;
