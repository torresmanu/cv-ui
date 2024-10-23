import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import {
  Grid,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Avatar,
  Typography,
  Popover,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom'; // For navigation in react-router-dom v5

// Add your logo here
import logo from "../images/Logo.png"; // Import your app logo

const AppBar = styled(MuiAppBar)`
  background: rgba(28, 28, 28, 0.1);  /* Darker background with some transparency */
  color: ${props => props.theme.header.color};
  box-shadow: ${props => props.theme.shadows[1]};
  backdrop-filter: blur(10px); /* Apply blur effect */
`;

const HeaderContainer = styled.div`

  
  ${props => props.theme.breakpoints.up("md")} {
    padding-left: 7vw;   // Apply same padding for left
    padding-right: 8vw;  // Apply same padding for right
  }
`;

const Logo = styled.img`
  width: 130px;
  height: auto;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Header = ({ onDrawerToggle }) => {
  // State for managing the popover
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();  // Initialize useHistory for navigation

  // Open the popover
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the popover
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    history.push('/');  // Redirect to dashboard
  }

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <HeaderContainer>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Center - Logo */}
            <Grid item xs={4} container justifyContent="left">
              <Logo src={logo} alt="App Logo" />
            </Grid>

            {/* Right side - Profile section */}
            <Grid item xs={4} container justifyContent="flex-end">
              <ProfileSection>
                <Typography variant="body1">Hello, User</Typography>
                <Avatar
                  alt="User Name"
                  src="/path-to-avatar-image.jpg" // Replace with the actual path to user avatar
                  onClick={handleMenuOpen} // Open menu on click
                  style={{ cursor: "pointer" }}
                />
              </ProfileSection>

              {/* Popover component */}
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                PaperProps={{
                  style: {
                    minWidth: "200px", // Adjust width of popover
                    padding: '10px',    // Optional padding for better spacing
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Princing</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Logout option */}
              </Popover>
            </Grid>
          </Grid>
        </Toolbar>
        </HeaderContainer>
      </AppBar>
    </React.Fragment>
  );
};

export default connect()(withTheme(Header));