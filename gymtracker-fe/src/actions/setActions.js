import axios from 'axios';
import {
  SET_CREATE_REQUEST,
  SET_CREATE_SUCCESS,
  SET_CREATE_FAIL,
  SET_DETAILS_FAIL,
  SET_DETAILS_REQUEST,
  SET_DETAILS_SUCCESS,
  SET_DETAILS_FAIL,
  SET_LIST_REQUEST,
  SET_LIST_SUCCESS,
  SET_LIST_FAIL,
} from '../constants/setConstants';
import { logout } from './userActions';

export const createSet = (set) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/v1/:workoutId/sets`, set, config);

    dispatch({
      type: SET_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
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

export const getSetDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/:workoutId/sets/${id}`, config);

    dispatch({
      type: SET_DETAILS_SUCCESS,
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
      type: SET_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listMySets = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/sets/mysets`, config);

    dispatch({
      type: SET_LIST_SUCCESS,
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
      type: SET_LIST_FAIL,
      payload: message,
    });
  }
};

export const listSets = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/sets`, config);

    dispatch({
      type: SET_LIST_SUCCESS,
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
      type: SET_LIST_FAIL,
      payload: message,
    });
  }
};
