import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/auth';

export default () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState({ password: '' });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(logIn('test'));
  };

  const handleChange = (event: any) => {
    const newPassword = { [event.target.name]: event.target.value };
    setPassword({ ...password, ...newPassword });
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
