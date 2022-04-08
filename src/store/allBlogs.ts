import { Blog } from ".prisma/client";
import axios from "axios";

// Constants
const SET_BLOGS = "SET_BLOGS";
const REMOVE_BLOGS = "REMOVE_BLOGS";

// Actions
const setBlogs = (blogs) => ({
  type: SET_BLOGS,
  blogs,
});

const removeBlogs = (slug) => ({
  type: REMOVE_BLOGS,
  slug,
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

export const deleteBlogs = (blog: Blog) => async (dispatch) => {
  const date = (blog.createdAt as unknown as string).split("T")[0];
  try {
    await axios.delete(`/api/blogs/${date}/${blog.slug}`);
    dispatch(removeBlogs(blog.slug));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default (state: clientBlog[] = [], action): clientBlog[] => {
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs;
    case REMOVE_BLOGS:
      return state.map((blog) => {
        if (blog.slug !== action.slug) {
          return blog;
        }
      });
    default:
      return state;
  }
};
