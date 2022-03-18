import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { isLoggedIn } from '../store/auth';

export default (props: PropsWithChildren<any>) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(isLoggedIn());
    if (!auth) {
      navigate('/');
    }
  }, [dispatch]);

  return <div id="auth">{React.cloneElement(props.children, { auth })}</div>;
};
