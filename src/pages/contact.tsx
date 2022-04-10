import { Button, List, ListItem, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { config } from 'dotenv';

export const getStaticProps: GetStaticProps = () => {
  config();
  const email = process.env.EMAIL;
  return {
    props: {
      email,
    },
  };
};

export default ({ email }) => {
  const router = useRouter();
  const contact = [
    { name: 'Github', link: 'https://github.com/gracetveit' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/gracetveit/' },
    { name: 'Email', link: `mailto:${email}` },
  ];
  return (
    <Box margin="20px">
      <Paper
        sx={{
          padding: '20px',
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '90vw',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1">Contact Info</Typography>
        <List sx={{ width: '200px' }}>
          {contact.map((contactInfo) => (
            <ListItem key={contactInfo.name}>
              <Button
                onClick={() => {
                  location.assign(contactInfo.link);
                }}
                variant="contained"
                color="secondary"
                fullWidth
              >
                {contactInfo.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};
