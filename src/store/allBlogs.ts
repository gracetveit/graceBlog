import { Blog } from ".prisma/client";
import axios from "axios";

// Constants
const SET_BLOGS = "SET_BLOGS";

// Actions
const setBlogs = (blogs) => ({
  type: SET_BLOGS,
  blogs,
});

import { Dispatch } from "react";

// Thunks
export const fetchBlogs = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/blogs");
    dispatch(setBlogs(data));
  } catch (error) {
    console.error(error);
  }
};
// Reducer
export default (state: Blog[] = [], action): Blog[] => {
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs;
    default:
      return state;
  }
};
