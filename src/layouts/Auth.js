import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Grid from "@material-ui/core/Grid";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${props => props.theme.body.background};
  }
`;

const Root = styled.div`
  max-width: 365px;
  max-height: 400px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  padding-bottom: 5%;
`;

function Auth({ children }) {
  return (
    <Root>
      <GlobalStyle />
      <Grid
        container
        justifyContent="flex-start" /* Updated to use Material UI v5 syntax */
        alignItems="flex-start" /* Updated to use Material UI v5 syntax */
      >
        <Grid item xs={12}>
          
          {children}
        </Grid>
      </Grid>
    </Root>
  );
}

export default Auth;