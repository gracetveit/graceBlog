import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../store/auth';
import { Title } from 'react-head';

export default () => {
  const dispatch = useDispatch();
  const [auth, setPassword] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(logIn(auth));
    navigate('/');
  };

  const handleChange = (event: any) => {
    const newAuth = { [event.target.name]: event.target.value };
    setPassword({ ...auth, ...newAuth });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title>Login</Title>
      <label htmlFor="username">Username</label>
      <input
        onChange={handleChange}
        type="text"
        name="username"
        id="username"
      />

      <label htmlFor="password">Password</label>
      <input
        onChange={handleChange}
        type="text"
        name="password"
        id="password"
      />

      <button type="submit">Log In</button>
    </form>
  );
};
