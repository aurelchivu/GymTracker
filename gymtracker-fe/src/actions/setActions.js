import axios from 'axios';
import {
  SET_CREATE_REQUEST,
  SET_CREATE_SUCCESS,
  SET_CREATE_FAIL,
  SET_CREATE_RESET,
  SET_LIST_REQUEST,
  SET_LIST_SUCCESS,
  SET_LIST_FAIL,
  SET_LIST_RESET,
  SET_DETAILS_REQUEST,
  SET_DETAILS_SUCCESS,
  SET_DETAILS_FAIL,
  SET_UPDATE_REQUEST,
  SET_UPDATE_SUCCESS,
  SET_UPDATE_FAIL,
  SET_DELETE_REQUEST,
  SET_DELETE_SUCCESS,
  SET_DELETE_FAIL,
} from '../constants/setConstants';
import { logout } from './userActions';

// Create set
export const createSet = (set) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      workoutCreate: { workout },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/v1/workouts/${workout.data._id}/sets`,
      set,
      config
    );

    dispatch({
      type: SET_CREATE_SUCCESS,
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
      type: SET_CREATE_FAIL,
      payload: message,
    });
  }
};

// Get list of sets
export const listSets = (workoutId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      workoutCreate: { workout },
    } = getState();

    

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/workouts/${workout.data._id}/sets`,
      config,
      workoutId
    );

    dispatch({
      type: SET_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get set by id
export const setDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_DETAILS_REQUEST });

    const {
      workoutCreate: { workout },
    } = getState();

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/workouts/${workout.data._id}/sets/${id}`
    );

    dispatch({
      type: SET_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update set
export const updateSet = (set) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      workoutCreate: { workout },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/v1/workouts/${workout.data._id}/sets/${set._id}`,
      set,
      config
    );

    dispatch({
      type: SET_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: SET_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SET_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Delete set
export const deleteSet = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      workoutCreate: { workout },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `http://localhost:5000/api/v1/workouts/${workout.data._id}/sets/${id}`,
      config
    );

    dispatch({
      type: SET_DELETE_SUCCESS,
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
      type: SET_DELETE_FAIL,
      payload: message,
    });
  }
};

// Reset set
export const resetSet = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_CREATE_RESET,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
  }
};

// Reset set list
export const listSetsReset = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LIST_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
  }
};

