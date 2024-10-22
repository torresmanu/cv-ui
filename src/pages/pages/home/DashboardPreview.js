import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dashboardPreview: {
    background: '#fff', // Set background to white
    padding: theme.spacing(6),
    textAlign: 'center',
    color: '#000', // Set typography color to black
    borderRadius: '12px',
  },
  dashboardImage: {
    width: '100%',
    height: 'auto',
    marginTop: theme.spacing(3),
    borderRadius: '12px',
  },
}));

const DashboardPreview = () => {
  const classes = useStyles();

  return (
    <Box className={classes.dashboardPreview}>
      <Typography variant="h4" gutterBottom>
        See the Full Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Get detailed insights into the crypto market, with real-time charts and data analytics.
      </Typography>
      <Button variant="contained" color="secondary" style={{ marginTop: '20px' }}>
        Explore Now
      </Button>
    </Box>
  );
};

export default DashboardPreview;