import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlog, updateBlog } from '../../store/allBlogs';

export default ({ method, id }: { method: string; id?: number }) => {
  const [blog, setBlog] = useState({ title: '', content: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const newBlogInfo = { [e.target.name]: e.target.value };
    setBlog({ ...blog, ...newBlogInfo });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      switch (method) {
        case 'POST':
          dispatch(createBlog(blog));
          break;
        case 'PUT':
          dispatch(updateBlog({ ...blog, id }));
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      navigate('/');
    }
    navigate(`/blogs/${Date.now()}/${encodeURI(blog.title)}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input onChange={handleChange} type="text" name="title" id="title" />

        <label htmlFor="content">Body</label>
        <input
          onChange={handleChange}
          type="textarea"
          name="content"
          id="content"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
