import React from "react";

import { Typography } from "@material-ui/core";

export default function AuthErrors(props) {
  return (
    props.error &&
    <div style={{marginTop:'10px', padding:'0px'}}>
      <Typography component="h2" variant="body1" align="center" color="error">
        {props.error.http_code === 429 ? props.error.message : 'Invalid Username or Password.'}
      </Typography>
      <Typography component="h2" variant="body1" align="center" color="error">
        {props.error.http_code === 429 ? '' : 'Please try again.'}
      </Typography>
    </div>
  );
}
