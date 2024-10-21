import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function DataWithIcon({ Icon, label, value }) {
    return (
        <Grid container alignItems="center" spacing={3}>
            <Grid item xs={1}>
                <Icon color="primary" />
            </Grid>
            <Grid item xs={4}>
                <Typography variant="subtitle1">{label}</Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography>{value || 'Not Available'}</Typography>
            </Grid>
        </Grid>
    );
}
