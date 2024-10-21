import React from 'react';
import { Grid, FormControl, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

const getCurrentDatePlusOne = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Add 1 day to the current date
  return today.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
};

function DateRangeFilter({ handleValueRangeValueSelection, isValueRangeInvalid, selectedValue }) {
  return (
    <>
      <Grid item xs={6} sm={2}>
        <FormControl fullWidth>
          <Typography variant="h6">From</Typography>
          <KeyboardDatePicker
            helperText={
              isValueRangeInvalid(selectedValue) ? 'From Date cannot be greater than End Date' : 'YYYY-MM-DD'
            }
            disableToolbar
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            value={selectedValue.min || null}
            onChange={(date) => handleValueRangeValueSelection(date, 'min')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            fullWidth
            maxDate={getCurrentDatePlusOne()}
            // Enable year selection
            openTo="year"
            views={['year', 'month', 'date']}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={2}>
        <FormControl fullWidth>
          <Typography variant="h6">To</Typography>
          <KeyboardDatePicker
            helperText={'YYYY-MM-DD'}
            disableToolbar
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            value={selectedValue.max || null}
            onChange={(date) => handleValueRangeValueSelection(date, 'max')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            fullWidth
            maxDate={getCurrentDatePlusOne()}
            // Enable year selection
            openTo="year"
            views={['year', 'month', 'date']}
          />
        </FormControl>
      </Grid>
    </>
  );
}

export default DateRangeFilter;