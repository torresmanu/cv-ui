import React from "react";
import { connect } from "react-redux";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider as MuiThemeProvider} from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";

import maTheme from "./theme";
import Routes from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfirmProvider } from 'material-ui-confirm';
import {SnackbarProvider} from "notistack";


const App = ({ theme }) => {
  return (
    <StylesProvider injectFirst>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={maTheme[theme.currentTheme]}>
          <ThemeProvider theme={maTheme[theme.currentTheme]}>
            <ConfirmProvider>
             <SnackbarProvider maxSnack={1}>
              <Routes />
             </SnackbarProvider>
            </ConfirmProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </StylesProvider>
  )
}
const ConnectedApp = connect(store => ({ theme: store.themeReducer }))(App);

function AppWithRouter() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ConnectedApp/>
    </Router>
  );
}

export default AppWithRouter;
