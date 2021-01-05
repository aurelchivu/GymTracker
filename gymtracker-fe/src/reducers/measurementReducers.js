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
  MEASUREMENT_UPDATE_REQUEST,
  MEASUREMENT_UPDATE_SUCCESS,
  MEASUREMENT_UPDATE_FAIL,
  MEASUREMENT_DELETE_REQUEST,
  MEASUREMENT_DELETE_SUCCESS,
  MEASUREMENT_DELETE_FAIL,
} from '../constants/measurementConstants';

export const measurementCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEASUREMENT_CREATE_REQUEST:
      return { loading: true };
    case MEASUREMENT_CREATE_SUCCESS:
      return { loading: false, success: true, measurement: action.payload };
    case MEASUREMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MEASUREMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const measurementListReducer = (state = { measurements: [] }, action) => {
  switch (action.type) {
    case MEASUREMENT_LIST_REQUEST:
      return { loading: true, measurements: [] };
    case MEASUREMENT_LIST_SUCCESS:
      return {
        loading: false,
        measurements: action.payload,
      };
    case MEASUREMENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MEASUREMENT_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const measurementDetailsReducer = (
  state = { measurement: { bodyPart: '', measure: 0 } },
  action
) => {
  switch (action.type) {
    case MEASUREMENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case MEASUREMENT_DETAILS_SUCCESS:
      return { loading: false, measurement: action.payload };
    case MEASUREMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const measurementUpdateReducer = (state = { measurement: {} }, action) => {
  switch (action.type) {
    case MEASUREMENT_UPDATE_REQUEST:
      return { loading: true };
    case MEASUREMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, measurement: action.payload };
    case MEASUREMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const measurementDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEASUREMENT_DELETE_REQUEST:
      return { loading: true };
    case MEASUREMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MEASUREMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
