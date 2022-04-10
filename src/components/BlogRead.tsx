import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export default ({ blog }) => {
  const date = (blog.createdAt as unknown as string).split("T")[0];
  return (
    <Box
      margin="20px"
      maxWidth="90vw"
      width="1200px"
      display="flex"
      flexDirection="column"
      gap="10px"
    >
      <Paper sx={{ padding: "10px" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h1">{blog.title}</Typography>
          <Typography variant="subtitle1">{date}</Typography>
        </Box>
      </Paper>
      <Paper sx={{ padding: "10px" }}>
        <Box>
          <Typography align="left" component="div">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {blog.content}
            </ReactMarkdown>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
