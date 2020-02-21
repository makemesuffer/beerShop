import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import jwt_decode from "jwt-decode";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import theme from "./styles/theme";
import reducer from "./store/reducer";
import "./index.css";
import { saveUserSessionSuccess, exitUserSession } from "./store/user/actions";
import setAuthToken from "./dataAccess/userRepository/setAuthToken";

const store = createStore(reducer, applyMiddleware(thunk, logger));

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

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// TODO: сделай вторую часть brew add page
// TODO: добавляй уже брюхи в дб

serviceWorker.unregister();
