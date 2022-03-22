import React, { useEffect, useState } from 'react';
import { Blog } from '../store/allBlogs';

type BlogFormProps = {
  oldBlog?: Blog;
  action: Function;
  nav: Function;
};

export default ({ oldBlog, action, nav }: BlogFormProps) => {
  const [blog, setBlog] = useState({
    title: oldBlog?.title || '',
    content: oldBlog?.content || '',
  });

  useEffect(() => {
    setBlog({ ...blog, ...oldBlog });
  }, [oldBlog]);

  const handleSubmit = () => {
    if (oldBlog) {
      action({ ...blog, id: oldBlog.id });
    } else {
      action(blog);
    }
    nav(`/blogs/${Date.now()}/${encodeURI(blog.title)}`);
  };

  const handleChange = (e: any) => {
    const newBlogInfo = { [e.target.name]: e.target.value };
    setBlog({ ...blog, ...newBlogInfo });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          id="title"
          value={blog.title}
        />

        <label htmlFor="content">Body</label>
        <textarea
          onChange={handleChange}
          name="content"
          id="content"
          value={blog.content}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
