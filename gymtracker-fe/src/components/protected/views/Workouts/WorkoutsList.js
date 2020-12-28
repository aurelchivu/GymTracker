import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'date-fns';
import { parseISO, format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { createSet, listSets } from '../../../../actions/setActions';
import { listWorkouts } from '../../../../actions/workoutActions';
import workoutSets from './workoutSets';
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
import FullWorkout from './FullWorkout';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Workouts({ history }) {
  const classes = useStyles();

  const workoutList = useSelector((state) => state.workoutList);
  const { loading, error, workouts } = workoutList;

  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const queryDate = date.toISOString().split('T')[0];
    console.log(queryDate);
    dispatch(listWorkouts(date));
  };

  return (
    <>
      <Card>
        <CardHeader color='primary'>
          <h2>My Workouts</h2>
        </CardHeader>
        <CardBody>
          <h3>List workouts</h3>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin='normal'
              id='date-picker-dialog'
              label='Please select a date'
              format='dd-MM-yyyy'
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </CardBody>

        <CardFooter chart>
          <br />
        </CardFooter>
      </Card>
    </>
  );
}

// Clear form fields after form submit ???
// Form validation
// Keep workout id after location ???
// Move create sets in Dashboard ???
