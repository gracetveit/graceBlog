import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import allBlogs from "./allBlogs";

const reducers = combineReducers({ allBlogs });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducers, middleware);

console.log(store.getState());

export type RootState = ReturnType<typeof store.getState>;

export default store;
