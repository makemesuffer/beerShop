import React from "react";

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import jwt_decode from "jwt-decode";
import setAuthToken from "./dataAccess/userRepository/setAuthToken";
import reducer from "./store/reducer";
import Routes from "./routing/Routes";
import { exitUserSession, saveUserSessionSuccess } from "./store/user/actions";

export const store = createStore(reducer, applyMiddleware(thunk, logger));

if (sessionStorage.poken) {
  const { poken } = sessionStorage;
  setAuthToken(poken);
  const decoded = jwt_decode(poken);
  store.dispatch(saveUserSessionSuccess([decoded, false]));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(exitUserSession());
    window.location.href = "./login";
  }
}

if (localStorage.token) {
  const { token } = localStorage;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(saveUserSessionSuccess([decoded, true]));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(exitUserSession());
    window.location.href = "./login";
  }
}

export function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}
