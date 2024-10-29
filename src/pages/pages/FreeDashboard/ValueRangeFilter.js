import React from "react";
import {Grid, FormControl, Typography, TextField} from '@material-ui/core';


function ValueRangeFilter({isValueRangeInvalid, handleValueRangeValueSelection, selectedValue}){
  const handleKeyPress = (event) => {
    if (event.key === '-' || event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  };
  return(
    <>
      <Grid item xs={6} sm={2}>
        <Typography variant='h6'>Min Value</Typography>
        <FormControl fullWidth>
            <TextField
              error={isValueRangeInvalid(selectedValue)}
              helperText={isValueRangeInvalid(selectedValue) ? 'Cannot be greater than Max Value': ''}
              type="number"
              value={selectedValue.min || ''}
              onChange={(e) => handleValueRangeValueSelection(e.target.value, 'min')}
              style={{marginTop: '16px'}}
              inputProps={{ min: '0' }} // Set minimum allowed value as 0
              onKeyDown={handleKeyPress} // This prevents entering negative values
            />
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={2}>
        <Typography variant='h6'>Max Value</Typography>
        <FormControl fullWidth>
            <TextField
              type="number"
              value={selectedValue.max || ''}
              onChange={(e) => handleValueRangeValueSelection(e.target.value, 'max')}
              style={{marginTop: '16px'}}
              inputProps={{ min: '0' }} // Set minimum allowed value as 0
              onKeyDown={handleKeyPress} // This prevents entering negative values
            />
        </FormControl>
      </Grid>
    </>
  )
}

export default ValueRangeFilter;