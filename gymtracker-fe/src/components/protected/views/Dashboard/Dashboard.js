import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkout } from '../../../../actions/workoutActions';

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// core components
import Button from '../../components/CustomButtons/Button.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { successCardHeader } from '../../assets/jss/material-dashboard-react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  input: {
    height: 40,
  },
  button: {
    height: 40,
  },
}));

export default function Dashboard({ location, history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const newUser = localStorage.getItem('newUser');
  const [workoutName, setWorkoutName] = useState('');

  const currentDate = new Date().toDateString();
  const currentTime = new Date().toLocaleTimeString();
  const lastWeekWorkout = 'back and abs';
  const googleWorkout = 'legs';
  const classes = useStyles();

  const dispatch = useDispatch();

  const workoutCreate = useSelector((state) => state.workoutCreate);
  const { workout, success, error } = workoutCreate;

  const didMount = useRef(false);

  useEffect(() => {
    if (success && didMount.current) {
      history.push(`/admin/workouts/${workout.data._id}/sets`);
    } else {
      didMount.current = true;
    }
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createWorkout({
        name: workoutName,
      })
    );
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h2>Dashboard</h2>
          </CardHeader>
          <CardBody>
            {newUser === 'true' ? (
              <h4 className={classes.cardTitle}>
                Hello, {userInfo.username}! <br />
                Welcome to GymTracker!
                <br />
                Today is {currentDate}, {currentTime}.<br />
                This is the place to be if you want better results in the gym.
                <br />
                Drink water and don't forget to warm up before each training.
                <br />
                What do you want to train today?
                <br />
              </h4>
            ) : (
              <h4 className={classes.cardTitle}>
                Hello, {userInfo.username}! <br />
                Today is {currentDate}, {currentTime}.<br />
                This time last week you had the {lastWeekWorkout} workout.
                <br />
                According to your Google Calendar, today you have{' '}
                {googleWorkout} day.
                <br />
                What do you want to train today?
                <br />
              </h4>
            )}
            <FormControl>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  value={workoutName}
                  onInput={(e) => setWorkoutName(e.target.value)}
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='workoutName'
                  label='Workout Name'
                  name='workoutName'
                  autoComplete='workoutName'
                  autoFocus
                />
                <Grid container direction='row' spacing='3'>
                  <Grid item xs={2} sm={3} md={3}></Grid>
                  <Grid item xs={8} sm={6} md={6}>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      round
                      className={classes.button}
                    >
                      start
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={3} md={3}></Grid>
                </Grid>
              </form>
            </FormControl>
          </CardBody>
          <CardFooter chart>
            <div className={classes.CardBody}>
              <br />
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

// Form validation
