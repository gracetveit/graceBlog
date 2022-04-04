import BlogForm from "../../components/BlogForm";
import { createBlog } from "../../store/singleBlog";

export default () => {
  return <BlogForm method="POST" thunk={createBlog} />;
};
