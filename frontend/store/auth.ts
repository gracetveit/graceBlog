import { Dispatch } from 'redux';
import Cookies from 'js-cookie';
import { action } from '.';
import axios from 'axios';
// Constants

const SET_STATUS = 'SET_STATUS';

// Actions

const setStatus = (status: boolean): action => {
  return {
    type: SET_STATUS,
    status,
  };
};

export const isLoggedIn = () => (dispatch: Dispatch) => {
  try {
    const token = Cookies.get('token');
    if (token) {
      dispatch(setStatus(true));
    } else {
      dispatch(setStatus(false));
    }
  } catch (error) {
    console.error(error);
  }
};

export const logIn = (password: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.post('/api/login', { password });
    Cookies.set('token', data);
    dispatch(setStatus(true));
  } catch (error) {
    console.error(error);
  }
};

export const logOut = () => (dispatch: Dispatch) => {
  try {
    Cookies.remove('token');
    dispatch(setStatus(false));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default (state: boolean = false, action: action) => {
  switch (action.type) {
    case SET_STATUS:
      return action.status;
    default:
      return state;
  }
};
