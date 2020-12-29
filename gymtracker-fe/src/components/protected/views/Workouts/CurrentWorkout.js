import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSet,
  listSets,
  resetSet,
  listSetsReset,
} from '../../../../actions/setActions';
import { resetWorkout } from '../../../../actions/workoutActions';
import workoutSets from './workoutSets';
import FullWorkout from './FullWorkout';
// @material-ui/core
import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Button from '../../components/CustomButtons/Button.js';
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 10,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CurrentWorkout({history}) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [muscle, setMuscle] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState(['Exercises']);
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();

  const setList = useSelector((state) => state.setList);
  const { loading, error, sets } = setList;

  const setCreate = useSelector((state) => state.setCreate);
  let { success, set } = setCreate;
  // const setId = set.data._id

  const workoutCreate = useSelector((state) => state.workoutCreate);
  const { workout } = workoutCreate;

  const workoutName = workout.data.name;
  const workoutId = workout.data._id;

  useEffect(() => {
    if (success) {
      dispatch(listSets(workoutId));
      history.push(`/admin/workouts/${workout.data._id}/sets`);
    }
  }, [success]);

  const selectMuscle = (e) => {
    setMuscle(e.target.value);
    setExercises(
      workoutSets.find((workout) => workout.name === e.target.value).exercises
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const set = {
      muscle: muscle,
      exercise: exercise,
      reps: reps,
      weight: weight,
    };
    dispatch(createSet(set));
  };

  const stopTraining = (e) => {
    e.preventDefault();
    dispatch(resetSet());
    dispatch(resetWorkout());
    dispatch(listSetsReset());
    history.push(`/admin/workouts/`);
  };

  return (
    <>
      <Card>
        <CardHeader color='primary'>
          <h2>My Workouts</h2>
        </CardHeader>
        <CardBody>
          <h3>Today's {workoutName} workout summary:</h3>
          <GridContainer>
            <form
              style={{ display: 'flex' }}
              className={classes.form}
              noValidate
              onSubmit={handleSubmit}
            >
              <FormControl className={classes.margin}>
                {/* <InputLabel htmlFor='demo-customized-select-native'>Muscle</InputLabel> */}
                <NativeSelect
                  id='demo-customized-select-native'
                  value={muscle}
                  onChange={selectMuscle}
                  input={<BootstrapInput />}
                >
                  {workoutSets.map((workout, key) => {
                    return <option key={key}>{workout.name}</option>;
                  })}
                </NativeSelect>
              </FormControl>
              <FormControl className={classes.margin}>
                {/* <InputLabel htmlFor='demo-customized-select-native'>Exercise</InputLabel> */}
                <NativeSelect
                  id='demo-customized-select-native'
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                  input={<BootstrapInput />}
                >
                  {exercises.map((exercise, key) => {
                    return <option key={key}>{exercise}</option>;
                  })}
                </NativeSelect>
              </FormControl>
              <FormControl className={classes.margin}>
                {/* <InputLabel htmlFor='demo-customized-select-native'>Reps</InputLabel> */}
                <BootstrapInput
                  placeholder='Reps'
                  id='demo-customized-textbox'
                  htmlFor='demo-customized-select-native'
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  variant='outlined'
                  required
                />
              </FormControl>
              <FormControl className={classes.margin}>
                {/* <InputLabel htmlFor='demo-customized-select-native'>Weight</InputLabel> */}
                <BootstrapInput
                  placeholder='Weight'
                  id='demo-customized-textbox'
                  htmlFor='demo-customized-select-native'
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  variant='outlined'
                  required
                />
              </FormControl>
              <Button
                round
                size='sm'
                color='primary'
                type='submit'
                color='primary'
                className={classes.submit}
              >
                Add Set
              </Button>
            </form>
          </GridContainer>
          {loading ? (
            <h3>
              <CircularProgress color='primary' />
            </h3>
          ) : error ? (
            <h3>{error}</h3>
          ) : success && sets !== undefined ? (
            <Card plain>
              <CardBody>
                <FullWorkout
                  tableHeaderColor='primary'
                  tableHead={['Muscle', 'Exercise', 'Reps', 'Weight']}
                  tableData={sets.data}
                />
              </CardBody>
            </Card>
          ) : null}
          <br />
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
                center
                onClick={stopTraining}
              >
                Stop Training
              </Button>
            </Grid>
            <Grid item xs={2} sm={3} md={3}></Grid>
          </Grid>
        </CardBody>

        <CardFooter chart>
          {/* <h3>Last week's workout summary.</h3> */}
        </CardFooter>
      </Card>
    </>
  );
}

// Form validation
// Keep workout id after change location
