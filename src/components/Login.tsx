import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";

export default () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: any) => {
    const newUserInfo = { [e.target.name]: e.target.value };
    setUser({ ...user, ...newUserInfo });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login(user));
    // router.reload();
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="username"
        id="username"
        onChange={handleChange}
        name="username"
      />
      <TextField
        label="password"
        id="password"
        onChange={handleChange}
        name="password"
      />
      <Button variant="contained" type="submit">
        Log In
      </Button>
    </Box>
  );
};
