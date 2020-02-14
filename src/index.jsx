import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import theme from "./styles/theme";
import reducer from "./store/reducer";
import "./index.css";
import { saveUserSessionSuccess } from "./store/user/actions";

const store = createStore(reducer, applyMiddleware(thunk, logger));

if (localStorage.user) {
  const user = JSON.parse(localStorage.user);
  store.dispatch(saveUserSessionSuccess([user, true]));
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

serviceWorker.unregister();
