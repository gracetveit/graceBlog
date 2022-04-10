import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth";

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(logout());
  };
  return (
    <Button variant="contained" onClick={handleClick}>
      Log Out
    </Button>
  );
};
