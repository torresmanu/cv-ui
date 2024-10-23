import React from "react";
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import {
  Grid,
  Hidden,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Avatar,
  Typography
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

// Add your logo here
import logo from "../images/Logo.png"; // Import your app logo

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.header.background};
  color: ${props => props.theme.header.color};
  box-shadow: ${props => props.theme.shadows[1]};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
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

const Header = ({ onDrawerToggle }) => (
  <React.Fragment>
    <AppBar position="sticky" elevation={0}>
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
              <Avatar alt="User Name" src="/path-to-avatar-image.jpg" /> {/* Replace with user data */}
            </ProfileSection>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default connect()(withTheme(Header));