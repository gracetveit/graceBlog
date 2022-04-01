import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../components/Login";
import { RootState } from "../../store";
import { verify } from "../../store/auth";

export default () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn !== true) {
      dispatch(verify());
    }
  }, [dispatch]);

  const hasLoaded = isLoggedIn ? <h1>Logged In!</h1> : <Login />;

  return (
    <div>
      {typeof isLoggedIn === "string" ? <CircularProgress /> : hasLoaded}
    </div>
  );
};
