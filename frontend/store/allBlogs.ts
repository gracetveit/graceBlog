import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { action } from '.';

type Blog = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
};

// Constants
const SET_BLOGS = 'SET_BLOGS';

// Actions

const setBlogs = (blogs: Blog[]): action => {
  return {
    type: SET_BLOGS,
    blogs,
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

// Reducer
export default (state: Blog[], action: action) => {
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs;
    default:
      return state;
  }
};
