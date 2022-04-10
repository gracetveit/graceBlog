import { Alert, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { login, Status } from "../store/auth";

export default () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === Status.True) {
      router.push("/admin");
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn === Status.True) {
      router.push("/admin");
    }

    if (attemptedLogin && isLoggedIn === Status.False) {
      setAlert(true);
      setUser({ username: "", password: "" });
    }
  }, [isLoggedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserInfo = { [e.target.name]: e.target.value };
    setUser({ ...user, ...newUserInfo });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setAlert(false);
    dispatch(login(user));
    setAttemptedLogin(true);
    // router.reload();
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
    >
      <TextField
        label="username"
        id="username"
        onChange={handleChange}
        name="username"
        value={user.username}
      />
      <TextField
        label="password"
        id="password"
        onChange={handleChange}
        name="password"
        type="password"
        value={user.password}
      />
      <Button variant="contained" type="submit">
        Log In
      </Button>
      {!alert ? <></> : <Alert severity="error">Incorrect Login!</Alert>}
    </Box>
  );
};
