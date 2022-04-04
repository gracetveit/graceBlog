import { Blog } from ".prisma/client";
import { Button } from "@mui/material";
import Link from "next/link";

type BlogListItemProps = {
  blog: Blog;
  isAdmin: boolean;
};

export default ({ blog, isAdmin }: BlogListItemProps) => {
  const date = (blog.createdAt as unknown as string).split("T")[0];
  const link = !isAdmin
    ? `/blogs/${date}/${blog.slug}`
    : `/admin/${date}/${blog.slug}`;
  return (
    <div>
      <Link href={link}>{blog.title}</Link>
      {!isAdmin ? <></> : <Button>Delete</Button>}
    </div>
  );
};
