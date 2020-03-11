import { combineReducers } from "redux";
import beerList from "./beerList/reducer";
import searchValues from "./searchValues/reducer";
import beerDetails from "./beerDetails/reducer";
import userDetails from "./userDetails/reducer";
import favorites from "./favoritesList/reducer";
import otherUser from "./otherUsers/reducer";
import brewDetails from "./brewDetails/reducer";
import brewList from "./brewList/reducer";

// TODO: check

const rootReducer = combineReducers({
  beerList,
  searchValues,
  beerDetails,
  userDetails,
  favorites,
  otherUser,
  brewDetails,
  brewList
});

export default rootReducer;
