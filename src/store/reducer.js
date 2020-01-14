import { combineReducers } from "redux";

import beerReducer from "./beer/reducers";
import favoriteReducer from "./favorite/reducers";

const reducer = combineReducers({
  beer: beerReducer,
  favorites: favoriteReducer
});

export default reducer;
