import { Blog } from ".prisma/client";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { createBlog, fetchBlog } from "../store/singleBlog";

export default ({ method, thunk }) => {
  const [blog, setBlog] = useState<Partial<Blog>>({ title: "", content: "" });
  const [submitStatus, setSubmitStatus] = useState<Boolean>(false);
  const oldBlog = useSelector((state: RootState) => state.singleBlog);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (method !== "PUT") {
      return;
    }
    const { date, slug } = router.query;
    dispatch(fetchBlog(date, slug));
    if (!("content" in oldBlog)) {
      return;
    }
    setBlog({ title: oldBlog.title, content: oldBlog.content });
  }, [dispatch]);

  useEffect(() => {
    if (submitStatus && "content" in oldBlog) {
      const date = (oldBlog.createdAt as unknown as string).split("T")[0];
      router.push(`/blogs/${date}/${oldBlog.slug}`);
      return;
    }
    if (method !== "PUT") {
      return;
    }
    if (!("content" in oldBlog)) {
      return;
    }

    setBlog({ title: oldBlog.title, content: oldBlog.content });
  }, [oldBlog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBlogInfo = { [e.target.name]: e.target.value };
    setBlog({ ...blog, ...newBlogInfo });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(thunk(blog));
    setSubmitStatus(true);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      display="flex"
      flexDirection="column"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Title"
        id="title"
        name="title"
        onChange={handleChange}
        value={blog.title}
      />
      <TextField
        label="Content"
        id="content"
        name="content"
        multiline
        minRows={4}
        onChange={handleChange}
        value={blog.content}
      />
      <Button variant="contained" type="submit">
        Post New Blog
      </Button>
    </Box>
  );
};
