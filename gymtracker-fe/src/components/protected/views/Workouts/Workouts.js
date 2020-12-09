import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      'Lying Face Down Plate Neck Resistance',
      'Lying Face Up Plate Neck Resistance',
      'Seated Head Harness Neck Resistance',
    ],
  },
  {
    name: 'Shoulders',
    exercises: [
      'Dumbbell front raise to lateral raise',
      'Clean and press',
      'Single-arm palm-in dumbbell shoulder press',
    ],
  },
  {
    name: 'Chest',
    exercises: ['Dumbbell Bench Press', 'Pushups', 'Close-grip bench press'],
  },
  {
    name: 'Biceps',
    exercises: [
      'Incline Hammer Curls',
      'Wide-grip barbell curl',
      'EZ-bar spider curl',
    ],
  },
  {
    name: 'Triceps',
    exercises: [
      'Triceps dip',
      'Decline EZ-bar skullcrusher',
      'Dumbbell floor press',
    ],
  },
  {
    name: 'Forearm',
    exercises: [
      'Rickshaw Carry',
      'Palms-down wrist curl over bench',
      'Straight-bar wrist roll-up',
    ],
  },
  {
    name: 'Traps',
    exercises: [
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
      'T-Bar Row with Handle',
      'Reverse-grip bent-over row',
      'One-Arm Dumbbell Row',
    ],
  },
  {
    name: 'LowerBack',
    exercises: ['Atlas Stones', 'Barbell deficit deadlift', 'Back extension'],
  },
  { name: 'Abs', exercises: ['Landmine twist', 'Elbow plank', 'Bottoms Up'] },
  {
    name: 'Glutes',
    exercises: [
      'Barbell glute bridge',
      'Barbell Hip Thrust',
      'Single-leg cable hip extension',
    ],
  },
  {
    name: 'Quads',
    exercises: ['Single-Leg Press', 'Clean from Blocks', 'Barbell Full Squat'],
  },
  {
    name: 'Hamstrings',
    exercises: ['Barbell Deadlift', 'Clean Deadlift', 'Sumo deadlift'],
  },
  {
    name: 'Calves',
    exercises: [
      'Smith Machine Calf Raise',
      'Standing Calf Raises',
      'Seated Calf Raise',
    ],
  },
];

export default function Workouts() {
  const classes = useStyles();
  const workout = localStorage.getItem('workoutName');

  const [muscle, setMuscle] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState(['Exercises']);
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();
  const [newSet, setNewSet] = useState('');
  const [sets, setSets] = useState([]);

  const selectMuscle = (e) => {
    setMuscle(e.target.value);
    console.log('Muscle selected!');
    setExercises(
      workouts.find((workout) => workout.name === e.target.value).exercises
    );
  };

  const selectExercise = (e) => {
    setExercise(e.target.value);
    console.log('Exericise selected!');
  };

  const submitReps = (e) => {
    setReps(e.target.value);
    console.log('Reps selected!');
  };

  const submitWeight = (e) => {
    setWeight(e.target.value);
    console.log('Weight selected!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('FORM SUBMITTED!');
    console.log(muscle, exercise, reps, weight);
    // if (!newSet) return;
    // setSets([
    //   ...sets,
    //   {
    //     id: sets.length ? sets[0].id + 1 : 1,
    //     content: newSet,
    //     done: false,
    //   },
    // ]);
    // setNewSet('');
  };

  // useEffect(() => {
  //   console.log('sets = ', sets);
  // }, [sets]);

  // const addSet = useCallback(
  //   (set, index) => (e) => {
  //     const newSets = [...sets];
  //     newSets.splice(index, 1, {
  //       ...set,
  //       done: !set.done,
  //     });
  //     setSets(newSets);
  //   },
  //   [sets]
  // );

  return (
    <>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={12}> */}
      <Card>
        <CardHeader color='primary'>
          <h2>My Workouts</h2>
        </CardHeader>
        <CardBody>
          <h3>Today's workout: {workout}</h3>
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
                  onChange={selectExercise}
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
                  id='demo-customized-textbox'
                  htmlFor='demo-customized-select-native'
                  value={reps}
                  onChange={submitReps}
                  variant='outlined'
                  required
                />
              </FormControl>
              <FormControl className={classes.margin}>
                {/* <InputLabel htmlFor='demo-customized-select-native'>Weight</InputLabel> */}
                <BootstrapInput
                  id='demo-customized-textbox'
                  htmlFor='demo-customized-select-native'
                  value={weight}
                  onChange={submitWeight}
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
          {/* <ul>
            {sets.map((set, index) => (
              <li key={set.id}>
                <input
                  checked={set.done}
                  type='checkbox'
                  onChange={addSet(set, index)}
                />
                <span className={set.done ? 'done' : ''}>{set.content}</span>
              </li>
            ))}
          </ul> */}
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
