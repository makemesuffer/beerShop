import { combineReducers } from "redux";
import beerList from "./beerList/reducer";
import searchValues from "./searchValues/reducer";
import beerDetails from "./beerDetails/reducer";
import userDetails from "./userDetails/reducer";
import favoritesReducer from "./favoritesList/reducer";

const rootReducer = combineReducers({
  beerList,
  searchValues,
  beerDetails,
  userDetails,
  favoritesReducer
});

export default rootReducer;
