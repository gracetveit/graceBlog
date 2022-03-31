import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchBlog } from "../../../store/singleBlog";

export default () => {
  const router = useRouter();
  const blog = useSelector((state: RootState) => state.singleBlog);
  const dispatch = useDispatch();
  const { date, slug } = router.query;

  useEffect(() => {
    if (date) {
      dispatch(fetchBlog(date, slug));
    }
  }, [router]);

  useEffect(() => {
    if ("message" in blog) {
      router.push("/404");
    }
  }, [blog]);

  return (
    <div>
      <p>{"content" in blog ? blog.title : ""}</p>
    </div>
  );
};
