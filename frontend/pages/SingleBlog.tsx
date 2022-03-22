import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store';
import { fetchBlog } from '../store/singleBlog';
import ReactMarkdown from 'react-markdown';
import { Title } from 'react-head';

export default () => {
  const dispatch = useDispatch();
  const blog = useSelector((state: RootState) => state.singleBlog);

  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchBlog(slug!));
  }, [dispatch]);

  return (
    <div>
      <Title>{blog.title}</Title>
      <h1>{blog.title}</h1>
      <ReactMarkdown>{blog.content}</ReactMarkdown>
    </div>
  );
};
