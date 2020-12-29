import React from 'react';
import { useSelector } from 'react-redux';
import WorkoutsList from './WorkoutsList';
import CurrentWorkout from './CurrentWorkout';

export default function Workouts({ history }) {
  const workoutCreate = useSelector((state) => state.workoutCreate);
  const { workout } = workoutCreate;

  let workoutName;

  if (workout) {
    workoutName = workout.data.name;
  }

  return (
    <>
      {workoutName === undefined ? (
        <WorkoutsList history={history} />
      ) : (
        <CurrentWorkout history={history} />
      )}
    </>
  );
}
