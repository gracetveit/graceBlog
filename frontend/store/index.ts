import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import allBlogs, { Blog } from './allBlogs';
import singleBlog from './singleBlog';

const reducer = combineReducers({
  allBlogs,
  singleBlog,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export type action = {
  type: string;
  [key: string]: any;
};

export type RootState = {
  allBlogs: Blog[];
  singleBlog: Blog;
};

export default store;