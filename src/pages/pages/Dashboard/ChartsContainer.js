import React from 'react';
import { Grid, Card, CardContent } from '@material-ui/core';
import LinePlotChart from './LinePlotChart';
import CandlePlotChart from './CandlePlotChart';

const ChartsContainer = ({ selectedToken }) => {
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="customCard">
            <CardContent>
              <LinePlotChart selectedToken={selectedToken} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChartsContainer;