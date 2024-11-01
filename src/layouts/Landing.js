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

`;

function Landing({ children }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyle />
      
      {/* Video background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -9999
      }}>
        <video 
          src="https://framerusercontent.com/assets/zGxK107SsQ760NcmS6Ay6X57skY.mp4" 
          loop 
          autoPlay 
          muted 
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 50%'
          }}
        />
      </Box>

      {/* Main Content */}
      {children}

      <Box
        sx={{
          py: 5,
          textAlign: 'center',
          position: 'relative', // Ensure that this overlays the video
          zIndex: 1, // Content should be above the video
          bgcolor: "rgba(240, 242, 245, 0.9)", // Optional background color with transparency for contrast
        }}
      >
        <Container>
          <img 
            src={logo} 
            alt="Logo" 
            style={{
              width: '40px', 
              height: 'auto', 
              marginBottom: '10px'
            }} 
          />
          <Typography variant="caption" component="p">
            © All rights reserved
            <br /> made by &nbsp;
            <Link href="https://linkedin.com">CryptoVoice</Link>
          </Typography>
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default Landing;