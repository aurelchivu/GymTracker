import {
  SET_CREATE_REQUEST,
  SET_CREATE_SUCCESS,
  SET_CREATE_FAIL,
  SET_CREATE_RESET,
  SET_LIST_REQUEST,
  SET_LIST_SUCCESS,
  SET_LIST_FAIL,
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

export const setCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CREATE_REQUEST:
      return { loading: true };
    case SET_CREATE_SUCCESS:
      return { loading: false, success: true, set: action.payload };
    case SET_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const setListReducer = (state = { sets: [] }, action) => {
  switch (action.type) {
    case SET_LIST_REQUEST:
      return { loading: true, sets: [] };
    case SET_LIST_SUCCESS:
      return {
        loading: false,
        sets: action.payload,
      };
    case SET_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const setDetailsReducer = (
  state = { set: { muscle: '', exercis: '', reps: 0, weight: 0 } },
  action
) => {
  switch (action.type) {
    case SET_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SET_DETAILS_SUCCESS:
      return { loading: false, set: action.payload };
    case SET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setUpdateReducer = (state = { set: {} }, action) => {
  switch (action.type) {
    case SET_UPDATE_REQUEST:
      return { loading: true };
    case SET_UPDATE_SUCCESS:
      return { loading: false, success: true, set: action.payload };
    case SET_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_DELETE_REQUEST:
      return { loading: true };
    case SET_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SET_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
