import React from "react";
import { createGlobalStyle } from "styled-components";
import { CssBaseline, Box, Typography, Container, Link } from "@material-ui/core";
import logo from "../images/logo_simple.svg";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }
`;

function Landing({ children }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyle />
      {children}
      <Box
        sx={{
          py: 5,
          textAlign: 'center',
          position: 'relative',
          bgcolor: "#f0f2f5",
        }}
      >
        <Container>
          <img 
            src={logo} 
            alt="Logo" 
            style={{
              width: '40px', // Set the desired width for the image
              height: 'auto', // Maintain aspect ratio
              marginBottom: '10px' // Optional: Add some space below the image
            }} 
          />
          <Typography variant="caption" component="p">
            © All rights reserved
            <br /> made by &nbsp;
            <Link href="https://instagram.com/snow.match?igshid=YmMyMTA2M2Y=">CryptoVoice</Link>
          </Typography>
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default Landing;