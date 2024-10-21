// MarketStats.js
import React from 'react';
import { Box, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup';

const useStyles = makeStyles((theme) => ({
  statNumber: {
    fontSize: '4rem',
    fontWeight: 'bold',
    fontColor: '#000000',
  },
  marketStatsContainer: {
    position: 'relative',
    zIndex: 1000, // Ensure it scrolls under the hero
    marginTop: '100vh', // Create enough space to appear after the HeroSection
    paddingTop: theme.spacing(10), // Additional padding for breathing room
  },
}));

const MarketStats = () => {
  const classes = useStyles();

  return (
    <Box py={6} px={3} className={classes.marketStatsContainer} bgcolor="#f0f2f5">
      <Typography variant="h4" align="center" gutterBottom>
        Market Statistics
      </Typography>
      <Grid container spacing={3} justifyContent="center">

      <Grid item container xs={12} md={4} justifyContent='center'>
                    <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>            <Typography variant="h6">Total Market Cap</Typography>
            <Typography className={classes.statNumber}>
              <CountUp start={0} end={2000} duration={5} prefix="$" suffix="B" />
            </Typography>
            </Box>
        </Grid>

        <Grid item container xs={12} md={4} justifyContent='center'>
                    <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>            <Typography variant="h6">24H Trading Volume</Typography>
            <Typography className={classes.statNumber}>
              <CountUp start={0} end={100} duration={5} prefix="$" suffix="B" />
            </Typography>
            </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarketStats;