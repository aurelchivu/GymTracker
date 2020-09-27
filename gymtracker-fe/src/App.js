import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import {AppBar,CssBaseline,Typography,createMuiTheme} from "@material-ui/core";

import Dashboard from './components/protected/Dashboard';
import Login from './components/public/Login'
import Register from './components/public/Register'
import About from './components/public/About'
import Home from './components/public/Home'
import PublicComponent from './components/public/PublicComponent'
import { ProtectedRoute } from './components/protected/ProtectedComponent';
import Image from './utils/gym.jpg'
import { palette } from '@material-ui/system';

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

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = (props) => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography style={{ margin: 10 }}>
      {/* <Switch> */}
        <Route exact from="/" render={props => <PublicComponent {...props} />} />
        <Route exact path="/dasboard" render={props => <Dashboard {...props} />} />
      {/* </Switch>    */}
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/about" render={props => <About {...props} />} />
        <Route exact path="/register" render={props => <Register {...props} />} />
      </Typography>
    </ThemeProvider>
  );
}

export default withStyles(styles)(App);
