import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../store/auth';

export default () => {
  const dispatch = useDispatch();
  const [auth, setPassword] = useState({ password: '' });
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(logIn(auth.password));
    navigate('/');
  };

  const handleChange = (event: any) => {
    const newAuth = { [event.target.name]: event.target.value };
    setPassword({ ...auth, ...newAuth });
  };

  return (
    <form onSubmit={handleSubmit}>
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
