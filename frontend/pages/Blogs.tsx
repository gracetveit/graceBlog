import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../store';
import { fetchBlogs } from '../store/allBlogs';
import BlogListItem from '../components/BlogListItem';
import { isLoggedIn } from '../store/auth';

export default () => {
  const dispatch = useDispatch();
  const { blogs, auth } = useSelector((state: RootState) => ({
    blogs: state.allBlogs,
    auth: state.auth,
  }));

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(isLoggedIn());
  }, [dispatch]);

  return (
    <div>
      <h1>Blogs Page</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <BlogListItem blog={blog} auth={auth} />
          </li>
        ))}
      </ul>
    </div>
  );
};
