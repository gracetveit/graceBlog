import AuthCheck from "../../components/AuthCheck";
import BlogForm from "../../components/BlogForm";
import { createBlog } from "../../store/singleBlog";

export default () => {
  return (
    <AuthCheck>
      <BlogForm method="POST" thunk={createBlog} />
    </AuthCheck>
  );
};
