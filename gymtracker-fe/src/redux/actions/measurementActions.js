import axios from 'axios';
import {
  MEASUREMENT_CREATE_REQUEST,
  MEASUREMENT_CREATE_SUCCESS,
  MEASUREMENT_CREATE_FAIL,
  MEASUREMENT_CREATE_RESET,
  MEASUREMENT_LIST_REQUEST,
  MEASUREMENT_LIST_SUCCESS,
  MEASUREMENT_LIST_FAIL,
  MEASUREMENT_LIST_RESET,
  MEASUREMENT_DETAILS_REQUEST,
  MEASUREMENT_DETAILS_SUCCESS,
  MEASUREMENT_DETAILS_FAIL,
  MEASUREMENT_DETAILS_RESET,
  MEASUREMENT_UPDATE_REQUEST,
  MEASUREMENT_UPDATE_SUCCESS,
  MEASUREMENT_UPDATE_FAIL,
  MEASUREMENT_DELETE_REQUEST,
  MEASUREMENT_DELETE_SUCCESS,
  MEASUREMENT_DELETE_FAIL,
} from '../constants/measurementConstants';
import { logout } from './userActions';

// Create measurement
export const createMeasurement = (bodyPart, measure) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: MEASUREMENT_CREATE_REQUEST,
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
      `http://localhost:5000/api/v1/measurements`,
      { bodyPart, measure },
      config
    );

    dispatch({
      type: MEASUREMENT_CREATE_SUCCESS,
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
      type: MEASUREMENT_CREATE_FAIL,
      payload: message,
    });
  }
};

// Get list of measurements
export const listMeasurements = (bodyPart) => async (dispatch, getState) => {
  try {
    dispatch({ type: MEASUREMENT_LIST_REQUEST });

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
      `http://localhost:5000/api/v1/measurements?bodyPart=${bodyPart}`,
      config
    );

    // console.log(data);

    dispatch({
      type: MEASUREMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEASUREMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get measurement by id
export const detailsMeasurement = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MEASUREMENT_DETAILS_REQUEST });

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
      `http://localhost:5000/api/v1/measurements/${id}`,
      config
    );

    dispatch({
      type: MEASUREMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEASUREMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update measurement
export const updateMeasurement = (measurement) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: MEASUREMENT_UPDATE_REQUEST,
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
      `http://localhost:5000/api/v1/measurements/${measurement.id}`,
      measurement,
      config
    );

    dispatch({
      type: MEASUREMENT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: MEASUREMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: MEASUREMENT_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Delete measurement
export const deleteMeasuremet = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEASUREMENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `http://localhost:5000/api/v1/measurements/${id}`,
      config
    );

    dispatch({
      type: MEASUREMENT_DELETE_SUCCESS,
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
      type: MEASUREMENT_DELETE_FAIL,
      payload: message,
    });
  }
};

// Reset measurement
export const resetMeasurement = () => async (dispatch) => {
  try {
    dispatch({
      type: MEASUREMENT_DETAILS_RESET,
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

// Reset measurement list
export const listMeasuremetsReset = () => async (dispatch) => {
  try {
    dispatch({
      type: MEASUREMENT_LIST_RESET,
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
