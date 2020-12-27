import React from 'react';
import {Link} from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import About from './About';
import Home from './Home';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
  },
}));

export default function PublicComponent() {
  const classes = useStyles();

  return (
    <>
      <AppBar position='static' color='default'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='secondary'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
          <Button color='inherit' component={Link} to='/register'>
            Register
          </Button>
          <Button color='inherit' component={Link} to='/about'>
            About
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
