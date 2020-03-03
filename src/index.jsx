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
// TODO: Чисти код
// TODO: добавь лоад баттон к вебсокету
// TODO: перепиши многие хелперы в экшионы редакса(оптимистик юай)
// TODO: пофикси ошибку с заходом на страницу
