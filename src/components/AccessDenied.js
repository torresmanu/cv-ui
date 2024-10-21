import React from 'react';
import {Button, Grid, Typography} from "@material-ui/core";
import {Logo} from "../pages/components/Logo";
import lock from "../images/lock.png";
import arrow from "../images/arrow.png"
import {useHistory} from "react-router-dom";


export default function AccessDenied() {
  const history = useHistory();
  return (
    <>
      <Button
          color='primary'
          style={{color: '#3397EF'}}
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
              <Logo logo={lock}  width={'250px'} />
              <Typography variant="h1" gutterBottom align="center">
              Access Denied
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
              Please contact the Administrator if you need access to this page.
              </Typography>
          </Grid>
          </Grid>
      </Grid>
    </>
  );
}