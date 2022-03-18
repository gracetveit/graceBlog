import React from 'react';
import { Route, Routes } from 'react-router';

import Home from './pages/Home';
import Blogs from './pages/Blogs';
import SingleBlog from './pages/SingleBlog';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';

export default () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:date/:slug" element={<SingleBlog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Login />} />
      </Routes>
    </div>
  );
};
