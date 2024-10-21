import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MemoryPerformanceCard = ({ data }) => {
  const classes = useStyles();

  // Extract memory performance data (example from CVLT)
  const memoryPerformance = data.CVLT[0].BicamsTotal;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Memory Performance
        </Typography>
        <Typography variant="h5" component="h2">
          {memoryPerformance} Total Points
        </Typography>
        <Typography color="textSecondary">
          Based on CVLT Task
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MemoryPerformanceCard;