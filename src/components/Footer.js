import React from "react";
import logo from "../images/Logo.png";
import { Box, Container, Typography, Link } from "@material-ui/core";



function Footer() {
  return (
    <Box
    sx={{
      py: 5,
      textAlign: 'center',
      position: 'relative', // Ensure that this overlays the video
      zIndex: 1, // Content should be above the video
      bgcolor: "#1E2023", // Optional background color with transparency for contrast
    }}
  >
    <Container>
    <Typography variant="paragraph" component="p"style={{ fontStyle: 'italic' }}>
    The information provided on this platform is for informational purposes only and should not be considered financial advice. We are not licensed financial advisors. Users should conduct their own research and consult with a licensed financial advisor before making any investment decisions. The platform is not responsible for any financial decisions made based on the information provided.
    </Typography>
      <img 
        src={logo} 
        alt="Logo" 
        style={{
          width: '100px', 
          height: 'auto', 
          marginTop: '5px'}} 
      />
      <Typography variant="caption" component="p">
        © All rights reserved
      </Typography>
    </Container>
  </Box>
  );
}

export default Footer;
