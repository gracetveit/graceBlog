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

// Reducer
export default (state: Blog[] = [], action: action) => {
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs;
    case ADD_BLOG:
      return [...state, action.blog];
    default:
      return state;
  }
};
