import axios from 'axios';
import Cookies from 'js-cookie';
import { Dispatch } from 'redux';
import { action } from '.';

export type Blog = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  slug: string;
};

// Constants
const SET_BLOGS = 'SET_BLOGS';
const ADD_BLOG = 'ADD_BLOG';
const REPLACE_BLOG = 'REPLACE_BLOG';

// Actions

const setBlogs = (blogs: Blog[]): action => {
  return {
    type: SET_BLOGS,
    blogs,
  };
};

const addBlog = (blog: Blog): action => {
  return {
    type: ADD_BLOG,
    blog,
  };
};

const replaceBlog = (blog: Blog): action => {
  return {
    type: REPLACE_BLOG,
    blog,
  };
};

export const fetchBlogs = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('/api/blogs');
    dispatch(setBlogs(data));
  } catch (error) {
    console.error(error);
  }
};

export const createBlog = (blog: Blog) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.post('/api/blogs', {
      Headers: { authorization: Cookies.get('token') },
      blog,
    });
    dispatch(addBlog(data));
  } catch (error) {
    console.error(error);
  }
};

export const updateBlog = (blog: Blog) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.put(`/api/blogs/${blog.id}`, {
      Headers: { authorization: Cookies.get('token') },
      blog,
    });
    dispatch(replaceBlog(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default (state: Blog[] = [], action: action) => {
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs;
    case ADD_BLOG:
      return [...state, action.blog];
    case REPLACE_BLOG:
      return state.reduce((acc, cur) => {
        if (cur.id === action.blog.id) {
          return [...acc, action.blog];
        } else {
          return [...acc, cur];
        }
      }, new Array());
    default:
      return state;
  }
};
