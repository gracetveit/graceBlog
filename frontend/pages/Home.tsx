import React, { useEffect } from 'react';
import { Title } from 'react-head';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchMostRecent } from '../store/singleBlog';

export default () => {
  return (
    <div>
      <Title>Grace Tveit's Blog</Title>
      <h1>Welcome!</h1>
      <p>Hello! My name is Grace Tveit; Software Engineer.</p>
      <p>Welcome to my custom-built blog!</p>
    </div>
  );
};
