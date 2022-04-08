import { Blog } from ".prisma/client";
import { Button, ButtonBase, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../store/allBlogs";

type BlogListItemProps = {
  blog: Blog;
  isAdmin: boolean;
};

export default ({ blog, isAdmin }: BlogListItemProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const date = (blog.createdAt as unknown as string).split("T")[0];
  const link = !isAdmin
    ? `/blogs/${date}/${blog.slug}`
    : `/admin/${date}/${blog.slug}`;

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteBlog(blog));
  };

  return (
    <ButtonBase
      sx={{ flexGrow: 1, display: "flex" }}
      onClick={() => {
        router.push(link);
      }}
    >
      <Paper sx={{ flexGrow: 1, padding: "10px", gap: "20px" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h1">{blog.title}</Typography>
          {!isAdmin ? (
            <></>
          ) : (
            <Button
              variant="contained"
              color="error"
              sx={{ height: "fit-content" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </Box>
        <Typography variant="subtitle1" align="left">
          {date}
        </Typography>
        <Box>
          <Typography align="left">{blog.content.slice(0, 150)}...</Typography>
        </Box>
      </Paper>
    </ButtonBase>
  );
};
