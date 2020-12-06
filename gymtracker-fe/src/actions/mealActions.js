import axios from 'axios'
import {
  MEAL_LIST_REQUEST,
  MEAL_LIST_SUCCESS,
  MEAL_LIST_FAIL,
  MEAL_DETAILS_REQUEST,
  MEAL_DETAILS_SUCCESS,
  MEAL_DETAILS_FAIL,
  MEAL_DELETE_REQUEST,
  MEAL_DELETE_SUCCESS,
  MEAL_DELETE_FAIL,
  MEAL_CREATE_REQUEST,
  MEAL_CREATE_SUCCESS,
  MEAL_CREATE_FAIL,
  MEAL_UPDATE_REQUEST,
  MEAL_UPDATE_SUCCESS,
  MEAL_UPDATE_FAIL
} from '../constants/mealConstants'
import { logout } from './userActions'

export const listMeals = () => async (
  dispatch
) => {
  try {
    dispatch({ type: MEAL_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/v1/meals`
    )

    dispatch({
      type: MEAL_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MEAL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const mealDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/v1/meals/${id}`)

    dispatch({
      type: MEAL_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MEAL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMeal = (meal) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEAL_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/v1/meals`, meal, config)
  
      dispatch({
        type: MEAL_CREATE_SUCCESS,
        payload: data,
      })

      // localStorage.setItem('mealName', JSON.stringify(data.name))

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: MEAL_CREATE_FAIL,
        payload: message,
      })
    }
  }
  
  export const updateMeal = (meal) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEAL_UPDATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(
        `/api/v1/meals/${meal._id}`,
        meal,
        config
      )
  
      dispatch({
        type: MEAL_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: MEAL_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: MEAL_UPDATE_FAIL,
        payload: message,
      })
    }
  }

export const deleteMeal = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEAL_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/v1/meals/${id}`, config)

    dispatch({
      type: MEAL_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: MEAL_DELETE_FAIL,
      payload: message,
    })
  }
}


