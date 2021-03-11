import React, { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { login, googleAuth } from '../../redux/actions/userActions';
import PublicComponent from './PublicComponent';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <ReactLink color='inherit' to='/'>
        GymTracker
      </ReactLink>{' '}
      {new Date().getFullYear()}
      {'.'} {'All Rights reserved.'}
    </Typography>
  );
}

const GoogleIcon = () => (
  <svg style={{ width: '20px', height: '20px' }} viewBox='0 0 24 24'>
    <path
      fill='currentColor'
      d='M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z'
    />
  </svg>
);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ location, history }) => {
  const classes = useStyles();

  const { REACT_APP_GOOGLE_LOGIN_CLIENT_ID } = process.env;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/user';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    localStorage.setItem('newUser', false);
  };

  const googleSucces = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    dispatch(googleAuth(result, token));

    try {
      dispatch();
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = async (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try again later');
  };

  return (
    <>
      <PublicComponent />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Log in
          </Typography>
          <FormControl>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                value={email}
                onInput={(e) => setEmail(e.target.value)}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />

              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Log in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <ReactLink to='/register'>
                    {"Don't have an account? Register"}
                  </ReactLink>
                </Grid>
                <br />
                <br />
                <GoogleLogin
                  clientId={REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                  render={(renderProps) => (
                    <Button
                      className={classes.googleButton}
                      fullWidth
                      variant='contained'
                      color='primary'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      startIcon={<GoogleIcon />}
                    >
                      Google Log In
                    </Button>
                  )}
                  // buttonText='Login'
                  onSuccess={googleSucces}
                  onFailure={googleFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </Grid>
            </form>
          </FormControl>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Login;

// Form validation
// Check if CapsLock is on
