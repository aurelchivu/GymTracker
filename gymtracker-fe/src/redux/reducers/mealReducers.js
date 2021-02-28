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
  MEAL_CREATE_RESET,
  MEAL_CREATE_FAIL,
  MEAL_CREATE_SUCCESS,
  MEAL_CREATE_REQUEST,
  MEAL_UPDATE_REQUEST,
  MEAL_UPDATE_SUCCESS,
  MEAL_UPDATE_FAIL,
  MEAL_UPDATE_RESET
} from '../constants/mealConstants'

export const mealListReducer = (state = { meals: [] }, action) => {
  switch (action.type) {
    case MEAL_LIST_REQUEST:
      return { loading: true, meals: [] }
    case MEAL_LIST_SUCCESS:
      return {
        loading: false,
        meals: action.payload.meals,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case MEAL_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const mealDetailsReducer = (
  state = { meal: { exercises: [] } },
  action
) => {
  switch (action.type) {
    case MEAL_DETAILS_REQUEST:
      return { ...state, loading: true }
    case MEAL_DETAILS_SUCCESS:
      return { loading: false, meal: action.payload }
    case MEAL_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const mealDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEAL_DELETE_REQUEST:
      return { loading: true }
    case MEAL_DELETE_SUCCESS:
      return { loading: false, success: true }
    case MEAL_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const mealCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEAL_CREATE_REQUEST:
      return { loading: true }
    case MEAL_CREATE_SUCCESS:
      return { loading: false, success: true, meal: action.payload }
    case MEAL_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case MEAL_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const mealUpdateReducer = (state = { meal: {} }, action) => {
  switch (action.type) {
    case MEAL_UPDATE_REQUEST:
      return { loading: true }
    case MEAL_UPDATE_SUCCESS:
      return { loading: false, success: true, meal: action.payload }
    case MEAL_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case MEAL_UPDATE_RESET:
      return { meal: {} }
    default:
      return state
  }
}

// export const mealExerciseCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case MEAL_CREATE_EXERCISE_REQUEST:
//       return { loading: true }
//     case MEAL_CREATE_EXERCISE_SUCCESS:
//       return { loading: false, success: true }
//     case MEAL_CREATE_EXERCISE_FAIL:
//       return { loading: false, error: action.payload }
//     case MEAL_CREATE_EXERCISE_RESET:
//       return {}
//     default:
//       return state
//   }
// }
