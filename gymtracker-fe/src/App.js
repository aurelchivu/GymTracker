import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import {AppBar,CssBaseline,Typography,createMuiTheme} from "@material-ui/core";

import Admin from './components/protected/layouts/Admin';
import About from './components/public/About'
import Home from './components/public/Home'
import Login from './components/public/Login'
import PublicComponent from './components/public/PublicComponent'
import Register from './components/public/Register'

import Image from './utils/gym.jpg'
import { palette } from '@material-ui/system';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
})

const styles = theme => ({
	"@global": {
		body: {
			backgroundImage: `url(${Image})`,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
			backgroundSize: "cover",
			backgroundAttachment: "fixed",
      height: "100%"
		},
		html: {
      height: "100%"
		},
		"#componentWithId": {
      height: "100%"
    }
	}
});

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography style={{ margin: 10 }} color="secondary">
        <Route exact path="/" render={props => <PublicComponent {...props} />} />
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/about" render={props => <About {...props} />} />
        <Route exact path="/register" render={props => <Register {...props} />} /> 
        <Route exact path="/admin" render={props => <Admin {...props} />} />
      </Typography>
    </ThemeProvider>
  );
}

export default withStyles(styles)(App);
