import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchBlogs } from "../../store/allBlogs";
import BlogList from "../../components/BlogList";

export default () => {
  const blogs = useSelector((state: RootState) => state.allBlogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return <BlogList blogs={blogs} />;
};
