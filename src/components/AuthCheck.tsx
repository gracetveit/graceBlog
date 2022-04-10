import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout, Status, verify } from "../store/auth";

export default ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === Status.False) {
      router.push("/admin/login");
      return;
    }

    if (isLoggedIn === Status.Pending) {
      dispatch(verify());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn === Status.False) {
      router.push("/admin/login");
      return;
    }
  }, [isLoggedIn]);

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isLoggedIn !== Status.True ? (
        <CircularProgress />
      ) : (
        <div>
          {children}
          <Button variant="contained" onClick={handleClick}>
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
};
