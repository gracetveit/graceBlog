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

interface clientBlog extends Blog {
  date: string;
}

// Thunks
export const fetchBlogs = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/blogs");
    const blogs = data.map((blog: Blog) => ({
      ...blog,
      date: (blog.createdAt as unknown as string).split("T")[0],
    }));
    dispatch(setBlogs(blogs));
  } catch (error) {
    console.error(error);
  }
};
// Reducer
export default (state: clientBlog[] = [], action): clientBlog[] => {
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs;
    default:
      return state;
  }
};
