import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox } from '@material-ui/core';

function BooleanFilter({ handleBooleanSelection, selectedValue }) {
  const handleChange = (event) => {
    handleBooleanSelection(event.target.checked);
  };

  return (
    <Grid item xs={12} sm={3}>
      <Typography variant='h6'>Boolean Value</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedValue === true}
            onChange={handleChange}
            color="primary"
          />
        }
        label={selectedValue ? 'True' : 'False'}
      />
    </Grid>
  );
}

export default BooleanFilter;