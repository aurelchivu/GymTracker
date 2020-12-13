import {
  WORKOUT_CREATE_REQUEST,
  WORKOUT_CREATE_SUCCESS,
  WORKOUT_CREATE_FAIL,
  WORKOUT_LIST_REQUEST,
  WORKOUT_LIST_SUCCESS,
  WORKOUT_LIST_FAIL,
  WORKOUT_DETAILS_REQUEST,
  WORKOUT_DETAILS_SUCCESS,
  WORKOUT_DETAILS_FAIL,
  WORKOUT_UPDATE_REQUEST,
  WORKOUT_UPDATE_SUCCESS,
  WORKOUT_UPDATE_FAIL,
  WORKOUT_DELETE_REQUEST,
  WORKOUT_DELETE_SUCCESS,
  WORKOUT_DELETE_FAIL,
} from '../constants/workoutConstants';

export const workoutCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKOUT_CREATE_REQUEST:
      return { loading: true };
    case WORKOUT_CREATE_SUCCESS:
      return { loading: false, success: true, workout: action.payload };
    case WORKOUT_CREATE_FAIL:
      return {};
    default:
      return state;
  }
};

export const workoutListReducer = (state = { workouts: [] }, action) => {
  switch (action.type) {
    case WORKOUT_LIST_REQUEST:
      return { loading: true, workouts: [] };
    case WORKOUT_LIST_SUCCESS:
      return {
        loading: false,
        workouts: action.payload.workouts,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case WORKOUT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workoutDetailsReducer = (
  state = { workout: { exercises: [] } },
  action
) => {
  switch (action.type) {
    case WORKOUT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case WORKOUT_DETAILS_SUCCESS:
      return { loading: false, workout: action.payload };
    case WORKOUT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workoutUpdateReducer = (state = { workout: {} }, action) => {
  switch (action.type) {
    case WORKOUT_UPDATE_REQUEST:
      return { loading: true };
    case WORKOUT_UPDATE_SUCCESS:
      return { loading: false, success: true, workout: action.payload };
    case WORKOUT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workoutDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKOUT_DELETE_REQUEST:
      return { loading: true };
    case WORKOUT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WORKOUT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
