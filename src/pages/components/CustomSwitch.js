import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControlLabel, Grid, Typography } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

// Customized Ant-style switch
const AntSwitch = withStyles((theme) => ({
    root: {
      width: 40, // Increased width
      height: 24, // Increased height
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 3,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(18px)', // Adjusted transform for bigger size
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 18, // Increased thumb width
      height: 18, // Increased thumb height
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 12, // Adjusted for a slightly larger border radius
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

const CustomSwitch = ({ groupByDay, setGroupByDay }) => {
  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={5}>
        <Grid item>Hourly</Grid>
        <Grid item>
          <AntSwitch
            checked={groupByDay}
            onChange={() => setGroupByDay(!groupByDay)}
            name="groupByDay"
          />
        </Grid>
        <Grid item>Daily</Grid>
      </Grid>
    </Typography>
  );
};

export default CustomSwitch;