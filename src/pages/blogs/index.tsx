import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchBlogs } from "../../store/allBlogs";

export default () => {
  const blogs = useSelector((state: RootState) => state.allBlogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.title}>{blog.title}</li>
      ))}
    </ul>
  );
};
