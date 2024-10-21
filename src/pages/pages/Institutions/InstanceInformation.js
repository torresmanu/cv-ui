import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { toCompleteDateFormat } from "../../../utils/dateWithHour";

const InstanceInformation = ({ state }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7} sm={2}>
          <Typography variant="body1">
            Complete Instance ID:
          </Typography>
        </Grid>
        <Grid item xs={5} sm={5}>
          <Typography variant="body2">
            {state.complete_uid}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={7} sm={2}>
          <Typography variant="body1">
            Current Software Version:
          </Typography>
        </Grid>
        <Grid item xs={5} sm={5}>
          <Typography variant="body2">
            {state.current_version}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={5} sm={2}>
          <Typography variant="body1">
            Last Modification:
          </Typography>
        </Grid>
        <Grid item xs={7} sm={6}>
          <Typography variant="body2">
            {toCompleteDateFormat(state.last_modify)}
          </Typography>
        </Grid>
      </Grid>
      {state.hmd_sn_change !== "" && state.hmd_sn_change !== null &&
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <Typography variant="body1" color="error">
              HMD Serial Number Change Requested by: {state.hmd_sn_change}
            </Typography>
          </Grid>
        </Grid>
      }
    </>
  );
};

export default InstanceInformation;