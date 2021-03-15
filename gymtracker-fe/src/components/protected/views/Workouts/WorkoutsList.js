import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { listWorkouts } from '../../../../redux/actions/workoutActions';
import FullWorkout from './FullWorkout';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function WorkoutsList({ history }) {
  const classes = useStyles();

  const workoutList = useSelector((state) => state.workoutList);

  const { loading, error, workouts = []} = workoutList;
  const { count, data } = workouts;

  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    dispatch(listWorkouts(new Date().toISOString()));
  }, [dispatch]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // const queryDate = date.toISOString().split('T')[0];
    // console.log(queryDate);
    // console.log(date);
    dispatch(listWorkouts(date));
  };

  const workoutDate = selectedDate.toLocaleDateString();

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
              format='dd/MM/yyyy'
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </CardBody>
        <CardFooter chart>
          {loading ? (
            <h3>
              <CircularProgress color='primary' />
            </h3>
          ) : error ? (
            <h3>{error}</h3>
          ) : count >= 0 ? (
            <Card plain>
              <CardBody>
                {count === 0 ? (
                  <h3>On {workoutDate} you had no workouts!</h3>
                ) : count === 1 ? (
                  <h3>
                    On {workoutDate} you had {count} workout:
                  </h3>
                ) : (
                  <h3>
                    On {workoutDate} you had {count} workouts:
                  </h3>
                )}
                <br />
                <ol>
                  {data &&
                    data.map((workout) => {
                      return (
                        <>
                          <li key={workout._id}>{workout.name}</li>
                          <FullWorkout
                            tableHeaderColor='primary'
                            tableHead={['Muscle', 'Exercise', 'Reps', 'Weight']}
                            tableData={workout.sets}
                          />
                          <br />
                          <br />
                        </>
                      );
                    })}
                </ol>
              </CardBody>
            </Card>
          ) : null}
        </CardFooter>
      </Card>
    </>
  );
}
