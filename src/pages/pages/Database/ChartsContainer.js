import React from 'react';
import { Grid, Card, CardContent } from '@material-ui/core';
import LinePlotChart from './LinePlotChart';

const ChartsContainer = ({ selectedToken }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className="customCard">
          <CardContent>
            <LinePlotChart selectedToken={selectedToken} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartsContainer;