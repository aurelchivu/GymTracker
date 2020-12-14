import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSet } from '../../../../actions/setActions';
// import axios from 'axios';
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

const workouts = [
  { name: 'Muscle', exercises: [] },
  {
    name: 'Neck',
    exercises: [
      'Exercises',
      'Lying Face Down Plate Neck Resistance',
      'Lying Face Up Plate Neck Resistance',
      'Seated Head Harness Neck Resistance',
    ],
  },
  {
    name: 'Shoulders',
    exercises: [
      'Exercises',
      'Dumbbell front raise to lateral raise',
      'Clean and press',
      'Single-arm palm-in dumbbell shoulder press',
    ],
  },
  {
    name: 'Chest',
    exercises: [
      'Exercises',
      'Dumbbell Bench Press',
      'Pushups',
      'Close-grip bench press',
    ],
  },
  {
    name: 'Biceps',
    exercises: [
      'Exercises',
      'Incline Hammer Curls',
      'Wide-grip barbell curl',
      'EZ-bar spider curl',
    ],
  },
  {
    name: 'Triceps',
    exercises: [
      'Exercises',
      'Triceps dip',
      'Decline EZ-bar skullcrusher',
      'Dumbbell floor press',
    ],
  },
  {
    name: 'Forearm',
    exercises: [
      'Exercises',
      'Rickshaw Carry',
      'Palms-down wrist curl over bench',
      'Straight-bar wrist roll-up',
    ],
  },
  {
    name: 'Traps',
    exercises: [
      'Exercises',
      'Smith machine shrug',
      'Leverage Shrug',
      'Standing dumbbell shrug',
    ],
  },
  {
    name: 'Lats',
    exercises: ['Weighted pull-up', 'Pullups', 'Rocky Pull-Ups/Pulldowns'],
  },
  {
    name: 'MiddleBack',
    exercises: [
      'Exercises',
      'T-Bar Row with Handle',
      'Reverse-grip bent-over row',
      'One-Arm Dumbbell Row',
    ],
  },
  {
    name: 'LowerBack',
    exercises: [
      'Exercises',
      'Atlas Stones',
      'Barbell deficit deadlift',
      'Back extension',
    ],
  },
  { name: 'Abs', exercises: ['Landmine twist', 'Elbow plank', 'Bottoms Up'] },
  {
    name: 'Glutes',
    exercises: [
      'Exercises',
      'Barbell glute bridge',
      'Barbell Hip Thrust',
      'Single-leg cable hip extension',
    ],
  },
  {
    name: 'Quads',
    exercises: [
      'Exercises',
      'Single-Leg Press',
      'Clean from Blocks',
      'Barbell Full Squat',
    ],
  },
  {
    name: 'Hamstrings',
    exercises: [
      'Exercises',
      'Barbell Deadlift',
      'Clean Deadlift',
      'Sumo deadlift',
    ],
  },
  {
    name: 'Calves',
    exercises: [
      'Exercises',
      'Smith Machine Calf Raise',
      'Standing Calf Raises',
      'Seated Calf Raise',
    ],
  },
];

export default function Workouts({ history }) {
  const classes = useStyles();
  const workoutName = localStorage.getItem('workoutName');
  const workoutId = localStorage.getItem('workoutId');

  const dispatch = useDispatch();

  // const setCreate = useSelector((state) => state.setCreate);
  // const { set, success, error } = setCreate;

  const [muscle, setMuscle] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState(['Exercises']);
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();
  const [newSet, setNewSet] = useState('');
  const [sets, setSets] = useState([]);

  const selectMuscle = (e) => {
    setMuscle(e.target.value);
    setExercises(
      workouts.find((workout) => workout.name === e.target.value).exercises
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
    dispatch(createSet(set, workoutId));

    // const postSet = async () => {
    //   await axios({
    //     method: 'post',
    //     url: `http://localhost:5000/api/v1/workouts/${workoutId}/sets`,
    //     data: set,
    //     headers: {
    //       'Content-Type': 'application/json;charset=UTF-8',
    //       'Access-Control-Allow-Origin': '*',
    //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZGQzZjVmZDZiNTZmMDlmMzBkYzRhMiIsImlhdCI6MTYwNjgyNTkwMywiZXhwIjoxNjA5NDE3OTAzfQ.wBgEE72Xn-Z_P7_Tm-BQo-vZTuWWbhsKX9tZyT0DoUo`,
    //     },
    //   });
    // };
    // postSet();
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
                  {workouts.map((workout, key) => {
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
        </CardBody>
        <CardFooter chart>
          <h3>Last week's workout summary.</h3>
        </CardFooter>
      </Card>
      {/* </GridItem>
      </GridContainer> */}
    </>
  );
}

// Clear form fields after form submit
// Form validation
