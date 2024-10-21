import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const ReactionTimeCard = ({ averageReactionTime }) => {
  return (
    <Card className='customCard'>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Average Reaction Time
        </Typography>
        <Typography variant="h5" component="h2">
          {averageReactionTime ? `${averageReactionTime} ms` : 'No Data'}
        </Typography>
        <Typography color="textSecondary">
          Based on Go/No-Go Tasks
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReactionTimeCard;