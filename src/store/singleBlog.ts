import axios from "axios";

import { Blog } from ".prisma/client";
import Cookies from "js-cookie";
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
    dispatch(setBlog(error));
  }
};

export const createBlog = (blog: Partial<Blog>) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: "/api/blogs",
      data: blog,
      headers: {
        authorization: Cookies.get("TOKEN"),
      },
    });
    dispatch(setBlog(data));
  } catch (error) {
    console.error(error);
    dispatch(setBlog(error));
  }
};

// Reducer
export default (state: Partial<Blog> = {}, action): Partial<Blog> => {
  switch (action.type) {
    case SET_BLOG:
      return action.blog;
    default:
      return state;
  }
};
