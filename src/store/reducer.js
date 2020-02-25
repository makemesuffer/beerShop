import { combineReducers } from "redux";

import beerReducer from "./beer/reducers";
import detailsReducer from "./details/reducers";
import userReducer from "./user/reducers";
import brewReducer from "./brew/reducers";

const reducer = combineReducers({
  beer: beerReducer,
  details: detailsReducer,
  user: userReducer,
  brew: brewReducer
});

export default reducer;
