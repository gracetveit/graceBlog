import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminView from "../../components/AdminView";
import Login from "../../components/Login";
import { RootState } from "../../store";
import { Status, verify } from "../../store/auth";

export default () => {
  return <Login />;
};
