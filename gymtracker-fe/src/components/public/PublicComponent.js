import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './Login'
import Register from './Register'
import About from './About'
import Home from './Home'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      [theme.breakpoints.down("xs")]: {
        flexGrow: 1
      }
    },
    headerOptions: {
      display: "flex",
      flex: 1,
      justifyContent: "space-evenly"
    }
  }));

export default function PublicComponent(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button color="inherit" href="/" >Home</Button>
          <Button color="inherit" href="/login" >Login</Button>
          <Button color="inherit" href="/register" >Register</Button>
          <Button color="inherit" href="/about" >About</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
