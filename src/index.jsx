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

// TODO: Добавь логики нормальной к этим импутам для сортировки
// TODO: пусть при фильтре приходят пивас так {today: [{beer1}, {beer2}], week: и тд },
