import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { spacing } from "@material-ui/system";
import {
  Hidden,
  CssBaseline,
  Paper as MuiPaper,
} from "@material-ui/core";

import { connect } from "react-redux";

import {closeSnackbar } from '../redux/actions/snackbarActions'
import Notifier from "../components/Notifier";

export const drawerWidth = '20vw';
export const mobileDrawerWidth = '40vw';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${props => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth};
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${props => props.theme.body.background};
  
  ${props => props.theme.breakpoints.down("md")} {
    max-width: 100vw;
  }
  
  ${props => props.theme.breakpoints.up("md")} {
    max-width: calc(100vw - ${drawerWidth});
  }
 

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

class Dashboard extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { children, routes } = this.props;

    return (
      <Root>
        <Notifier />
        <CssBaseline />
        <GlobalStyle />
        <Drawer>
          <Hidden mdUp implementation="js">
            <Sidebar
              routes={routes}
              PaperProps={{ style: { width: mobileDrawerWidth } }}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Sidebar
              routes={routes}
              PaperProps={{ style: { width: drawerWidth } }}
            />
          </Hidden>
        </Drawer>
        <AppContent>
          <Hidden mdUp>
            <Header onDrawerToggle={this.handleDrawerToggle}/>
          </Hidden>
          <MainContent p={10}>
            {children}
          </MainContent>
        </AppContent>
      </Root>
    );
  }
}

const mapStateToProps = (state, props) => ({
  snackbar: state.alertMessages.notifications,
});
const mapDispatchToProps = dispatch => ({
  closeSnackbar: (params) => dispatch(closeSnackbar(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
