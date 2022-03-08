import { Dispatch } from 'redux';
import axios from 'axios';
import { Blog } from './allBlogs';
import { action } from '.';

// Constants
const SET_BLOG = 'SET_BLOG';

// Actions
const setBlog = (blog: Blog): action => {
  return {
    type: SET_BLOG,
    blog,
  };
};

export const fetchBlog = (slug: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(`/api/blogs/${slug}`);
    dispatch(setBlog(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchMostRecent = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('/api/blogs/most-recent');
    dispatch(setBlog(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducers
export default (state: Partial<Blog> = {}, action: action) => {
  switch (action.type) {
    case SET_BLOG:
      return action.blog;
    default:
      return state;
  }
};
