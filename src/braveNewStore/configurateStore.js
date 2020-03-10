import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

const configureStore = preLoadedState => {
  const promise = createPromise({
    promiseTypeSuffixes: ["PENDING", "SUCCESS", "ERROR"]
  });
  return createStore(
    rootReducer,
    preLoadedState,
    compose(applyMiddleware(...[thunk, promise], logger))
  );
};

export default configureStore;
