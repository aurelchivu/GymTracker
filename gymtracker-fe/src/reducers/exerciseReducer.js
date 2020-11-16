
import {
    EXERCISE_ADD_DESCRIPTION,
    EXERCISE_REMOVE_DESCRIPTION
  } from '../constants/exerciseConstants'
  
  export const exerciseReducer = (state = { workoutExercises: [] }, action) => {
    switch (action.type) {
      case EXERCISE_ADD_DESCRIPTION:
        const exercise = action.payload
        return {
          ...state,
          workoutExercises: [...state.workoutExercises, exercise]
        }
      case EXERCISE_REMOVE_DESCRIPTION:
        return {
          ...state,
          workoutExercises: state.workoutExercises.filter((x) => x.exercise !== action.payload),
        }
      default:
        return state
    }
  }