import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import * as serviceWorker from "./client/serviceWorker";

import App from "./client/App";
import theme from "./client/styles/theme";
import reducer from "./client/store/reducer";
import "./client/index.css";

const store = createStore(reducer, applyMiddleware(thunk, logger));

// TODO:  1 контейнер - 1 компонент

// TODO: List
// TODO: 1. Сделай норм оформление ошибок при регистрации/ввода паролы
// TODO: 2. Сделай функцию восстановления пароля по мылу, либо выдавай пароль, либо пусть сами меняют
// TODO: 3. Сделай страничку с юзером, чтобы юзер получался через Jsonwebtoken и не смогли нормально его хакнуть как говорится
// TODO: 4. Сделай на странице аплоуд/ремув изображений
// TODO: 5. Сделай чтобы у каждого юзера была своя коллекция пива, прообгейдив модель на наличие аррея айдишек пива

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
