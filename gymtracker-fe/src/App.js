import React from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { CssBaseline, Typography, createMuiTheme } from '@material-ui/core';

import Admin from './components/protected/layouts/Admin';
import About from './components/public/About';
import Home from './components/public/Home';
import Login from './components/public/Login';
import PublicComponent from './components/public/PublicComponent';
import Register from './components/public/Register';

import Image from './utils/Fitness.ico';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const styles = (theme) => ({
  '@global': {
    body: {
      backgroundImage: `url(${Image})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      height: 'fixed',
      position: 'center',
    },
    html: {
      height: '100%',
    },
    '#componentWithId': {
      height: '100%',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Route
        exact
        path='/'
        render={(props) => <PublicComponent {...props} />}
      />
      <Route exact path='/' render={(props) => <Home {...props} />} />
      <Route exact path='/login' render={(props) => <Login {...props} />} />
      <Route exact path='/about' render={(props) => <About {...props} />} />
      <Route
        exact
        path='/register'
        render={(props) => <Register {...props} />}
      />
    </ThemeProvider>
  );
};

export default withStyles(styles)(App);

// Fix double scrollbar
