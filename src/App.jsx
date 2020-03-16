import React from "react";

import Routes from "./routing/Routes";

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;

/*
if (sessionStorage.poken) {
  const { poken } = sessionStorage;
  setAuthToken(poken);
  const decoded = jwt_decode(poken);
  store.dispatch(checkStorage(decoded, false));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

if (localStorage.token) {
  const { token } = localStorage;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(checkStorage(decoded, false));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}
 */
