import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BlogForm from '../../components/BlogForm';
import { RootState } from '../../store';
import { Blog, createBlog, updateBlog } from '../../store/allBlogs';
import { fetchBlog } from '../../store/singleBlog';
import { Title } from 'react-head';

export default () => {
  const dispatch = useDispatch();
  const blog = useSelector((state: RootState) => state.singleBlog);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlog(slug));
    }
  }, [dispatch]);

  const action = slug
    ? (data: Blog) => dispatch(updateBlog(data))
    : (data: Blog) => dispatch(createBlog(data));

  return (
    <div>
      <Title>{slug ? `Updating ${blog.title}` : 'New Blog'}</Title>
      <BlogForm
        action={action}
        oldBlog={slug ? blog : undefined}
        nav={navigate}
      />
    </div>
  );
};
