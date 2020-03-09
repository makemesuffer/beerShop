import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import { App, store } from "./App";
import theme from "./styles/theme";
import "./index.css";

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

// TODO: 7. умный импут(закончи со временным списком, просто можно получать фулл аррей в апи колл, а потом фильтрить его уже в компоненте уже по времени
// TODO: filtered by user preferences, grouped by date and ordered by rating
/*
 {
 today: {
 beerList
 }
 week: {
 beerList
 }
}
 */
