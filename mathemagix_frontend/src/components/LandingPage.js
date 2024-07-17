import React from 'react';
import { Typography, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#0000ff',
    marginBottom: theme.spacing(4),
  },
  founderInfo: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Welcome to Mathemagix
      </Typography>
      <Typography variant="h5">
        Test your arithmetic skills and compete with others!
      </Typography>
      <div className={classes.founderInfo}>
        <Typography variant="body1">
          Founder: Plantinah Tshukudu
        </Typography>
        <Typography variant="body1">
          Email: Plantinatshukudu@gmail.com
        </Typography>
        <Typography variant="body1">
          GitHub: Plantinah99
        </Typography>
      </div>
    </Container>
  );
};

export default LandingPage;
