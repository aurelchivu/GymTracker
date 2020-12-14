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
  workoutCreateReducer,
  workoutListReducer,
  workoutDetailsReducer,
  workoutUpdateReducer,
  workoutDeleteReducer,
} from './reducers/workoutReducers'

import {
  setCreateReducer,
  setListReducer,
  setDetailsReducer,
  setUpdateReducer,
  setDeleteReducer,
} from './reducers/setReducers';

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
  workoutCreate: workoutCreateReducer,
  workoutList: workoutListReducer,
  workoutDetails: workoutDetailsReducer,
  workoutUpdate: workoutUpdateReducer,
  workoutDelete: workoutDeleteReducer,
  setCreateReducer,
  setListReducer,
  setDetailsReducer,
  setUpdateReducer,
  setDeleteReducer,
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