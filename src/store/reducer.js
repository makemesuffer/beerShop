import { combineReducers } from "redux";

import beerReducer from "./beer/reducers";
import favoriteReducer from "./favorite/reducers";
import detailsReducer from "./details/reducers";
import userReducer from "./user/reducers";

const reducer = combineReducers({
  beer: beerReducer,
  favorites: favoriteReducer,
  details: detailsReducer,
  user: userReducer
});

export default reducer;
