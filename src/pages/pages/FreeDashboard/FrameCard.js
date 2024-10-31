import React from 'react';
import { Box, Typography, Avatar, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
      backgroundColor: '#1E2329',
      color: 'white',
      margin: theme.spacing(10, 0),
      borderRadius: 12,
      padding: theme.spacing(4),
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'url(https://framerusercontent.com/images/gDLZ3lXTL8phROUo0iUFtr1HEM.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '75vh',
      },
  header: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  textStrong: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  content: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    lineHeight: 1.6,
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginBottom: theme.spacing(1),
  },
  button: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1, 3),
    fontWeight: 'bold',
  },
}));

const FramerCard = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.header}>
        CRYPTO, BUT <span className={classes.textStrong}>EASY</span>
      </Typography>
      <Typography variant="h6" className={classes.content}>
        Buy $BTC, $ETH, stablecoins, and more cryptocurrencies starting from
        $100 Argentine pesos. Access <span className={classes.textStrong}>30+ tokens</span> and <span className={classes.textStrong}>16+ blockchain networks</span>.
      </Typography>
      <Button variant="contained" className={classes.button}>
        See more
      </Button>
    </Box>
  );
};

export default FramerCard;