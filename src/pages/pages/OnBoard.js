import React from "react";
import styled, {createGlobalStyle} from "styled-components";

import {
  Grid,
} from "@material-ui/core";

import logo from '../../images/Logo4.png';
import {Logo} from "../components/Logo";


const Root = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  padding-bottom: 5%;
`;
const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.sidebar.header.background};
  }
`;

function OnBoard() {
  return (
    <Root>
      <GlobalStyle />
      <Grid
        container
        direction="row"
        justify-content="center"
        alignItems="center"
      >
        <Grid item>
          <Logo logo={logo}/>
        </Grid>
      </Grid>
    </Root>
  );
}

export default OnBoard;
