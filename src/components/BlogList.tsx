import { Blog } from ".prisma/client";
import BlogListItem from "./BlogListItem";

type BlogListProps = {
  blogs: Blog[];
  isAdmin?: boolean;
};

export default ({ blogs, isAdmin }: BlogListProps) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <BlogListItem blog={blog} isAdmin={isAdmin} key={blog.title} />
      ))}
    </ul>
  );
};
