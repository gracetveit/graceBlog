import { useSelect } from "@mui/base";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthCheck from "../../components/AuthCheck";
import BlogList from "../../components/BlogList";
import { RootState } from "../../store";
import { fetchBlogs } from "../../store/allBlogs";
import Blogs from "../blogs";

export default () => {
  const blogs = useSelector((state: RootState) => state.allBlogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <AuthCheck>
      <BlogList blogs={blogs} isAdmin />
    </AuthCheck>
  );
};
