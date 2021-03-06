import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createWorkout,
  listWorkouts,
} from '../../../../redux/actions/workoutActions';

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import Button from '../../components/CustomButtons/Button.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';

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
  const [event, setEvent] = useState({});
  const [googleWorkout, setGooleWorkout] = useState('');

  const currentDate = new Date().toDateString();
  const currentTime = new Date().toLocaleTimeString();
  const lastWeekDay = new Date(Date.now() - 604800000);

  const classes = useStyles();

  const dispatch = useDispatch();

  // const gapi = window.gapi;
  // const { REACT_APP_GOOGLE_CALENDAR_API_KEY } = process.env;
  // const { REACT_APP_GOOGLE_CALENDAR_CLIENT_ID } = process.env;
  // const { REACT_APP_GOOGLE_CALENDAR_DISCOVERY_DOCS } = process.env;
  // const { REACT_APP_GOOGLE_CALENDAR_SCOPES } = process.env;
  // const DISCOVERY_DOCS = [REACT_APP_GOOGLE_CALENDAR_DISCOVERY_DOCS];

  // const getEvents = () => {
  //   gapi.load('client:auth2', () => {
  //     gapi.client.init({
  //       apiKey: REACT_APP_GOOGLE_CALENDAR_API_KEY,
  //       clientId: REACT_APP_GOOGLE_CALENDAR_CLIENT_ID,
  //       discoveryDocs: DISCOVERY_DOCS,
  //       scope: REACT_APP_GOOGLE_CALENDAR_SCOPES,
  //     });
  //     gapi.auth2
  //       .getAuthInstance()
  //       .signIn()
  //       .then(() => {
  //         gapi.client.calendar.events
  //           .list({
  //             calendarId: 'primary',
  //             timeMin: new Date().toISOString(),
  //             showDeleted: false,
  //             singleEvents: true,
  //             maxResults: 10,
  //             orderBy: 'startTime',
  //           })
  //           .then((response) => {
  //             const event = response.result.items;
  //             setEvent(event);
  //             setGooleWorkout(event[0].summary);
  //             console.log('EVENT: ', event);
  //           });
  //       });
  //   });
  // };

  const workoutList = useSelector((state) => state.workoutList);
  const {
    loading: loadingWorkoutList,
    error: errorWorkoutList,
    workouts = [],
  } = workoutList;
  const {
    success: successWorkouts,
    count: countWorkouts,
    data: dataWorkouts,
  } = workouts;

  const workoutCreate = useSelector((state) => state.workoutCreate);
  const { workout, success, error } = workoutCreate;

  const didMount = useRef(false);

  // useEffect(() => {
  //   // getEvents();
  //   if (success && didMount.current) {
  //     history.push(`/user/workouts/${workout.data._id}/sets`);
  //   } else {
  //     didMount.current = true;
  //   }
  // }, [success]);

  useEffect(() => {
    dispatch(listWorkouts(lastWeekDay));
    // getEvents();
    if (success && didMount.current) {
      history.push(`/user/workouts/${workout.data._id}/sets`);
    } else {
      didMount.current = true;
    }
  }, [dispatch, success]);

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
              <>
                <h4>
                  Hello, {userInfo.username}!
                  <br />
                  <br />
                  Today is {currentDate}, {currentTime}.
                </h4>
                {loadingWorkoutList ? (
                  <h4>
                    <CircularProgress color='primary' />
                  </h4>
                ) : errorWorkoutList ? (
                  <h4>{errorWorkoutList}</h4>
                ) : countWorkouts === 0 ? (
                  <h4>On this day, last week, you had no workouts!</h4>
                ) : countWorkouts === 1 ? (
                  <h4>
                    On this day, last week, you had {countWorkouts} workout:
                  </h4>
                ) : (
                  <h4>
                    On this day, last week, you had {countWorkouts} workouts:
                  </h4>
                )}
                <ol>
                  {dataWorkouts &&
                    dataWorkouts.map((workout) => {
                      return <li key={workout._id}>{workout.name}</li>;
                    })}
                </ol>
                {googleWorkout === '' ? (
                  <h4>
                    According to your Google Calendar, today you have no
                    workouts.
                  </h4>
                ) : (
                  <h4>
                    According to your Google Calendar, today you have{' '}
                    {googleWorkout} day.
                  </h4>
                )}
                <h4>What do you want to train today?</h4>
              </>
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
                <Grid container direction='row' spacing={3}>
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

