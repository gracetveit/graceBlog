import AuthCheck from "../../../components/AuthCheck";
import BlogForm from "../../../components/BlogForm";
import { updateBlog } from "../../../store/singleBlog";

export default () => {
  return (
    <AuthCheck>
      <BlogForm method="PUT" thunk={updateBlog} />
    </AuthCheck>
  );
};
