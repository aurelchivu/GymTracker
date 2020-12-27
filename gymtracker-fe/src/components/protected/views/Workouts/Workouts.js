import React from 'react';
import { useSelector } from 'react-redux';
import ListWorkouts from './ListWorkouts';
import CurrentWorkout from './CurrentWorkout';

export default function Workouts(props) {
  const workoutCreate = useSelector((state) => state.workoutCreate);
  const { workout } = workoutCreate;

  let workoutName;

  if (workout) {
    workoutName = workout.data.name;
  }

  return <>{workoutName === undefined ? <ListWorkouts /> : <CurrentWorkout />}</>;
}
