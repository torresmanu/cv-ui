import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {Button as MuiButton, Grid, Typography} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import {Logo} from "../components/Logo";
import logo from "../../images/Logo4.png";

const Button = styled(MuiButton)(spacing);

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing(6)}px;
  text-align: center;
  background: transparent;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

function Page404() {
  return (
    <Wrapper>
      <Typography component="h1" variant="h1" align="center" gutterBottom>
        404
      </Typography>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        Page not found.
      </Typography>
      <Typography component="h2" variant="body1" align="center" gutterBottom>
        The page you are looking for might have been removed.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        color="secondary"
        mt={2}
      >
        Return to website
      </Button>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
      <Grid item style={{paddingTop: 50}}>
          <Logo logo={logo} width={'45%'}/>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Page404;
