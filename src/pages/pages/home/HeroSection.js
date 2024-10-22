import React from 'react';
import { useHistory } from 'react-router-dom'; // For navigation in react-router-dom v5
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../../images/logo_simple.svg';

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    height: '100vh',
    backgroundImage: 'linear-gradient(to right, black, #f2fcfe)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    color: '#fff',
    padding: theme.spacing(4),
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    zIndex: -100,
  },
  button: {
    margin: theme.spacing(4),
    backgroundColor: '#fff',
    color: 'black',
    '&:hover': {
      backgroundColor: 'black',
      color: '#fff',
    },
  },
  icon: {
    width: '50px',
    margin: '20px 0',
  },
}));

const HeroSection = () => {
  const classes = useStyles();
  const history = useHistory();  // Initialize useHistory for navigation

  const handleClick = () => {
    history.push('/dashboard');  // Redirect to dashboard
  };

  return (
    <Box className={classes.heroContainer}>
      <img src={logo} alt="Crypto" className={classes.icon} />
      <Typography variant="h2">Welcome to CryptoVoice</Typography>
      <Typography variant="h6">Track your favorite cryptos in real-time</Typography>
      <Button variant="contained" className={classes.button} onClick={handleClick}>
        Explore Dashboard
      </Button>
    </Box>
  );
};

export default HeroSection;