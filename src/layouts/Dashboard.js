import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    max-width: calc(100vw);
    padding-left: 8vw;
    padding-right: 8vw;
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
            <Sidebar
              routes={routes}
              PaperProps={{ style: { width: '20%' } }}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            />
        </Drawer>
        <AppContent>
          <Header onDrawerToggle={this.handleDrawerToggle}/>
          <MainContent p={10}>
            {children}
          </MainContent>
          <Footer/>
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
