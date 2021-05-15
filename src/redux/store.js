import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import logger from "redux-logger";

export default function configureStore() {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
  }

  return createStore(rootReducer, applyMiddleware(...middlewares));
}
