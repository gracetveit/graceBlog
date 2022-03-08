import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchMostRecent } from '../store/singleBlog';

export default () => {
  const dispatch = useDispatch();
  const blog = useSelector((state: RootState) => state.singleBlog);

  useEffect(() => {
    dispatch(fetchMostRecent());
  }, [dispatch]);

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};
