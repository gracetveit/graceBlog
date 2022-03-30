import axios from "axios";

import { Blog } from ".prisma/client";
// Constants
const SET_BLOG = "SET_BLOG";
// Actions
const setBlog = (blog) => ({
  type: SET_BLOG,
  blog,
});
// Thunks
export const fetchBlog = (date, slug) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/blogs/${date}/${slug}`);
    dispatch(setBlog(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default (state: Blog | {} = {}, action): Blog | {} => {
  switch (action.type) {
    case SET_BLOG:
      return action.blog;
    default:
      return state;
  }
};
