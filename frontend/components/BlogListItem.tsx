import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Blog, deleteBlog } from '../store/allBlogs';

export default ({ blog, auth = false }: { blog: Blog; auth?: boolean }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id));
  };

  return (
    <div>
      <Link to={`/blogs/${blog.updatedAt}/${blog.slug}`}>
        <h2>{blog.title}</h2>
      </Link>
      {auth ? <button onClick={handleDelete}>delete</button> : <></>}
    </div>
  );
};
