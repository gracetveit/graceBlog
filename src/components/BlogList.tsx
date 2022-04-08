import { Blog } from ".prisma/client";
import { List, ListItem } from "@mui/material";
import BlogListItem from "./BlogListItem";

type BlogListProps = {
  blogs: Blog[];
  isAdmin?: boolean;
};

export default ({ blogs, isAdmin }: BlogListProps) => {
  return (
    <List>
      {blogs.map((blog) => (
        <ListItem key={blog.title}>
          <BlogListItem blog={blog} isAdmin={isAdmin} />
        </ListItem>
      ))}
    </List>
  );
};
