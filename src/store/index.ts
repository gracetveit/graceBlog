import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import allBlogs from "./allBlogs";
import singleBlog from "./singleBlog";
import auth from "./auth";

const reducers = combineReducers({ allBlogs, singleBlog, auth });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducers, middleware);

export type RootState = ReturnType<typeof store.getState>;

export default store;
