import React from 'react';
import {Button, Grid, Typography} from "@material-ui/core";
import {Logo} from "../pages/components/Logo";
import logo from "../images/search.png";
import arrow from "../images/arrow.png"
import {useHistory} from "react-router-dom";


export default function AccessDenied() {
  const history = useHistory();
  return (
    <React.Fragment>
      <Button
        color='primary'
        onClick={(e) => {
          e.stopPropagation();
          history.goBack();
        }}
      >
        <Logo logo={arrow} otherStyles={{paddingRight: 10}}/>
        {` Back`}
      </Button>
      <Grid item xs={ 12 }>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h1" gutterBottom align="center">
              No Entries Found
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={ 12 }>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle1" gutterBottom align="center">
              It seems we can’t get any data for you right now.<br />
              Please try again later.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}