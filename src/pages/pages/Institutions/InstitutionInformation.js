import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

function InstitutionInformation({ state }) {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Avatar
          alt={state.institution_name}
          src="../images/user.png"
          style={{ color: '#3397EF', backgroundColor: '#DDEAF6' }}
        />
      </Grid>
      <Grid item>
        <Typography variant="body1">
          {state.region} - {state.institution_name}
        </Typography>
        <Typography variant="body2">
          {state.email}
        </Typography>
      </Grid>
    </Grid>
  );
}
export default InstitutionInformation;