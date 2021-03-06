import axios from 'axios';
import {
  WORKOUT_CREATE_REQUEST,
  WORKOUT_CREATE_SUCCESS,
  WORKOUT_CREATE_FAIL,
  WORKOUT_CREATE_RESET,
  WORKOUT_LIST_REQUEST,
  WORKOUT_LIST_SUCCESS,
  WORKOUT_LIST_FAIL,
  WORKOUT_LIST_RESET,
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
import { logout } from './userActions';

// Create workout
export const createWorkout = (workout) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/v1/workouts`,
      workout,
      config
    );

    dispatch({
      type: WORKOUT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: WORKOUT_CREATE_FAIL,
      payload: message,
    });
  }
};

// Get list of workouts
export const listWorkouts = (date) => async (dispatch, getState) => {
  try {
    dispatch({ type: WORKOUT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/workouts?date=${date}`,
      config
    );

    dispatch({
      type: WORKOUT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get workout by id
export const workoutDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WORKOUT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/workouts/${id}`
    );

    dispatch({
      type: WORKOUT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update workout
export const updateWorkout = (workout) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/v1/workouts/${workout._id}`,
      workout,
      config
    );

    dispatch({
      type: WORKOUT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: WORKOUT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: WORKOUT_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Delete workout
export const deleteWorkout = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://localhost:5000/api/v1/workouts/${id}`, config);

    dispatch({
      type: WORKOUT_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: WORKOUT_DELETE_FAIL,
      payload: message,
    });
  }
};

// Reset workout
export const resetWorkout = () => async (dispatch) => {
  try {
    dispatch({
      type: WORKOUT_CREATE_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }
};

// Reset workout LIST
export const resetListWorkouts = () => async (dispatch) => {
  try {
    dispatch({
      type: WORKOUT_LIST_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }
};
