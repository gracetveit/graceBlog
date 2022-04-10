import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default () => {
  return (
    <Box
      position="fixed"
      bottom="0"
      width="100%"
      display="flex"
      justifyContent="center"
    >
      <Paper sx={{ padding: "5px 10px" }}>
        <Box display="flex" alignItems="center">
          <Typography>Created with Prisma, NextJS, Redux, React</Typography>
          <Button
            variant="text"
            onClick={() => {
              location.assign("https://github.com/gracetveit/graceBlog");
            }}
            sx={{ color: "white" }}
          >
            repo
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
