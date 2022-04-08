import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ReactMarkdown from "react-markdown";

export default ({ blog }) => {
  const date = (blog.createdAt as unknown as string).split("T")[0];
  return (
    <Box margin="20px" maxWidth="1200px">
      <Paper sx={{ padding: "10px" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h1">{blog.title}</Typography>
          <Typography variant="subtitle1">{date}</Typography>
        </Box>
        <Box>
          <Typography align="left">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
