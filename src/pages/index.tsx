import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GetStaticProps } from 'next';

import fs from 'fs';

import ReactMarkdown from 'react-markdown';

export const getStaticProps: GetStaticProps = () => {
  const blurb = fs.readFileSync('public/blurb.md', { encoding: 'utf-8' });
  // console.log(fs.readdirSync('./public/blurb.md'));
  return {
    props: { blurb },
  };
};

export default ({ blurb }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        padding: '20px',
        margin: '20px',
        maxWidth: '90vw',
        width: '900px',
        gap: '20px',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        alignItems: {
          xs: 'center',
          md: 'stretch',
        },
      }}
    >
      <img
        src="/headshot.jpg"
        style={{ overflowX: 'hidden', maxWidth: '100%', width: '300px' }}
      />
      <Box display="flex" flexDirection="column">
        <Typography variant="h1">Grace Tveit</Typography>
        <Typography component="div">
          <ReactMarkdown>{blurb}</ReactMarkdown>
        </Typography>
      </Box>
    </Paper>
  );
};
