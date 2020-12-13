import axios from 'axios';
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
    console.log(data.data._id);

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
export const listWorkouts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: WORKOUT_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/v1/workouts?keyword=${keyword}&pageNumber=${pageNumber}`
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

    const { data } = await axios.get(`/api/v1/workouts/${id}`);

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
      `/api/v1/workouts/${workout._id}`,
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

    await axios.delete(`/api/v1/workouts/${id}`, config);

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
