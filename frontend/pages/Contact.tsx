import React, { ReactChildren } from 'react';
import { Title } from 'react-head';

export default () => {
  return (
    <div>
      <Title>Contact</Title>
      <h2>Links</h2>
      <ul>
        <li>
          <a href="https://github.com/gracetveit">Github</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/gracetveit/">LinkedIn</a>
        </li>
        <li>Email: grace.tveit@gmail.com</li>
      </ul>
    </div>
  );
};
