import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const AccuracyCard = ({ averageAccuracy }) => {
  return (
    <Card className='customCard'>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Average Task Accuracy
        </Typography>
        <Typography variant="h5" component="h2">
          {averageAccuracy ? `${averageAccuracy}%` : 'No Data'}
        </Typography>
        <Typography color="textSecondary">
          Based on N-Back 3 Tasks
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;