import React from 'react';
import { Route, Routes } from 'react-router';

import Home from './pages/Home';
import Blogs from './pages/Blogs';

export default () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
      </Routes>
    </div>
  );
};
