import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSet } from '../../../../actions/setActions';
import workoutSets from './workoutSets';
// @material-ui/core
import {
  makeStyles,
  ServerStyleSheets,
  withStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
// core components
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Button from '../../components/CustomButtons/Button.js';
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';
import Table from '../../components/Table/Table';

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

export default function Workouts() {
  const classes = useStyles();
  const workoutName = localStorage.getItem('workoutName');

  const dispatch = useDispatch();

  // const setCreate = useSelector((state) => state.setCreate);
  // const { set, success, error } = setCreate;

  const [muscle, setMuscle] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState(['Exercises']);
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();
  const [sets, setSets] = useState([]);

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
    setSets(set);
  };

  return (
    <>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={12}> */}
      <Card>
        <CardHeader color='primary'>
          <h2>My Workouts</h2>
        </CardHeader>
        <CardBody>
          <h3>Today's workout: {workoutName}</h3>
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
                color='primary'
                size='small'
                type='submit'
                color='primary'
                className={classes.submit}
              >
                Add Set
              </Button>
            </form>
          </GridContainer>
          <br />
          <h3 className={classes.cardBody}>{/* Last workout. */}</h3>
          <Card plain>
            <CardBody>
              <Table
                tableHeaderColor='primary'
                tableHead={['Muscle', 'Exercise', 'Reps', 'Weight']}
                tableData={sets}
              />
            </CardBody>
          </Card>
        </CardBody>
        <CardFooter chart>
          {/* <h3>Last week's workout summary.</h3> */}
        </CardFooter>
      </Card>
      {/* </GridItem>
      </GridContainer> */}
    </>
  );
}

// Clear form fields after form submit
// Form validation
