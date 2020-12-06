import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
//   userUpdateProfileReducer,
//   userListReducer,
//   userDeleteReducer,
//   userUpdateReducer,
} from './reducers/userReducers'

import { 
  workoutListReducer,
  workoutDetailsReducer,
  workoutDeleteReducer,
  workoutCreateReducer,
  workoutUpdateReducer,
} from './reducers/workoutReducers'
 
import {
  mealListReducer,
  mealDetailsReducer,
  mealDeleteReducer,
  mealCreateReducer,
  mealUpdateReducer,
} from './reducers/mealReducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  workoutList: workoutListReducer,
  workoutDetails: workoutDetailsReducer,
  workoutDelete: workoutDeleteReducer,
  workoutCreate: workoutCreateReducer,
  workoutUpdate: workoutUpdateReducer,
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  mealDelete: mealDeleteReducer,
  mealCreate: mealCreateReducer,
  mealUpdate: mealUpdateReducer,
  //   userUpdateProfile: userUpdateProfileReducer,
  //   userList: userListReducer,
  //   userDelete: userDeleteReducer,
  //   userUpdate: userUpdateReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store