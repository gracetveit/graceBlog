import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../store';
import { fetchBlogs } from '../store/allBlogs';

export default () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.allBlogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div>
      <h1>Blogs Page</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
